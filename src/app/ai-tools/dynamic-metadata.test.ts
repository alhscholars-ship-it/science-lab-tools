import { describe, expect, it } from "vitest";

import {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";

import { scienceAITools } from "@/content/ai-tools/registry";

describe("AI tool dynamic SEO metadata", () => {
  it("generates correct metadata for every AI tool", async () => {
    const params = generateStaticParams();

    expect(params).toHaveLength(scienceAITools.length);

    for (const tool of scienceAITools) {
      const metadata = await generateMetadata({
        params: Promise.resolve({
          slug: tool.slug,
        }),
      });

      expect(metadata.title).toBe(tool.name);
      expect(metadata.description).toBe(tool.description);
      expect(metadata.alternates?.canonical).toBe(
        tool.href,
      );
    }
  });

  it("returns empty metadata for an unknown tool", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({
        slug: "unknown-ai-tool",
      }),
    });

    expect(metadata).toEqual({});
  });
});
