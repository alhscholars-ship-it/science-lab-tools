import { afterEach, describe, expect, it, vi } from "vitest";

describe("canonical host redirect", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("derives the redirect from the configured production site URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://alh.sciencecalchub.org");
    vi.resetModules();

    const { createCanonicalHostRedirect } = await import("../canonical-host");

    expect(createCanonicalHostRedirect()).toEqual({
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "www.alh.sciencecalchub.org",
        },
      ],
      destination: "https://alh.sciencecalchub.org/:path*",
      permanent: true,
    });
  });

  it("never hardcodes another deployment's domain", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://sciencecalchub.com");
    vi.resetModules();

    const { createCanonicalHostRedirect } = await import("../canonical-host");

    expect(createCanonicalHostRedirect().destination).toBe(
      "https://sciencecalchub.com/:path*",
    );
  });
});
