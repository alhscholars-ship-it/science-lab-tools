import { describe, expect, it } from "vitest";

import { calculators } from "../../calculators/registry";
import {
  formulaCategories,
  scienceFormulas,
} from "../registry";

describe("science formula registry", () => {
  it("uses unique slugs and covers every formula category", () => {
    expect(new Set(scienceFormulas.map(({ slug }) => slug)).size).toBe(
      scienceFormulas.length,
    );

    for (const category of formulaCategories) {
      expect(
        scienceFormulas.some((formula) => formula.category === category),
      ).toBe(true);
    }
  });

  it("links every formula to a registered calculator", () => {
    const calculatorHrefs = new Set(
      calculators.map(({ href }) => href),
    );

    for (const formula of scienceFormulas) {
      expect(calculatorHrefs.has(formula.calculatorHref)).toBe(true);
    }
  });
});
