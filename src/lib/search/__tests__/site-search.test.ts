import { describe, expect, it } from "vitest";

import { calculators } from "@/content/calculators/registry";
import { scienceFormulas } from "@/content/formulas/registry";
import { labReportResources } from "@/content/lab-reports/registry";
import { scientificMethodResources } from "@/content/scientific-method/registry";
import { templateResources } from "@/content/templates/registry";

import { searchSite, siteSearchIndex } from "../site-search";

describe("site search", () => {
  it("indexes every published searchable resource exactly once", () => {
    const expectedCount = calculators.length + scienceFormulas.length
      + labReportResources.length + scientificMethodResources.length
      + templateResources.length;

    expect(siteSearchIndex).toHaveLength(expectedCount);
    expect(new Set(siteSearchIndex.map(({ href }) => href)).size).toBe(expectedCount);
  });

  it("ranks exact and title matches ahead of description-only matches", () => {
    const results = searchSite("molarity");
    expect(results[0].href).toBe("/calculators/molarity-calculator");
  });

  it("searches across each resource family", () => {
    expect(searchSite("lab report introduction").some(({ type }) => type === "Lab Report Guide")).toBe(true);
    expect(searchSite("controlled variables").some(({ type }) => type === "Scientific Method Guide")).toBe(true);
    expect(searchSite("printable worksheet").some(({ type }) => type === "Template")).toBe(true);
    expect(searchSite("kinetic energy").some(({ type }) => type === "Calculator")).toBe(true);
    expect(searchSite("newtons second law formula").some(({ type }) => type === "Formula")).toBe(true);
  });

  it("links formula results to their exact library entries", () => {
    const formula = searchSite("ohms law formula").find(
      ({ type }) => type === "Formula",
    );

    expect(formula?.href).toBe("/formulas#ohms-law");
  });

  it("normalizes punctuation and enforces limits", () => {
    expect(searchSite("mean, median & mode", 1)).toHaveLength(1);
    expect(searchSite("science", 4)).toHaveLength(4);
    expect(searchSite("   ")).toEqual([]);
  });
});
