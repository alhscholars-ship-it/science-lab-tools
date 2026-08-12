const developmentUrl = "http://localhost:3000";

type SiteUrlOptions = {
  configuredUrl?: string;
  environment?: string;
  vercelProductionUrl?: string;
};

function asHttpsUrl(hostname: string | undefined): string | undefined {
  const value = hostname?.trim();
  return value ? `https://${value}` : undefined;
}

export function resolveSiteUrl({
  configuredUrl,
  environment = process.env.NODE_ENV,
  vercelProductionUrl,
}: SiteUrlOptions = {}): string {
  const isProduction = environment === "production";
  const candidate =
    configuredUrl?.trim() || asHttpsUrl(vercelProductionUrl);

  if (!candidate) {
    if (isProduction) {
      throw new Error(
        "A production site URL is required. Set NEXT_PUBLIC_SITE_URL to the canonical HTTPS origin.",
      );
    }

    return developmentUrl;
  }

  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be a valid absolute URL.",
    );
  }

  if (
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must contain only the site origin, without credentials, a path, query, or fragment.",
    );
  }

  if (
    isProduction &&
    (url.protocol !== "https:" ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1")
  ) {
    throw new Error(
      "Production NEXT_PUBLIC_SITE_URL must use HTTPS and cannot point to localhost.",
    );
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must use HTTP or HTTPS.",
    );
  }

  return url.origin;
}
