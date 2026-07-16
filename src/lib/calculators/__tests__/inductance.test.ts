import { describe, expect, it } from "vitest";

import {
  calculateInductance,
  VACUUM_PERMEABILITY,
  type InductanceVariable,
} from "../inductance";

describe("calculateInductance", () => {
  it("calculates inductance from flux linkage", () => {
    const result = calculateInductance({
      mode: "fluxLinkage",
      turns: 200,
      magneticFlux: 0.0005,
      current: 2,
      solveFor: "inductance",
    });

    expect(result.value).toBeCloseTo(
      0.05,
      12,
    );

    expect(result.details.formula).toBe(
      "L = NΦ ÷ I",
    );
  });

  it("calculates turns from flux linkage", () => {
    const result = calculateInductance({
      mode: "fluxLinkage",
      inductance: 0.05,
      magneticFlux: 0.0005,
      current: 2,
      solveFor: "turns",
    });

    expect(result.value).toBeCloseTo(
      200,
      12,
    );
  });

  it("calculates magnetic flux", () => {
    const result = calculateInductance({
      mode: "fluxLinkage",
      inductance: 0.05,
      turns: 200,
      current: 2,
      solveFor: "magneticFlux",
    });

    expect(result.value).toBeCloseTo(
      0.0005,
      12,
    );
  });

  it("calculates current", () => {
    const result = calculateInductance({
      mode: "fluxLinkage",
      inductance: 0.05,
      turns: 200,
      magneticFlux: 0.0005,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(
      2,
      12,
    );
  });

  it("calculates air-core solenoid inductance", () => {
    const result = calculateInductance({
      mode: "airCoreSolenoid",
      turns: 500,
      area: 0.0004,
      length: 0.1,
      solveFor: "inductance",
    });

    const expected =
      (
        VACUUM_PERMEABILITY *
        500 ** 2 *
        0.0004
      ) /
      0.1;

    expect(result.value).toBeCloseTo(
      expected,
      15,
    );
  });

  it("calculates solenoid turns", () => {
    const inductance =
      (
        VACUUM_PERMEABILITY *
        500 ** 2 *
        0.0004
      ) /
      0.1;

    const result = calculateInductance({
      mode: "airCoreSolenoid",
      inductance,
      area: 0.0004,
      length: 0.1,
      solveFor: "turns",
    });

    expect(result.value).toBeCloseTo(
      500,
      10,
    );
  });

  it("calculates solenoid area", () => {
    const inductance =
      (
        VACUUM_PERMEABILITY *
        500 ** 2 *
        0.0004
      ) /
      0.1;

    const result = calculateInductance({
      mode: "airCoreSolenoid",
      inductance,
      turns: 500,
      length: 0.1,
      solveFor: "area",
    });

    expect(result.value).toBeCloseTo(
      0.0004,
      15,
    );
  });

  it("calculates solenoid length", () => {
    const inductance =
      (
        VACUUM_PERMEABILITY *
        500 ** 2 *
        0.0004
      ) /
      0.1;

    const result = calculateInductance({
      mode: "airCoreSolenoid",
      inductance,
      turns: 500,
      area: 0.0004,
      solveFor: "length",
    });

    expect(result.value).toBeCloseTo(
      0.1,
      12,
    );
  });

  it("rejects zero current", () => {
    expect(() =>
      calculateInductance({
        mode: "fluxLinkage",
        turns: 200,
        magneticFlux: 0.0005,
        current: 0,
        solveFor: "inductance",
      }),
    ).toThrow(
      "Electric current must be greater than zero.",
    );
  });

  it("rejects zero solenoid length", () => {
    expect(() =>
      calculateInductance({
        mode: "airCoreSolenoid",
        turns: 500,
        area: 0.0004,
        length: 0,
        solveFor: "inductance",
      }),
    ).toThrow(
      "Coil length must be greater than zero.",
    );
  });

  it("rejects unsupported flux variables", () => {
    expect(() =>
      calculateInductance({
        mode: "fluxLinkage",
        turns: 200,
        magneticFlux: 0.0005,
        current: 2,
        solveFor:
          "area" as InductanceVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in flux-linkage mode.",
    );
  });

  it("rejects unsupported solenoid variables", () => {
    expect(() =>
      calculateInductance({
        mode: "airCoreSolenoid",
        turns: 500,
        area: 0.0004,
        length: 0.1,
        solveFor:
          "current" as InductanceVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in air-core solenoid mode.",
    );
  });

  it("returns formatted output and details", () => {
    const result = calculateInductance({
      mode: "fluxLinkage",
      turns: 200,
      magneticFlux: 0.0005,
      current: 2,
      solveFor: "inductance",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("inductance");
  });
});
