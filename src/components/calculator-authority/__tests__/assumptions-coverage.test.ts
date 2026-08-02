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

const assumptionsSectionPattern =
  /<section\s+aria-labelledby="(?:assumptions|limitations)-heading"\s*>/;

const assumptionsGuidancePattern =
  /<section\s+aria-labelledby="(?:assumptions|limitations)-heading"\s*>[\s\S]*?<h2\s+id="(?:assumptions|limitations)-heading"\s*>[\s\S]*?(?:<p>|<ul\s+className="article-list">)[\s\S]*?<\/section>/i;

describe(
  "calculator assumptions and limitations coverage",
  () => {
    it("covers every published calculator page", () => {
      expect(calculatorPages).toHaveLength(
        calculators.length,
      );

    });

    it.each(calculatorPages)(
      "$slug includes assumptions or limitations guidance",
      ({ pagePath }) => {
        const source = readFileSync(
          pagePath,
          "utf8",
        );

        expect(source).toMatch(
          assumptionsSectionPattern,
        );

        expect(source).toMatch(
          assumptionsGuidancePattern,
        );
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
  },
);
