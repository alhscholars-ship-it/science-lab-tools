import { siteConfig } from "./site";

export function createCanonicalHostRedirect() {
  const canonicalHost = new URL(siteConfig.url).host;

  return {
    source: "/:path*",
    has: [
      {
        type: "host" as const,
        value: `www.${canonicalHost}`,
      },
    ],
    destination: `https://${canonicalHost}/:path*`,
    permanent: true,
  };
}
