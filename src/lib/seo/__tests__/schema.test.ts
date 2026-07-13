import { describe, expect, it } from "vitest";

import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "../schema";

describe("SEO schema builders", () => {
  it("creates educational WebApplication schema", () => {
    const schema = createWebApplicationSchema({
      name: "Force Calculator",
      description: "Calculate force.",
      path: "/calculators/force-calculator",
    });

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Force Calculator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
    });

    expect(schema.url).toContain(
      "/calculators/force-calculator",
    );

    expect(schema.offers).toEqual({
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    });
  });

  it("creates FAQPage schema from visible FAQ items", () => {
    const schema = createFaqSchema([
      {
        question: "What is force?",
        answer: "Force is a push or pull.",
      },
      {
        question: "What is its SI unit?",
        answer: "The SI unit is the newton.",
      },
    ]);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);

    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "What is force?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Force is a push or pull.",
      },
    });
  });

  it("creates a three-level calculator breadcrumb", () => {
    const schema = createBreadcrumbSchema({
      pageName: "Force Calculator",
      pagePath: "/calculators/force-calculator",
    });

    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);

    expect(schema.itemListElement.map((item) => ({
      position: item.position,
      name: item.name,
    }))).toEqual([
      {
        position: 1,
        name: "Home",
      },
      {
        position: 2,
        name: "Calculators",
      },
      {
        position: 3,
        name: "Force Calculator",
      },
    ]);
  });

  it("supports a custom parent breadcrumb", () => {
    const schema = createBreadcrumbSchema({
      pageName: "Lab Report Guide",
      pagePath: "/lab-reports/example",
      parentName: "Lab Reports",
      parentPath: "/lab-reports",
    });

    expect(schema.itemListElement[1].name).toBe(
      "Lab Reports",
    );

    expect(schema.itemListElement[1].item).toContain(
      "/lab-reports",
    );
  });

  it("escapes unsafe less-than characters in JSON-LD", () => {
    const serialized = serializeJsonLd({
      value: "</script><script>alert(1)</script>",
    });

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });
});
