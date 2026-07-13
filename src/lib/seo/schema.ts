import { absoluteUrl } from "./url";

export type FaqItem = {
  question: string;
  answer: string;
};

type WebApplicationSchemaInput = {
  name: string;
  description: string;
  path: string;
};

type BreadcrumbSchemaInput = {
  pageName: string;
  pagePath: string;
  parentName?: string;
  parentPath?: string;
};

export function createWebApplicationSchema({
  name,
  description,
  path,
}: WebApplicationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function createFaqSchema(
  items: readonly FaqItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema({
  pageName,
  pagePath,
  parentName = "Calculators",
  parentPath = "/calculators",
}: BreadcrumbSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: parentName,
        item: absoluteUrl(parentPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageName,
        item: absoluteUrl(pagePath),
      },
    ],
  };
}

export function serializeJsonLd(
  schema: unknown,
): string {
  return JSON.stringify(schema).replace(
    /</g,
    "\\u003c",
  );
}
