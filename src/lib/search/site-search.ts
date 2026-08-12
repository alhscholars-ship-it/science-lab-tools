import { calculators } from "@/content/calculators/registry";
import { scienceFormulas } from "@/content/formulas/registry";
import { labReportResources } from "@/content/lab-reports/registry";
import { scientificMethodResources } from "@/content/scientific-method/registry";
import { templateResources } from "@/content/templates/registry";

export type SearchResourceType =
  | "Calculator"
  | "Formula"
  | "Lab Report Guide"
  | "Scientific Method Guide"
  | "Template";

export type SearchResource = {
  title: string;
  description: string;
  href: string;
  type: SearchResourceType;
  category: string;
  keywords: readonly string[];
};

export const siteSearchIndex: readonly SearchResource[] = [
  ...calculators.map((item) => ({
    title: item.name,
    description: item.shortDescription,
    href: item.href,
    type: "Calculator" as const,
    category: item.category,
    keywords: item.keywords,
  })),
  ...scienceFormulas.map((item) => ({
    title: item.name,
    description: `${item.description} Formula: ${item.equation}`,
    href: `/formulas#${item.slug}`,
    type: "Formula" as const,
    category: item.category,
    keywords: [
      item.slug,
      `${item.name} formula`,
      item.equation,
      ...item.variables,
    ],
  })),
  ...labReportResources.map((item) => ({
    title: item.title,
    description: item.shortDescription,
    href: item.href,
    type: "Lab Report Guide" as const,
    category: item.category,
    keywords: item.keywords,
  })),
  ...scientificMethodResources.map((item) => ({
    title: item.title,
    description: item.shortDescription,
    href: item.href,
    type: "Scientific Method Guide" as const,
    category: item.category,
    keywords: item.keywords,
  })),
  ...templateResources.map((item) => ({
    title: item.title,
    description: item.shortDescription,
    href: item.href,
    type: "Template" as const,
    category: item.category,
    keywords: item.keywords,
  })),
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function intentBoost(
  resource: SearchResource,
  normalizedQuery: string,
): number {
  if (
    resource.type === "Formula"
    && normalizedQuery.includes("formula")
  ) {
    return 30;
  }

  if (
    resource.type === "Calculator"
    && normalizedQuery.includes("calculator")
  ) {
    return 30;
  }

  if (
    resource.type === "Template"
    && (normalizedQuery.includes("template")
      || normalizedQuery.includes("worksheet"))
  ) {
    return 30;
  }

  if (
    resource.type === "Lab Report Guide"
    && normalizedQuery.includes("lab report")
  ) {
    return 20;
  }

  if (
    resource.type === "Scientific Method Guide"
    && normalizedQuery.includes("scientific method")
  ) {
    return 20;
  }

  return resource.type === "Calculator" ? 20 : 0;
}

function scoreResource(
  resource: SearchResource,
  normalizedQuery: string,
  terms: readonly string[],
): number {
  const title = normalize(resource.title);
  const keywords = normalize(resource.keywords.join(" "));
  const description = normalize(resource.description);
  const category = normalize(`${resource.type} ${resource.category}`);
  const searchableText = `${title} ${keywords} ${description} ${category}`;

  if (!terms.every((term) => searchableText.includes(term))) {
    return 0;
  }

  let score = intentBoost(resource, normalizedQuery);

  if (title === normalizedQuery) score += 60;
  else if (title.startsWith(normalizedQuery)) score += 45;
  else if (title.includes(normalizedQuery)) score += 35;

  if (keywords.includes(normalizedQuery)) score += 25;
  if (description.includes(normalizedQuery)) score += 10;
  if (category.includes(normalizedQuery)) score += 8;

  for (const term of terms) {
    if (title.includes(term)) score += 10;
    if (keywords.includes(term)) score += 5;
    if (category.includes(term)) score += 2;
    if (description.includes(term)) score += 1;
  }

  return score;
}

export const searchResourceTypes: readonly SearchResourceType[] = [
  "Calculator",
  "Formula",
  "Lab Report Guide",
  "Scientific Method Guide",
  "Template",
];

export type SearchOptions = {
  limit?: number;
  type?: SearchResourceType;
};

export function searchSite(
  query: string,
  options: SearchOptions = {},
): SearchResource[] {
  const { limit = 30, type } = options;

  if (limit < 1) {
    return [];
  }

  const scopedIndex = type
    ? siteSearchIndex.filter((resource) => resource.type === type)
    : siteSearchIndex;

  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return type
      ? [...scopedIndex]
          .sort((first, second) => first.title.localeCompare(second.title))
          .slice(0, limit)
      : [];
  }

  const terms = [...new Set(normalizedQuery.split(/\s+/).filter(Boolean))];

  return scopedIndex
    .map((resource) => ({
      resource,
      score: scoreResource(resource, normalizedQuery, terms),
    }))
    .filter(({ score }) => score > 0)
    .sort((first, second) =>
      second.score - first.score
      || first.resource.title.localeCompare(second.resource.title),
    )
    .slice(0, limit)
    .map(({ resource }) => resource);
}
