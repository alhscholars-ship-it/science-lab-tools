import { describe, expect, it } from "vitest";

import {
  calculateRotationalWork,
} from "../rotational-work";

describe("calculateRotationalWork", () => {
  it("calculates rotational work", () => {
    const result =
      calculateRotationalWork({
        torque: 8,
        angularDisplacement: 3,
        solveFor: "work",
      });

    expect(result.value).toBeCloseTo(24);
    expect(result.details.formula).toBe(
      "W = τθ",
    );
  });

  it("calculates torque", () => {
    const result =
      calculateRotationalWork({
        work: 24,
        angularDisplacement: 3,
        solveFor: "torque",
      });

    expect(result.value).toBeCloseTo(8);
  });

  it("calculates angular displacement", () => {
    const result =
      calculateRotationalWork({
        work: 24,
        torque: 8,
        solveFor: "angularDisplacement",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateRotationalWork({
        torque: 2.5,
        angularDisplacement: 1.2,
        solveFor: "work",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero torque", () => {
    expect(() =>
      calculateRotationalWork({
        torque: 0,
        angularDisplacement: 3,
        solveFor: "work",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects negative torque", () => {
    expect(() =>
      calculateRotationalWork({
        torque: -8,
        angularDisplacement: 3,
        solveFor: "work",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects zero angular displacement", () => {
    expect(() =>
      calculateRotationalWork({
        torque: 8,
        angularDisplacement: 0,
        solveFor: "work",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects negative angular displacement", () => {
    expect(() =>
      calculateRotationalWork({
        work: 24,
        angularDisplacement: -3,
        solveFor: "torque",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects zero work", () => {
    expect(() =>
      calculateRotationalWork({
        work: 0,
        torque: 8,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Work must be greater than zero.",
    );
  });

  it("rejects negative work", () => {
    expect(() =>
      calculateRotationalWork({
        work: -24,
        torque: 8,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Work must be greater than zero.",
    );
  });

  it("rejects non-finite torque", () => {
    expect(() =>
      calculateRotationalWork({
        torque:
          Number.POSITIVE_INFINITY,
        angularDisplacement: 3,
        solveFor: "work",
      }),
    ).toThrow(
      "Torque must be a finite number.",
    );
  });

  it("rejects non-finite angular displacement", () => {
    expect(() =>
      calculateRotationalWork({
        torque: 8,
        angularDisplacement: Number.NaN,
        solveFor: "work",
      }),
    ).toThrow(
      "Angular displacement must be a finite number.",
    );
  });
});
