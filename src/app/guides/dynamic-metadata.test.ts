import { describe, expect, it } from "vitest";

import {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";

import { scienceGuides } from "@/content/guides/registry";

describe("Guide dynamic SEO metadata", () => {
  it("generates metadata for every registered guide", async () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(scienceGuides.length);
    expect(new Set(params.map(({ slug }) => slug)).size)
      .toBe(params.length);

    for (const guide of scienceGuides) {
      const metadata = await generateMetadata({
        params: Promise.resolve({ slug: guide.slug }),
      });

      expect(metadata.title).toBe(guide.title);
      expect(metadata.description).toBe(
        guide.shortDescription,
      );
      expect(metadata.alternates?.canonical).toBe(
        guide.href,
      );
      expect(metadata.openGraph?.url).toBe(
        `https://sciencecalchub.com${guide.href}`,
      );
    }
  });

  it("returns empty metadata for an unknown guide", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: "unknown-science-guide",
      }),
    });

    expect(metadata).toEqual({});
  });
});
