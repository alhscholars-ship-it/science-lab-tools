import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

interface AuditPage {
  route: string;
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  internalLinks: number;
  hasRobots: boolean;
  issues: string[];
}

interface AuditReport {
  pages: AuditPage[];
}

const projectRoot = process.cwd();

const reportPath = join(
  projectRoot,
  "reports/seo-page-inventory.json",
);

let report: AuditReport;

function getPage(route: string): AuditPage {
  const page = report.pages.find(
    (entry) => entry.route === route,
  );

  expect(
    page,
    `Expected SEO audit record for ${route}`,
  ).toBeDefined();

  return page as AuditPage;
}

beforeAll(() => {
  execFileSync(
    process.execPath,
    ["scripts/seo/audit-pages.mjs"],
    {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: "pipe",
    },
  );

  report = JSON.parse(
    readFileSync(reportPath, "utf8"),
  ) as AuditReport;
});

describe("SEO page audit regression coverage", () => {
  it("reports no page-level SEO issues", () => {
    const pagesWithIssues = report.pages.filter(
      (page) => page.issues.length > 0,
    );

    expect(pagesWithIssues).toEqual([]);
  });

  it("resolves imported category-hub metadata and title templates", () => {
    expect(getPage("/physics-calculators")).toMatchObject({
      title:
        "Physics Calculators & Formula Tools | Science Lab Tools",
      titleLength: 55,
      issues: [],
    });

    expect(getPage("/chemistry-calculators")).toMatchObject({
      title:
        "Chemistry Calculators & Formula Tools | Science Lab Tools",
      titleLength: 57,
      issues: [],
    });

    expect(getPage("/laboratory-calculators")).toMatchObject({
      title:
        "Laboratory Calculators & Analysis Tools | Science Lab Tools",
      titleLength: 59,
      issues: [],
    });
  });

  it("preserves apostrophes in metadata descriptions", () => {
    const routes = [
      "/calculators/coulombs-law-calculator",
      "/calculators/kirchhoffs-law-calculator",
      "/calculators/ohms-law-calculator",
    ];

    for (const route of routes) {
      const page = getPage(route);

      expect(page.descriptionLength).toBeGreaterThanOrEqual(
        100,
      );

      expect(page.issues).not.toContain(
        "short-description",
      );
    }
  });

  it("counts inherited robots and reusable internal links", () => {
    const calculatorPage = getPage(
      "/calculators/density-calculator",
    );

    expect(calculatorPage.hasRobots).toBe(true);
    expect(calculatorPage.internalLinks).toBeGreaterThanOrEqual(
      7,
    );
    expect(calculatorPage.issues).not.toContain(
      "weak-internal-linking",
    );

    expect(
      getPage("/editorial-policy").hasRobots,
    ).toBe(true);
  });
});
