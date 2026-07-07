import { describe, expect, it } from "vitest";

import {
  calculateHookesLaw,
} from "../hookes-law";

describe("calculateHookesLaw", () => {
  it("calculates force", () => {
    const result = calculateHookesLaw({
      springConstant: 200,
      extension: 0.3,
      solveFor: "force",
    });

    expect(result.value).toBe(60);
    expect(result.details.force).toBe(60);
    expect(result.details.formula).toBe(
      "F = kx",
    );
  });

  it("calculates spring constant", () => {
    const result = calculateHookesLaw({
      force: 80,
      extension: 0.4,
      solveFor: "springConstant",
    });

    expect(result.value).toBe(200);
  });

  it("calculates extension", () => {
    const result = calculateHookesLaw({
      force: 90,
      springConstant: 300,
      solveFor: "extension",
    });

    expect(result.value).toBeCloseTo(0.3);
  });

  it("supports decimal values", () => {
    const result = calculateHookesLaw({
      springConstant: 75.5,
      extension: 0.24,
      solveFor: "force",
    });

    expect(result.value).toBeCloseTo(18.12);
  });

  it("rejects zero spring constant", () => {
    expect(() =>
      calculateHookesLaw({
        springConstant: 0,
        extension: 0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Spring constant must be greater than zero.",
    );
  });

  it("rejects negative spring constant", () => {
    expect(() =>
      calculateHookesLaw({
        springConstant: -50,
        extension: 0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Spring constant must be greater than zero.",
    );
  });

  it("rejects zero extension", () => {
    expect(() =>
      calculateHookesLaw({
        springConstant: 200,
        extension: 0,
        solveFor: "force",
      }),
    ).toThrow(
      "Extension must be greater than zero.",
    );
  });

  it("rejects negative extension", () => {
    expect(() =>
      calculateHookesLaw({
        springConstant: 200,
        extension: -0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Extension must be greater than zero.",
    );
  });

  it("rejects zero force when calculating spring constant", () => {
    expect(() =>
      calculateHookesLaw({
        force: 0,
        extension: 0.5,
        solveFor: "springConstant",
      }),
    ).toThrow(
      "Force must be greater than zero when calculating another variable.",
    );
  });

  it("rejects negative force when calculating extension", () => {
    expect(() =>
      calculateHookesLaw({
        force: -20,
        springConstant: 200,
        solveFor: "extension",
      }),
    ).toThrow(
      "Force must be greater than zero when calculating another variable.",
    );
  });

  it("rejects non-finite force", () => {
    expect(() =>
      calculateHookesLaw({
        force: Number.POSITIVE_INFINITY,
        extension: 0.5,
        solveFor: "springConstant",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });

  it("rejects non-finite extension", () => {
    expect(() =>
      calculateHookesLaw({
        springConstant: 200,
        extension: Number.NaN,
        solveFor: "force",
      }),
    ).toThrow(
      "Extension must be a finite number.",
    );
  });
});
