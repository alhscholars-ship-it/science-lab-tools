import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/components/calculators/displacement-calculator.tsx",
  "utf8",
);

describe("displacement calculator UI standardization", () => {
  it("uses the shared calculator result architecture", () => {
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

  it("preserves calculator examples and reset behavior", () => {
    expect(source).toContain(
      'className="calculator-examples"',
    );
    expect(source).toContain("loadExample");
    expect(source).toContain("resetCalculator");
  });

  it("keeps accessible validation feedback", () => {
    expect(source).toContain(
      'className="calculator-error"',
    );
    expect(source).toContain('role="alert"');
  });
});
