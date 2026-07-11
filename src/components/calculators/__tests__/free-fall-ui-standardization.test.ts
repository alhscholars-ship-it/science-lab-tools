import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/components/calculators/free-fall-calculator.tsx",
  "utf8",
);

describe("free fall UI standardization", () => {
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

  it("includes complete result presentation", () => {
    expect(source).toContain("calculator-result__label");
    expect(source).toContain("calculator-result__value");
    expect(source).toContain("calculator-result__details");
    expect(source).toContain("calculator-result__working");
    expect(source).toContain("calculator-result__empty");
  });

  it("supports examples, validation, and reset", () => {
    expect(source).toContain("20 m drop");
    expect(source).toContain("2 second fall");
    expect(source).toContain("Moon gravity");
    expect(source).toContain("Enter only one starting value");
    expect(source).toContain("resetCalculator");
  });
});
