import {
  readFileSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { calculators } from "@/content/calculators/registry";

const calculatorDirectory = join(
  process.cwd(),
  "src/app/calculators",
);

const calculatorPages = readdirSync(
  calculatorDirectory,
  {
    withFileTypes: true,
  },
)
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    slug: entry.name,
    pagePath: join(
      calculatorDirectory,
      entry.name,
      "page.tsx",
    ),
  }))
  .filter(({ pagePath }) => {
    try {
      readFileSync(pagePath, "utf8");
      return true;
    } catch {
      return false;
    }
  })
  .sort((first, second) =>
    first.slug.localeCompare(second.slug),
  );

const faqItemsPattern =
  /const\s+faqItems\s*=/;

const faqSchemaPattern =
  /createFaqSchema\s*\(\s*faqItems\s*\)/;

const visibleFaqPattern =
  /faqItems\.map\s*\([\s\S]*?(?:<details\b|className="faq-item")/;

describe("calculator FAQ coverage", () => {
  it("covers every published calculator page", () => {
    expect(calculatorPages).toHaveLength(
      calculators.length,
    );

    expect(calculatorPages).toHaveLength(85);
  });

  it.each(calculatorPages)(
    "$slug includes FAQ content, rendering, and schema",
    ({ pagePath }) => {
      const source = readFileSync(pagePath, "utf8");

      expect(source).toMatch(faqItemsPattern);
      expect(source).toMatch(faqSchemaPattern);
      expect(source).toMatch(visibleFaqPattern);
    },
  );

  it("keeps registry and page slugs aligned", () => {
    const pageSlugs = calculatorPages.map(
      ({ slug }) => slug,
    );

    const registrySlugs = calculators
      .map(({ slug }) => slug)
      .sort();

    expect(pageSlugs).toEqual(registrySlugs);
  });
});
