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

const formulaSectionPattern =
  /(?:formula|equation|relationship|calculation method|how the calculation works)/i;

const formulaMarkupPattern =
  /className="formula-card"|<(?:span|h3|strong)>[^<]*(?:=|÷|×|√|±|²|³|½|⅓|⅔|⅖|¹⁄₁₂)[^<]*<\/(?:span|h3|strong)>/;

describe("calculator formula coverage", () => {
  it("covers every published calculator page", () => {
    expect(calculatorPages).toHaveLength(
      calculators.length,
    );
    expect(calculatorPages).toHaveLength(85);
  });

  it.each(calculatorPages)(
    "$slug includes a formula or equation section",
    ({ pagePath }) => {
      const source = readFileSync(pagePath, "utf8");

      expect(source).toMatch(formulaSectionPattern);
      expect(source).toMatch(formulaMarkupPattern);
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
