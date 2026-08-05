const CANONICAL_HOST = "sciencecalchub.com";

export function createCanonicalHostRedirect() {
  return {
    source: "/:path*",
    has: [
      {
        type: "host" as const,
        value: `www.${CANONICAL_HOST}`,
      },
    ],
    destination: `https://${CANONICAL_HOST}/:path*`,
    permanent: true,
  };
}
