import { describe, expect, it } from "vitest";

import {
  plannedTemplateResources,
  publishedTemplateResources,
  templateCategories,
  templateResources,
} from "../registry";

describe("template resource registry", () => {
  it("contains the planned template library", () => {
    expect(templateResources).toHaveLength(6);
  });

  it("uses unique slugs", () => {
    const slugs = templateResources.map(
      (resource) => resource.slug,
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses unique route paths", () => {
    const hrefs = templateResources.map(
      (resource) => resource.href,
    );

    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("uses template route paths", () => {
    for (const resource of templateResources) {
      expect(resource.href).toBe(
        `/templates/${resource.slug}`,
      );
    }
  });

  it("provides useful SEO fields for every resource", () => {
    for (const resource of templateResources) {
      expect(resource.title.length).toBeGreaterThan(10);
      expect(resource.shortDescription.length).toBeGreaterThan(
        60,
      );
      expect(resource.keywords.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("tracks published and planned resources", () => {
    expect(publishedTemplateResources).toHaveLength(6);
    expect(plannedTemplateResources).toHaveLength(0);
  });

  it("contains the expected template categories", () => {
    expect(templateCategories).toEqual([
      "Lab Report",
      "Scientific Method",
      "Data Recording",
      "Classroom Worksheet",
    ]);
  });
});
