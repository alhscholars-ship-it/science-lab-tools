import { describe, expect, it } from "vitest";

import { calculatePh } from "../ph";

describe("calculatePh", () => {
  it("calculates ion concentrations from pH", () => {
    const result = calculatePh({
      inputType: "ph",
      value: 3,
    });

    expect(result.value).toBe(3);
    expect(result.formattedValue).toBe("pH 3");
    expect(result.details.poh).toBe(11);
    expect(result.details.hydrogenIonConcentration).toBeCloseTo(
      1e-3,
      12,
    );
    expect(result.details.hydroxideIonConcentration).toBeCloseTo(
      1e-11,
      20,
    );
    expect(result.details.classification).toBe("Acidic");
  });

  it("calculates pH from pOH", () => {
    const result = calculatePh({
      inputType: "poh",
      value: 4,
    });

    expect(result.details.ph).toBe(10);
    expect(result.details.poh).toBe(4);
    expect(result.details.classification).toBe("Basic");
  });

  it("calculates pH from hydrogen-ion concentration", () => {
    const result = calculatePh({
      inputType: "hydrogen-ion",
      value: 1e-5,
    });

    expect(result.details.ph).toBeCloseTo(5, 12);
    expect(result.details.poh).toBeCloseTo(9, 12);
    expect(result.details.classification).toBe("Acidic");
    expect(result.details.formula).toBe("pH = −log₁₀[H⁺]");
  });

  it("calculates pH from hydroxide-ion concentration", () => {
    const result = calculatePh({
      inputType: "hydroxide-ion",
      value: 1e-3,
    });

    expect(result.details.poh).toBeCloseTo(3, 12);
    expect(result.details.ph).toBeCloseTo(11, 12);
    expect(result.details.classification).toBe("Basic");
  });

  it("classifies pH 7 as neutral", () => {
    const result = calculatePh({
      inputType: "ph",
      value: 7,
    });

    expect(result.details.classification).toBe("Neutral");
    expect(result.details.hydrogenIonConcentration).toBeCloseTo(
      1e-7,
      16,
    );
    expect(result.details.hydroxideIonConcentration).toBeCloseTo(
      1e-7,
      16,
    );
  });

  it("supports pH values below zero", () => {
    const result = calculatePh({
      inputType: "ph",
      value: -1,
    });

    expect(result.details.hydrogenIonConcentration).toBe(10);
    expect(result.details.classification).toBe("Acidic");
  });

  it("supports pH values above fourteen", () => {
    const result = calculatePh({
      inputType: "ph",
      value: 15,
    });

    expect(result.details.poh).toBe(-1);
    expect(result.details.classification).toBe("Basic");
  });

  it("rejects zero hydrogen-ion concentration", () => {
    expect(() =>
      calculatePh({
        inputType: "hydrogen-ion",
        value: 0,
      }),
    ).toThrow("Ion concentration must be greater than zero.");
  });

  it("rejects negative hydroxide-ion concentration", () => {
    expect(() =>
      calculatePh({
        inputType: "hydroxide-ion",
        value: -0.01,
      }),
    ).toThrow("Ion concentration must be greater than zero.");
  });

  it("rejects non-finite input", () => {
    expect(() =>
      calculatePh({
        inputType: "ph",
        value: Number.NaN,
      }),
    ).toThrow("The entered value must be a finite number.");
  });

  it("rejects unsupported input types", () => {
    expect(() =>
      calculatePh({
        inputType: "invalid" as never,
        value: 7,
      }),
    ).toThrow("Unsupported pH input type.");
  });
});
