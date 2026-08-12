import type { MetadataRoute } from "next";

import { calculators } from "@/content/calculators/registry";
import { sitemapRoutes } from "@/content/site-routes";

const productionOrigin = "https://sciencecalchub.com";

function productionUrl(path: string): string {
  return new URL(path.startsWith("/") ? path : `/${path}`, `${productionOrigin}/`).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = sitemapRoutes.map(({ path }) => ({
    url: productionUrl(path),
  }));

  const calculatorEntries = calculators.map(({ href }) => ({
    url: productionUrl(href),
  }));

  return [...staticEntries, ...calculatorEntries];
}
