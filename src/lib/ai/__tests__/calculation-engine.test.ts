
describe("Science AI calculation intent", () => {
  const values = extractValues(
    "mass 5 kg acceleration 3 m/s²",
  );

  it("calculates force when explicitly requested", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "Calculate force for mass 5 kg and acceleration 3 m/s²",
      ),
    ).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 5 × 3 = 15 N",
    });
  });

  it("avoids force calculation for a kinetic energy question", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "Calculate kinetic energy for mass 5 kg and acceleration 3 m/s²",
      ),
    ).toBeNull();
  });

  it("avoids force calculation for a speed question", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "Calculate speed for mass 5 kg and acceleration 3 m/s²",
      ),
    ).toBeNull();
  });

  it("preserves force calculation when question is omitted", () => {
    expect(calculateScience("physics", values)).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 5 × 3 = 15 N",
    });
  });
});

import { describe, expect, it } from "vitest";

import { calculateScience } from "../calculation-engine";
import { extractValues } from "../value-extractor";


describe("Science AI ambiguous calculation intent", () => {
  const values = extractValues(
    "mass 5 kg acceleration 3 m/s²",
  );

  it("does not calculate force when explicitly excluded", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "Calculate kinetic energy, not force, for mass 5 kg and acceleration 3 m/s²",
      ),
    ).toBeNull();
  });

  it("does not calculate force when only explaining force", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "Explain force using mass 5 kg and acceleration 3 m/s² without calculating it",
      ),
    ).toBeNull();
  });

  it("calculates force for a direct request", () => {
    expect(
      calculateScience(
        "physics",
        values,
        "What is the force for mass 5 kg and acceleration 3 m/s²?",
      ),
    ).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 5 × 3 = 15 N",
    });
  });
});


describe("Science AI speed calculations", () => {
  it("calculates speed from distance and time", () => {
    const question = "Calculate speed for distance 100 m and time 20 s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toEqual({
      name: "Speed Calculation",
      result: "v = d / t = 100 / 20 = 5 m/s",
    });
  });

  it("supports decimal distance and time", () => {
    const question = "Calculate speed for distance 12.5 m and time 2.5 s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toEqual({
      name: "Speed Calculation",
      result: "v = d / t = 12.5 / 2.5 = 5 m/s",
    });
  });

  it("does not divide by zero", () => {
    const question = "Calculate speed for distance 100 m and time 0 s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });

  it("does not calculate speed without time", () => {
    const question = "Calculate speed for distance 100 m";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });

  it("does not calculate speed for a force question", () => {
    const question = "Calculate force for distance 100 m and time 20 s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });
});


describe("Science AI kinetic energy calculations", () => {
  it("calculates kinetic energy from mass and velocity", () => {
    const question = "Calculate kinetic energy for mass 4 kg and velocity 3 m/s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toEqual({
      name: "Kinetic Energy Calculation",
      result: "KE = 0.5 × m × v² = 0.5 × 4 × 3² = 18 J",
    });
  });

  it("supports decimal mass and velocity", () => {
    const question = "Calculate kinetic energy for mass 2.5 kg and velocity 4 m/s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toEqual({
      name: "Kinetic Energy Calculation",
      result: "KE = 0.5 × m × v² = 0.5 × 2.5 × 4² = 20 J",
    });
  });

  it("returns null when velocity is missing", () => {
    const question = "Calculate kinetic energy for mass 4 kg";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });

  it("does not confuse acceleration with velocity", () => {
    const question = "Calculate kinetic energy for mass 4 kg and acceleration 3 m/s²";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });

  it("does not calculate kinetic energy for a force question", () => {
    const question = "Calculate force for mass 4 kg and velocity 3 m/s";
    const values = extractValues(question);

    expect(calculateScience("physics", values, question)).toBeNull();
  });

  it("does not calculate kinetic energy for unrelated topics", () => {
    const question = "Calculate kinetic energy for mass 4 kg and velocity 3 m/s";
    const values = extractValues(question);

    expect(calculateScience("chemistry", values, question)).toBeNull();
  });
});

describe("Science AI force calculations", () => {
  it("calculates force using F = m × a", () => {
    const values = extractValues(
      "Calculate force for mass 5 kg and acceleration 3 m/s²",
    );

    expect(calculateScience("physics", values)).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 5 × 3 = 15 N",
    });
  });

  it("calculates force without spaces between numbers and units", () => {
    const values = extractValues(
      "Calculate force for mass 5kg and acceleration 3m/s2",
    );

    expect(calculateScience("physics", values)).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 5 × 3 = 15 N",
    });
  });

  it("supports decimal mass and acceleration", () => {
    const values = extractValues(
      "mass 2.5 kg acceleration 4 m/s²",
    );

    expect(calculateScience("physics", values)).toEqual({
      name: "Force Calculation",
      result: "F = m × a = 2.5 × 4 = 10 N",
    });
  });

  it("does not calculate force when acceleration is missing", () => {
    const values = extractValues("mass 5 kg");

    expect(calculateScience("physics", values)).toBeNull();
  });

  it("does not calculate force for unrelated topics", () => {
    const values = extractValues(
      "mass 5 kg acceleration 3 m/s²",
    );

    expect(calculateScience("chemistry", values)).toBeNull();
  });
});
