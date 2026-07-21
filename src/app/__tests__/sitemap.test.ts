import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import { calculators } from "../../content/calculators/registry";
import { absoluteUrl } from "../../lib/seo/url";

describe("sitemap calculator coverage", () => {
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
