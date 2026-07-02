import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright-core";

const baseUrl =
  process.env.A11Y_BASE_URL ?? "http://127.0.0.1:3000";

const chromiumPath =
  process.env.CHROMIUM_PATH ?? "/usr/bin/chromium";

const routes = [
  ["/", "Homepage"],
  ["/calculators", "Calculators hub"],
  [
    "/calculators/percent-error-calculator",
    "Percent error calculator",
  ],
  [
    "/calculators/density-calculator",
    "Density calculator",
  ],
  ["/lab-reports", "Lab reports hub"],
  [
    "/lab-reports/how-to-write-a-lab-report",
    "Lab report guide",
  ],
  ["/scientific-method", "Scientific method hub"],
  [
    "/scientific-method/experimental-design",
    "Experimental design guide",
  ],
  ["/templates", "Templates hub"],
  [
    "/templates/printable-lab-report-template",
    "Printable lab report template",
  ],
  [
    "/templates/data-table-template",
    "Data table template",
  ],
];

const browser = await chromium.launch({
  executablePath: chromiumPath,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
  ],
});

let failed = false;

try {
  const context = await browser.newContext({
    viewport: {
      width: 1440,
      height: 1000,
    },
  });

  const page = await context.newPage();

  console.log("===== AXE ACCESSIBILITY AUDIT =====");

  for (const [route, label] of routes) {
    const url = new URL(route, baseUrl).toString();

    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    if (!response || !response.ok()) {
      console.error(
        `FAIL: ${label} returned HTTP ${response?.status() ?? "unknown"}`,
      );
      failed = true;
      continue;
    }

    const results = await new AxeBuilder({
      page,
    })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
      ])
      .analyze();

    if (results.violations.length === 0) {
      console.log(`PASS: ${label}`);
      continue;
    }

    failed = true;

    console.error(
      `FAIL: ${label} has ${results.violations.length} violation(s)`,
    );

    for (const violation of results.violations) {
      console.error(
        `  ${violation.id} [${violation.impact ?? "unknown"}]`,
      );
      console.error(`  ${violation.help}`);

      for (const node of violation.nodes.slice(0, 5)) {
        console.error(
          `    Target: ${node.target.join(" ")}`,
        );
        console.error(
          `    ${node.failureSummary ?? "No failure summary"}`,
        );
      }
    }
  }
} finally {
  await browser.close();
}

if (failed) {
  process.exit(1);
}

console.log("Accessibility checks passed.");
