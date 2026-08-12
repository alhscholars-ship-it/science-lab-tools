import { describe, expect, it } from "vitest";

import { calculators } from "@/content/calculators/registry";
import { scienceFormulas } from "@/content/formulas/registry";
import { labReportResources } from "@/content/lab-reports/registry";
import { scientificMethodResources } from "@/content/scientific-method/registry";
import { templateResources } from "@/content/templates/registry";

import {
  searchResourceTypes,
  searchSite,
  siteSearchIndex,
} from "../site-search";

describe("site search", () => {
  it("indexes every published searchable resource exactly once", () => {
    const expectedCount = calculators.length + scienceFormulas.length
      + labReportResources.length + scientificMethodResources.length
      + templateResources.length;

    expect(siteSearchIndex).toHaveLength(expectedCount);
    expect(new Set(siteSearchIndex.map(({ href }) => href)).size).toBe(expectedCount);
  });

  it("ranks calculator intent ahead of supporting formula entries", () => {
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

  it("requires every meaningful query term to match", () => {
    const results = searchSite("ohms law formula");

    expect(
      results.some(({ href }) => href === "/formulas#ideal-gas-law"),
    ).toBe(false);
  });

  it("honors explicit resource-type intent", () => {
    expect(searchSite("molarity formula")[0].type).toBe("Formula");
    expect(searchSite("molarity calculator")[0].type).toBe("Calculator");
  });

  it("normalizes punctuation and enforces limits", () => {
    expect(searchSite("mean, median & mode", { limit: 1 })).toHaveLength(1);
    expect(searchSite("science", { limit: 4 })).toHaveLength(4);
    expect(searchSite("   ")).toEqual([]);
  });

  it("restricts results to the requested resource type", () => {
    const results = searchSite("energy", { type: "Calculator" });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(({ type }) => type === "Calculator")).toBe(true);
  });

  it("excludes matches from other resource types when filtered", () => {
    const results = searchSite("ohms law", { type: "Formula" });

    expect(
      results.some(({ href }) => href === "/calculators/ohms-law-calculator"),
    ).toBe(false);
  });

  it("browses every resource of a type alphabetically when no query is given", () => {
    const results = searchSite("", { type: "Template", limit: 3 });

    expect(results).toHaveLength(3);
    expect(results.every(({ type }) => type === "Template")).toBe(true);

    const titles = results.map(({ title }) => title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });

  it("returns nothing for an empty query with no type filter", () => {
    expect(searchSite("")).toEqual([]);
  });

  it("exposes the complete list of filterable resource types", () => {
    expect(searchResourceTypes).toEqual([
      "Calculator",
      "Formula",
      "Lab Report Guide",
      "Scientific Method Guide",
      "Template",
    ]);

    for (const type of searchResourceTypes) {
      expect(siteSearchIndex.some((resource) => resource.type === type)).toBe(
        true,
      );
    }
  });
});
