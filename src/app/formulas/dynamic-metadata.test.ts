import { describe, expect, it } from "vitest";

import {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";

import { scienceFormulas } from "@/content/formulas/registry";

describe("Formula dynamic SEO metadata", () => {
  it("generates metadata for every registered formula", async () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(scienceFormulas.length);
    expect(new Set(params.map(({ slug }) => slug)).size)
      .toBe(params.length);

    for (const formula of scienceFormulas) {
      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: formula.slug,
        }),
      });

      expect(metadata.title).toBe(
        `${formula.name} Formula`,
      );

      expect(metadata.description).toContain(
        formula.description,
      );

      expect(metadata.alternates?.canonical).toBe(
        `/formulas/${formula.slug}`,
      );

      expect(metadata.openGraph?.url).toBe(
        `https://sciencecalchub.com/formulas/${formula.slug}`,
      );
    }
  });

  it("returns empty metadata for an unknown formula", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: "unknown-formula",
      }),
    });

    expect(metadata).toEqual({});
  });
});
