import { describe, expect, it } from "vitest";

import { calculateWork } from "../work";

describe("calculateWork", () => {
  it("calculates work", () => {
    const result = calculateWork({
      force: 20,
      distance: 5,
      solveFor: "work",
    });

    expect(result.value).toBe(100);
    expect(result.details.work).toBe(100);
    expect(result.details.formula).toBe(
      "W = F × d",
    );
  });

  it("calculates negative work", () => {
    const result = calculateWork({
      force: -12,
      distance: 4,
      solveFor: "work",
    });

    expect(result.value).toBe(-48);
  });

  it("calculates zero work", () => {
    const result = calculateWork({
      force: 0,
      distance: 8,
      solveFor: "work",
    });

    expect(result.value).toBe(0);
  });

  it("calculates force", () => {
    const result = calculateWork({
      work: 150,
      distance: 6,
      solveFor: "force",
    });

    expect(result.value).toBe(25);
    expect(result.details.force).toBe(25);
  });

  it("calculates negative force", () => {
    const result = calculateWork({
      work: -90,
      distance: 3,
      solveFor: "force",
    });

    expect(result.value).toBe(-30);
  });

  it("calculates distance", () => {
    const result = calculateWork({
      work: 120,
      force: 24,
      solveFor: "distance",
    });

    expect(result.value).toBe(5);
    expect(result.details.distance).toBe(5);
  });

  it("calculates distance from negative work and force", () => {
    const result = calculateWork({
      work: -80,
      force: -20,
      solveFor: "distance",
    });

    expect(result.value).toBe(4);
  });

  it("rejects zero distance", () => {
    expect(() =>
      calculateWork({
        force: 10,
        distance: 0,
        solveFor: "work",
      }),
    ).toThrow(
      "Distance must be greater than zero.",
    );
  });

  it("rejects negative distance", () => {
    expect(() =>
      calculateWork({
        force: 10,
        distance: -2,
        solveFor: "work",
      }),
    ).toThrow(
      "Distance must be greater than zero.",
    );
  });

  it("rejects zero force when calculating distance", () => {
    expect(() =>
      calculateWork({
        work: 20,
        force: 0,
        solveFor: "distance",
      }),
    ).toThrow(
      "Force must not be zero when calculating distance.",
    );
  });

  it("rejects mismatched signs when calculating distance", () => {
    expect(() =>
      calculateWork({
        work: -40,
        force: 10,
        solveFor: "distance",
      }),
    ).toThrow(
      "Work and force must have matching signs when calculating distance.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateWork({
        force: Number.POSITIVE_INFINITY,
        distance: 5,
        solveFor: "work",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });
});
