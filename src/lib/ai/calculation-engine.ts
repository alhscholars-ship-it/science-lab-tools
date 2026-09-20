import type { ExtractedValue } from "./value-extractor";


export type CalculationResult = {
  name: string;
  result: string;
};


export function calculateScience(
  topic: string,
  values: ExtractedValue[],
): CalculationResult | null {


  if (topic === "physics") {

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
