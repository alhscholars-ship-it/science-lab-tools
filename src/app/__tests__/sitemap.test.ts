import fs, { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import { calculators } from "../../content/calculators/registry";
import { scienceAITools } from "../../content/ai-tools/registry";
import {
  formulaCategories,
  scienceFormulas,
} from "../../content/formulas/registry";
import { scienceGuides } from "../../content/guides/registry";

const productionOrigin = "https://sciencecalchub.com";

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
    .filter((file) => !readFileSync(file, "utf8").match(/index:\s*false/))
    .map((file) => {
      const directory = path.relative(appDirectory, path.dirname(file));
      return directory ? `/${directory.split(path.sep).join("/")}` : "/";
    })
    .filter((route) => !route.includes("["))
    .sort();
}

describe("sitemap", () => {
  it("includes every public App Router page exactly once", () => {
    const sitemapPaths = sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .sort();
    const staticPageRoutes = discoverPageRoutes();

    const dynamicPageRoutes = [
      ...scienceAITools.map(({ slug }) => `/ai-tools/${slug}`),
      ...scienceFormulas.map(({ slug }) => `/formulas/${slug}`),
      ...formulaCategories.map(
        (category) => `/formulas/category/${category.toLowerCase()}`,
      ),
      ...scienceGuides.map(({ slug }) => `/guides/${slug}`),
    ];

    const expectedRoutes = [
      ...staticPageRoutes,
      ...dynamicPageRoutes,
    ].sort();

    expect(sitemapPaths).toEqual(expectedRoutes);
    expect(new Set(sitemapPaths).size).toBe(sitemapPaths.length);
  });

  it("uses only the canonical production origin", () => {
    const sitemapUrls = sitemap().map((entry) => entry.url);

    expect(sitemapUrls.length).toBeGreaterThan(0);
    expect(sitemapUrls.every((url) => new URL(url).origin === productionOrigin)).toBe(true);
    expect(sitemapUrls.some((url) => ["localhost", "alh.sciencecalchub.org"].includes(new URL(url).hostname))).toBe(false);
  });

  it("includes every calculator registry URL exactly once", () => {
    const sitemapUrls = sitemap().map((entry) => entry.url);
    const calculatorUrls = calculators.map(
      ({ href }) => new URL(href, `${productionOrigin}/`).toString(),
    );

    for (const calculatorUrl of calculatorUrls) {
      expect(sitemapUrls.filter((url) => url === calculatorUrl)).toHaveLength(1);
    }

    expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
  });
});
