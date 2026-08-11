import { absoluteUrl } from "./url";

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

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
  sectionName?: string;
  sectionPath?: string;
};

export function createWebApplicationSchema({
  name,
  description,
  path,
}: WebApplicationSchemaInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#application`,
    name,
    description,
    url,
    isPartOf: {
      "@id": websiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern web browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function createFaqSchema(
  items: readonly FaqItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    isPartOf: {
      "@id": websiteId,
    },
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
  sectionName,
  sectionPath,
}: BreadcrumbSchemaInput) {
  const itemListElement = [
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
  ];

  if (sectionName && sectionPath) {
    itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: sectionName,
      item: absoluteUrl(sectionPath),
    });
  }

  itemListElement.push({
    "@type": "ListItem",
    position: itemListElement.length + 1,
    name: pageName,
    item: absoluteUrl(pagePath),
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement,
  };
}


type CollectionPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  items: readonly {
    name: string;
    href: string;
  }[];
};

export function createCollectionPageSchema({
  name,
  description,
  path,
  items,
}: CollectionPageSchemaInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name,
    description,
    url,
    isPartOf: {
      "@id": websiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(item.href),
        name: item.name,
      })),
    },
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
