import fs from "node:fs";
import path from "node:path";

const appDirectory = path.resolve(
  process.env.LINK_CHECK_APP_DIR ?? "src/app",
);
const sourceDirectory = path.resolve(
  process.env.LINK_CHECK_SOURCE_DIR ?? "src",
);
const pageFileName = "page.tsx";
const ignoredSourceFiles = new Set([
  path.join(appDirectory, "sitemap.ts"),
  path.join(appDirectory, "robots.ts"),
]);
const orphanExemptRoutes = new Set(["/"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walk(entryPath);
    }

    return [entryPath];
  });
}

function routeFromPage(pageFile) {
  const relativeDirectory = path.relative(
    appDirectory,
    path.dirname(pageFile),
  );

  if (!relativeDirectory) {
    return "/";
  }

  return `/${relativeDirectory.split(path.sep).join("/")}`;
}

function normalizeInternalPath(value) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  const pathname = value.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    path.posix.extname(pathname)
  ) {
    return null;
  }

  return pathname;
}

function extractNavigationReferences(file, content) {
  const references = [];
  const patterns = [
    /\bhref\s*=\s*["']([^"']+)["']/g,
    /\bhref\s*:\s*["']([^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const route = normalizeInternalPath(match[1]);

      if (route) {
        references.push({ file, route, value: match[1] });
      }
    }
  }

  return references;
}

const pageFiles = walk(appDirectory).filter(
  (file) => path.basename(file) === pageFileName,
);
const routes = new Map(
  pageFiles.map((file) => [routeFromPage(file), file]),
);
const sourceFiles = walk(sourceDirectory).filter(
  (file) => /\.(?:ts|tsx)$/.test(file) &&
    !file.includes(`${path.sep}__tests__${path.sep}`) &&
    !ignoredSourceFiles.has(file),
);
const references = sourceFiles.flatMap((file) =>
  extractNavigationReferences(file, fs.readFileSync(file, "utf8")),
);
const brokenReferences = references.filter(
  ({ route }) => !routes.has(route),
);

const orphanRoutes = [...routes.entries()]
  .filter(([route]) => !orphanExemptRoutes.has(route))
  .filter(([route, pageFile]) =>
    !references.some(
      (reference) =>
        reference.route === route && reference.file !== pageFile,
    ),
  );

let failed = false;

if (brokenReferences.length > 0) {
  failed = true;
  console.error("Broken internal navigation references:");

  for (const reference of brokenReferences) {
    console.error(
      `- ${path.relative(process.cwd(), reference.file)}: ${reference.value}`,
    );
  }
}

if (orphanRoutes.length > 0) {
  failed = true;
  console.error("Orphaned routes without an incoming navigation link:");

  for (const [route, pageFile] of orphanRoutes) {
    console.error(`- ${route} (${path.relative(process.cwd(), pageFile)})`);
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(
    `Internal link check passed: ${routes.size} routes, ${references.length} navigation references, 0 broken, 0 orphaned.`,
  );
}
