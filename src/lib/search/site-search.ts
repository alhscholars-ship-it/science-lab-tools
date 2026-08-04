import { calculators } from "@/content/calculators/registry";
import { labReportResources } from "@/content/lab-reports/registry";
import { scientificMethodResources } from "@/content/scientific-method/registry";
import { templateResources } from "@/content/templates/registry";

export type SearchResourceType =
  | "Calculator"
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

function scoreResource(resource: SearchResource, terms: readonly string[]): number {
  const title = normalize(resource.title);
  const keywords = normalize(resource.keywords.join(" "));
  const description = normalize(resource.description);
  const category = normalize(`${resource.type} ${resource.category}`);

  let score = 0;
  for (const term of terms) {
    if (title === term) score += 20;
    else if (title.startsWith(term)) score += 12;
    else if (title.includes(term)) score += 8;

    if (keywords.includes(term)) score += 5;
    if (category.includes(term)) score += 3;
    if (description.includes(term)) score += 1;
  }
  return score;
}

export function searchSite(query: string, limit = 30): SearchResource[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery || limit < 1) return [];

  const terms = [...new Set(normalizedQuery.split(/\s+/).filter(Boolean))];

  return siteSearchIndex
    .map((resource) => ({ resource, score: scoreResource(resource, terms) }))
    .filter(({ score }) => score > 0)
    .sort((first, second) =>
      second.score - first.score || first.resource.title.localeCompare(second.resource.title),
    )
    .slice(0, limit)
    .map(({ resource }) => resource);
}
