import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, `${siteConfig.url}/`).toString();
}
