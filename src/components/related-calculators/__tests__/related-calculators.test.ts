import { describe, expect, it } from "vitest";

import { calculators } from "../../../content/calculators/registry";
import { getRelatedCalculators } from "../related-calculators";

describe("related calculator selection", () => {
  it("returns calculators from the current category", () => {
    const related = getRelatedCalculators(
      "molarity-calculator",
      4,
    );

    expect(related).toHaveLength(4);
    expect(
      related.every(
        (calculator) =>
          calculator.category === "Chemistry",
      ),
    ).toBe(true);
  });

  it("excludes the current calculator", () => {
    const related = getRelatedCalculators(
      "acceleration-calculator",
      4,
    );

    expect(
      related.some(
        (calculator) =>
          calculator.slug === "acceleration-calculator",
      ),
    ).toBe(false);
  });

  it("honors the requested limit", () => {
    expect(
      getRelatedCalculators(
        "standard-deviation-calculator",
        3,
      ),
    ).toHaveLength(3);
  });

  it("returns an empty list for an unknown slug", () => {
    expect(
      getRelatedCalculators(
        "unknown-calculator",
        4,
      ),
    ).toEqual([]);
  });

  it("returns an empty list for a non-positive limit", () => {
    expect(
      getRelatedCalculators(
        "force-calculator",
        0,
      ),
    ).toEqual([]);
  });

  it("only returns registered calculators", () => {
    const registrySlugs = new Set(
      calculators.map((calculator) => calculator.slug),
    );

    const related = getRelatedCalculators(
      "force-calculator",
      4,
    );

    expect(
      related.every((calculator) =>
        registrySlugs.has(calculator.slug),
      ),
    ).toBe(true);
  });

  it("connects molarity with chemistry calculation topics", () => {
    const slugs = getRelatedCalculators(
      "molarity-calculator",
      4,
    ).map((calculator) => calculator.slug);

    expect(slugs).toContain(
      "molecular-weight-calculator",
    );
    expect(slugs).toContain("dilution-calculator");
  });

  it("connects kinetic energy with energy and motion topics", () => {
    const slugs = getRelatedCalculators(
      "kinetic-energy-calculator",
      4,
    ).map((calculator) => calculator.slug);

    expect(
      slugs.some((slug) =>
        [
          "momentum-calculator",
          "gravitational-potential-energy-calculator",
          "elastic-potential-energy-calculator",
          "work-calculator",
          "power-calculator",
        ].includes(slug),
      ),
    ).toBe(true);
  });

  it("keeps Ohm's law recommendations electrical", () => {
    const slugs = getRelatedCalculators(
      "ohms-law-calculator",
      4,
    ).map((calculator) => calculator.slug);

    expect(slugs).not.toContain("force-calculator");
    expect(slugs).not.toContain("pulley-calculator");
    expect(slugs).not.toContain(
      "inclined-plane-calculator",
    );

    expect(
      slugs.some((slug) =>
        [
          "kirchhoffs-law-calculator",
          "voltage-drop-calculator",
          "electric-power-calculator",
          "ac-impedance-calculator",
          "rlc-phase-angle-calculator",
        ].includes(slug),
      ),
    ).toBe(true);
  });
});
