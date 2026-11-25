import { describe, expect, it } from "vitest";

import {
  generateMetadata,
  generateStaticParams,
} from "./[category]/page";

import { formulaCategories } from "@/content/formulas/registry";

describe("Formula category dynamic SEO metadata", () => {
  it("generates metadata for every formula category", async () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(formulaCategories.length);
    expect(
      new Set(params.map(({ category }) => category)).size,
    ).toBe(params.length);

    for (const { category } of params) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ category }),
      });

      const title =
        `${category.charAt(0).toUpperCase()}${category.slice(1)} Formulas`;

      expect(metadata.title).toBe(title);
      expect(typeof metadata.description).toBe("string");
      expect(
        (metadata.description as string).length,
      ).toBeGreaterThan(0);
      expect(metadata.alternates?.canonical).toBe(
        `/formulas/category/${category}`,
      );
      expect(metadata.openGraph?.url).toBe(
        `https://sciencecalchub.com/formulas/category/${category}`,
      );
    }
  });

  it("returns empty metadata for an unknown category", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        category: "unknown-category",
      }),
    });

    expect(metadata).toEqual({});
  });
});
