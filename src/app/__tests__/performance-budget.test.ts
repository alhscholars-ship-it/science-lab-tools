import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "../../content/site-routes";

function manifestPath(routePath: string): string {
  const appPath = routePath === "/" ? "" : routePath;

  return `.next/server/app${appPath}/page_client-reference-manifest.js`;
}

describe("performance budget route coverage", () => {
  it("covers every high-priority non-calculator sitemap route", () => {
    const budgetScript = readFileSync(
      path.resolve("scripts/check-performance-budget.mjs"),
      "utf8",
    );

    const highPriorityRoutes = sitemapRoutes.filter(
      (route) =>
        route.priority >= 0.9 &&
        !route.path.startsWith("/calculators/"),
    );

    expect(highPriorityRoutes.length).toBeGreaterThan(0);

    for (const route of highPriorityRoutes) {
      expect(
        budgetScript,
        `${route.path} is missing from the performance budget`,
      ).toContain(manifestPath(route.path));
    }
  });
});
