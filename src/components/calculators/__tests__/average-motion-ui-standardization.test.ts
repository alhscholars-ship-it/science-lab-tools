import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const files = [
  "src/components/calculators/average-speed-calculator.tsx",
  "src/components/calculators/average-velocity-calculator.tsx",
] as const;

describe("average motion calculator UI standardization", () => {
  for (const file of files) {
    const source = readFileSync(file, "utf8");

    it(`${file} uses the shared result architecture`, () => {
      expect(source).toContain(
        "calculator-result--complete",
      );
      expect(source).toContain(
        'aria-live="polite"',
      );
      expect(source).toContain(
        'aria-atomic="true"',
      );
      expect(source).toContain(
        "calculator-result__label",
      );
      expect(source).toContain(
        "calculator-result__value",
      );
      expect(source).toContain(
        "calculator-result__details",
      );
      expect(source).toContain(
        "calculator-result__working",
      );
      expect(source).toContain(
        "calculator-result__empty",
      );
    });

    it(`${file} preserves examples and reset behavior`, () => {
      expect(source).toContain(
        'className="calculator-examples"',
      );
      expect(source).toContain("loadExample");
      expect(source).toContain("resetCalculator");
    });
  }
});
