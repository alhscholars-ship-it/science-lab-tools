import type { MetadataRoute } from "next";

import { calculators } from "@/content/calculators/registry";
import { scienceFormulas } from "@/content/formulas/registry";
import { scienceGuides } from "@/content/guides/registry";
import { sitemapRoutes } from "@/content/site-routes";
import { scienceAITools } from "@/content/ai-tools/registry";

const productionOrigin = "https://sciencecalchub.com";

function productionUrl(path: string): string {
  return new URL(path.startsWith("/") ? path : `/${path}`, `${productionOrigin}/`).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = sitemapRoutes.map(
    ({
      path,
      changeFrequency,
      priority,
    }) => ({
      url: productionUrl(path),
      changeFrequency,
      priority,
    }),
  );

  const calculatorEntries = calculators.map(({ href }) => ({
    url: productionUrl(href),
  }));

  const formulaEntries = scienceFormulas.map(({ slug }) => ({
    url: productionUrl(`/formulas/${slug}`),
  }));

  const guideEntries = scienceGuides.map(({ slug }) => ({
    url: productionUrl(`/guides/${slug}`),
  }));

  const aiToolEntries = scienceAITools.map(({ href }) => ({
    url: productionUrl(href),
  }));

  return [
    ...staticEntries,
    ...calculatorEntries,
    ...formulaEntries,
    ...guideEntries,
    ...aiToolEntries,
  ];
}
