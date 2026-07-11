import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/components/calculators/acceleration-due-to-gravity-calculator.tsx",
  "utf8",
);

describe("acceleration due to gravity UI standardization", () => {
  it("uses the shared calculator panel structure", () => {
    expect(source).toContain('className="calculator-panel"');
    expect(source).toContain('className="calculator-form"');
    expect(source).toContain("calculator-result--complete");
  });

  it("provides accessible result and error states", () => {
    expect(source).toContain('aria-live="polite"');
    expect(source).toContain('aria-atomic="true"');
    expect(source).toContain('role="alert"');
  });

  it("includes result labels, values, details, and working", () => {
    expect(source).toContain("calculator-result__label");
    expect(source).toContain("calculator-result__value");
    expect(source).toContain("calculator-result__details");
    expect(source).toContain("calculator-result__working");
    expect(source).toContain("calculator-result__empty");
  });

  it("supports examples and reset behavior", () => {
    expect(source).toContain("const examples");
    expect(source).toContain("loadExample");
    expect(source).toContain("resetCalculator");
    expect(source).toContain("Earth");
    expect(source).toContain("Moon");
    expect(source).toContain("Mars");
  });
});
