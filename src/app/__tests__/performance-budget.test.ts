import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "../../content/site-routes";

const homepageManifest =
  ".next/server/app/page_client-reference-manifest.js";
const manifestPattern =
  /^\.next\/server\/app(?:\/[a-z0-9-]+)*\/page_client-reference-manifest\.js$/;
const budgetClasses = new Set([
  "shared",
  "directory",
  "static",
]);

type ConfiguredRoute = {
  manifest: string;
  budget: string;
};

function manifestPath(routePath: string): string {
  const appPath = routePath === "/" ? "" : routePath;

  return `.next/server/app${appPath}/page_client-reference-manifest.js`;
}

function routePath(manifestPathValue: string): `/${string}` {
  if (manifestPathValue === homepageManifest) {
    return "/";
  }

  const derivedPath = manifestPathValue
    .replace(".next/server/app", "")
    .replace("/page_client-reference-manifest.js", "");

  return derivedPath as `/${string}`;
}

function configuredRoutes(): Record<string, ConfiguredRoute> {
  return JSON.parse(
    readFileSync(
      path.resolve("scripts/performance-budget-routes.json"),
      "utf8",
    ),
  ) as Record<string, ConfiguredRoute>;
}

describe("performance budget route configuration", () => {
  it("uses valid, unique labels, manifests, and budget classes", () => {
    const routes = configuredRoutes();
    const entries = Object.entries(routes);
    const manifests = entries.map(([, route]) => route.manifest);

    expect(entries.length).toBeGreaterThan(0);
    expect(routes.Homepage).toEqual({
      manifest: homepageManifest,
      budget: "shared",
    });
    expect(new Set(manifests).size).toBe(manifests.length);

    for (const [label, route] of entries) {
      expect(label.trim()).toBe(label);
      expect(label.length).toBeGreaterThan(0);
      expect(route.manifest).toMatch(manifestPattern);
      expect(budgetClasses.has(route.budget)).toBe(true);
    }
  });

  it("assigns exactly one shared and one directory budget", () => {
    const budgets = Object.values(configuredRoutes()).map(
      (route) => route.budget,
    );

    expect(budgets.filter((budget) => budget === "shared")).toHaveLength(1);
    expect(budgets.filter((budget) => budget === "directory")).toHaveLength(1);
  });

  it("only references public sitemap routes", () => {
    const sitemapPaths = new Set(
      sitemapRoutes.map((route) => route.path),
    );

    for (const route of Object.values(configuredRoutes())) {
      const configuredPath = routePath(route.manifest);

      expect(
        sitemapPaths.has(configuredPath),
        `${configuredPath} is not a public sitemap route`,
      ).toBe(true);
    }
  });

  it("covers every high-priority non-calculator sitemap route", () => {
    const manifests = Object.values(configuredRoutes()).map(
      (route) => route.manifest,
    );

    const highPriorityRoutes = sitemapRoutes.filter(
      (route) =>
        route.priority >= 0.9 &&
        !route.path.startsWith("/calculators/"),
    );

    expect(highPriorityRoutes.length).toBeGreaterThan(0);

    for (const route of highPriorityRoutes) {
      expect(
        manifests,
        `${route.path} is missing from the performance budget`,
      ).toContain(manifestPath(route.path));
    }
  });
});
