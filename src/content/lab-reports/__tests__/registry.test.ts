import { describe, expect, it } from "vitest";

import {
  labReportCategories,
  labReportResources,
  plannedLabReportResources,
  publishedLabReportResources,
} from "../registry";

describe("lab report resource registry", () => {
  it("contains ten initial resources", () => {
    expect(labReportResources).toHaveLength(10);
  });

  it("uses unique slugs", () => {
    const slugs = labReportResources.map(
      (resource) => resource.slug,
    );

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses unique routes", () => {
    const routes = labReportResources.map(
      (resource) => resource.href,
    );

    expect(new Set(routes).size).toBe(routes.length);
  });

  it("uses valid lab report routes", () => {
    for (const resource of labReportResources) {
      expect(resource.href).toBe(
        `/lab-reports/${resource.slug}`,
      );
    }
  });

  it("provides descriptions and keywords", () => {
    for (const resource of labReportResources) {
      expect(resource.shortDescription.length).toBeGreaterThan(60);
      expect(resource.keywords.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("uses only registered categories", () => {
    for (const resource of labReportResources) {
      expect(labReportCategories).toContain(resource.category);
    }
  });

  it("separates published and planned resources", () => {
    expect(publishedLabReportResources).toHaveLength(10);
    expect(plannedLabReportResources).toHaveLength(0);
  });
});
