import type { ExtractedValue } from "./value-extractor";


export type CalculationResult = {
  name: string;
  result: string;
};


export function calculateScience(
  topic: string,
  values: ExtractedValue[],
  question?: string,
): CalculationResult | null {


  if (
    topic === "physics" &&
    question !== undefined &&
    /\bspeed\b/i.test(question) &&
    !/\b(?:not|no)\s+speed\b/i.test(question)
  ) {
    const distance = values.find((item) => item.unit === "m");
    const time = values.find((item) => item.unit === "s");

    if (distance && time && time.value > 0 && distance.value >= 0) {
      return {
        name: "Speed Calculation",
        result: `v = d / t = ${distance.value} / ${time.value} = ${distance.value / time.value} m/s`,
      };
    }

    return null;
  }

  if (
    topic === "physics" &&
    question !== undefined &&
    /\bkinetic\s+energy\b/i.test(question) &&
    !/\b(?:not|no)\s+kinetic\s+energy\b/i.test(question)
  ) {
    const mass = values.find(
      (item) => item.unit === "kg"
    );

    const velocity = values.find(
      (item) => item.unit === "m/s"
    );

    if (
      mass &&
      velocity &&
      Number.isFinite(mass.value) &&
      Number.isFinite(velocity.value) &&
      mass.value >= 0
    ) {
      const energy =
        0.5 * mass.value * velocity.value ** 2;

      if (!Number.isFinite(energy)) {
        return null;
      }

      return {
        name: "Kinetic Energy Calculation",
        result:
          `KE = 0.5 × m × v² = 0.5 × ${mass.value} × ${velocity.value}² = ${energy} J`,
      };
    }

    return null;
  }

  const forceExcluded =
    question !== undefined &&
    (
      /\b(?:not|no)\s+force\b/i.test(question) ||
      /\bwithout\s+calculat(?:ing|ion)\b/i.test(question) ||
      /\b(?:do\s+not|don't|dont)\s+calculat(?:e|ing)\b/i.test(question)
    );

  const forceRequested =
    !forceExcluded &&
    (
      question === undefined ||
      /\bforce\b/i.test(question)
    );

  if (topic === "physics" && forceRequested) {

    const mass =
      values.find(
        (item) => item.unit === "kg",
      );

    const acceleration =
      values.find(
        (item) =>
          item.unit === "m/s²" ||
          item.unit === "m/s2",
      );


    if (mass && acceleration) {

      return {
        name: "Force Calculation",

        result:
          `F = m × a = ${mass.value} × ${acceleration.value} = ${mass.value * acceleration.value} N`,
      };

    }

  }


  return null;

}
