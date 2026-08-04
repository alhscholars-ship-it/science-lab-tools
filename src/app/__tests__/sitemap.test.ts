import fs, { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import { calculators } from "../../content/calculators/registry";
import { absoluteUrl } from "../../lib/seo/url";

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function discoverPageRoutes(): string[] {
  const appDirectory = path.resolve("src/app");

  return walk(appDirectory)
    .filter((file) => path.basename(file) === "page.tsx")
    .filter((file) => !readFileSync(file, "utf8").match(/index:\\s*false/))
    .map((file) => {
      const directory = path.relative(appDirectory, path.dirname(file));
      return directory ? `/${directory.split(path.sep).join("/")}` : "/";
    })
    .sort();
}

describe("sitemap calculator coverage", () => {
  it("includes every public App Router page exactly once", () => {
    const sitemapPaths = sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .sort();
    const pageRoutes = discoverPageRoutes();

    expect(sitemapPaths).toEqual(pageRoutes);
    expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length);
  });

  it("includes every calculator registry URL exactly once", () => {
    const sitemapUrls = sitemap().map((entry) => entry.url);

    const calculatorUrls = calculators.map(({ href }) =>
      absoluteUrl(href),
    );

    expect(
      sitemapUrls.filter((url) =>
        calculatorUrls.includes(url),
      ),
    ).toHaveLength(calculators.length);

    expect(new Set(sitemapUrls).size).toBe(
      sitemapUrls.length,
    );

    for (const calculatorUrl of calculatorUrls) {
      expect(
        sitemapUrls.filter((url) => url === calculatorUrl),
      ).toHaveLength(1);
    }
  });

  it("contains no calculator detail URL outside the registry", () => {
    const registryUrls = new Set(
      calculators.map(({ href }) => absoluteUrl(href)),
    );

    const sitemapCalculatorUrls = sitemap()
      .map((entry) => entry.url)
      .filter(
        (url) =>
          new URL(url).pathname.startsWith(
            "/calculators/",
          ),
      );

    expect(
      sitemapCalculatorUrls.filter(
        (url) => !registryUrls.has(url),
      ),
    ).toEqual([]);
  });
});
