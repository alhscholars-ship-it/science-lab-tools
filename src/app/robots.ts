import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

export default function robots(): MetadataRoute.Robots {
  const isProduction = siteConfig.url.startsWith("https://");

  return {
    rules: isProduction
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/_next/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
