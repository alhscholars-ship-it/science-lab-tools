from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT = Path(".next/server/app")
ORIGIN = "https://sciencecalchub.com"

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.h1 = 0
        self.jsonld = 0
        self.links = set()
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)

        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "meta" and a.get("name") == "description":
            self.description = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href", "")
        elif tag == "script" and a.get("type") == "application/ld+json":
            self.jsonld += 1
        elif tag == "a":
            href = a.get("href", "")
            if href.startswith("/") and not href.startswith("//"):
                self.links.add(href)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def audit(path):
    page = PageParser()
    page.feed(path.read_text(encoding="utf-8"))
    route = "/" + str(path.relative_to(ROOT)).removesuffix(".html")
    if route == "/index":
        route = "/"

    issues = []

    if not page.title.strip():
        issues.append("missing-title")
    if not page.description.strip():
        issues.append("missing-description")
    if not page.canonical:
        issues.append("missing-canonical")
    elif page.canonical.rstrip("/") != (ORIGIN + route).rstrip("/"):
        issues.append("canonical-mismatch")
    if page.h1 != 1:
        issues.append(f"h1-count-{page.h1}")
    if page.jsonld == 0:
        issues.append("missing-jsonld")
    if len(page.links) < 2:
        issues.append("weak-internal-linking")

    return route, issues

if not ROOT.is_dir():
    raise SystemExit("ERROR: Fresh .next build required")

files = sorted(
    p for p in ROOT.rglob("*.html")
    if p.stem not in {"_global-error", "_not-found"}
)
issues_by_route = {}
titles = {}
descriptions = {}

for path in files:
    route, issues = audit(path)

    page = PageParser()
    page.feed(path.read_text(encoding="utf-8"))

    title = page.title.strip()
    description = page.description.strip()

    if title:
        titles.setdefault(title, []).append(route)

    if description:
        descriptions.setdefault(description, []).append(route)

    if issues:
        issues_by_route.setdefault(route, set()).update(issues)

for label, groups in (
    ("duplicate-title", titles),
    ("duplicate-description", descriptions),
):
    for value, routes in groups.items():
        if len(routes) > 1:
            for route in routes:
                issues_by_route.setdefault(route, set()).add(label)

            print("DUPLICATE:", label, repr(value))
            print("ROUTES:", ", ".join(routes))

failed = [
    (route, sorted(issues))
    for route, issues in sorted(issues_by_route.items())
]

print("HTML pages:", len(files))
print("Pages passing:", len(files) - len(failed))
print("Pages flagged:", len(failed))

for route, issues in failed[:20]:
    print("FLAG:", route, ", ".join(issues))

if not files:
    raise SystemExit("ERROR: No rendered HTML pages found")

if failed:
    raise SystemExit(1)

print("RESULT: PASS")
