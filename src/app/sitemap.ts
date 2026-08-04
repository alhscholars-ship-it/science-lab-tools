import type { MetadataRoute } from "next";

import { calculators } from "@/content/calculators/registry";
import { sitemapRoutes } from "@/content/site-routes";
import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = sitemapRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const calculatorEntries = calculators.map(({ href }) => ({
    url: absoluteUrl(href),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...calculatorEntries];
}
