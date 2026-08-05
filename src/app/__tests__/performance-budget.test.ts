import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "../../content/site-routes";

const homepageManifest =
  ".next/server/app/page_client-reference-manifest.js";
const manifestPattern =
  /^\.next\/server\/app(?:\/[a-z0-9-]+)*\/page_client-reference-manifest\.js$/;

function manifestPath(routePath: string): string {
  const appPath = routePath === "/" ? "" : routePath;

  return `.next/server/app${appPath}/page_client-reference-manifest.js`;
}

function routePath(manifestPathValue: string): string {
  if (manifestPathValue === homepageManifest) {
    return "/";
  }

  return manifestPathValue
    .replace(".next/server/app", "")
    .replace("/page_client-reference-manifest.js", "");
}

function configuredRoutes(): Record<string, string> {
  return JSON.parse(
    readFileSync(
      path.resolve("scripts/performance-budget-routes.json"),
      "utf8",
    ),
  ) as Record<string, string>;
}

describe("performance budget route configuration", () => {
  it("uses valid, unique labels and manifest paths", () => {
    const routes = configuredRoutes();
    const entries = Object.entries(routes);
    const manifests = entries.map(([, manifest]) => manifest);

    expect(entries.length).toBeGreaterThan(0);
    expect(routes.Homepage).toBe(homepageManifest);
    expect(new Set(manifests).size).toBe(manifests.length);

    for (const [label, manifest] of entries) {
      expect(label.trim()).toBe(label);
      expect(label.length).toBeGreaterThan(0);
      expect(manifest).toMatch(manifestPattern);
    }
  });

  it("only references public sitemap routes", () => {
    const sitemapPaths = new Set(
      sitemapRoutes.map((route) => route.path),
    );

    for (const manifest of Object.values(configuredRoutes())) {
      const configuredPath = routePath(manifest);

      expect(
        sitemapPaths.has(configuredPath),
        `${configuredPath} is not a public sitemap route`,
      ).toBe(true);
    }
  });

  it("covers every high-priority non-calculator sitemap route", () => {
    const manifests = Object.values(configuredRoutes());

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
