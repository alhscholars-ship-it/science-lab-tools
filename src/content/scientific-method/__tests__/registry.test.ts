import { describe, expect, it } from "vitest";

import {
  plannedScientificMethodResources,
  publishedScientificMethodResources,
  scientificMethodCategories,
  scientificMethodResources,
} from "../registry";

describe("scientific method resource registry", () => {
  it("contains the planned scientific method cluster", () => {
    expect(scientificMethodResources).toHaveLength(8);
  });

  it("uses unique slugs", () => {
    const slugs = scientificMethodResources.map(
      (resource) => resource.slug,
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses unique route paths", () => {
    const hrefs = scientificMethodResources.map(
      (resource) => resource.href,
    );

    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("uses scientific method route paths", () => {
    for (const resource of scientificMethodResources) {
      expect(resource.href).toBe(
        `/scientific-method/${resource.slug}`,
      );
    }
  });

  it("provides useful SEO fields for every resource", () => {
    for (const resource of scientificMethodResources) {
      expect(resource.title.length).toBeGreaterThan(10);
      expect(resource.shortDescription.length).toBeGreaterThan(
        60,
      );
      expect(resource.keywords.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("tracks published and planned resources", () => {
    expect(publishedScientificMethodResources).toHaveLength(8);
    expect(plannedScientificMethodResources).toHaveLength(0);
  });

  it("contains the expected content categories", () => {
    expect(scientificMethodCategories).toEqual([
      "Core Guide",
      "Writing Skill",
      "Experiment Design",
      "Data Analysis",
    ]);
  });
});
