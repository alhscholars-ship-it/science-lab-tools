import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "../site-url";

describe("resolveSiteUrl", () => {
  it("uses localhost only outside production", () => {
    expect(resolveSiteUrl({ environment: "development" })).toBe(
      "http://localhost:3000",
    );
  });

  it("normalizes a configured canonical origin", () => {
    expect(
      resolveSiteUrl({
        configuredUrl: " https://science.example.com/ ",
        environment: "production",
      }),
    ).toBe("https://science.example.com");
  });

  it("uses Vercel's production hostname when available", () => {
    expect(
      resolveSiteUrl({
        environment: "production",
        vercelProductionUrl: "science.example.com",
      }),
    ).toBe("https://science.example.com");
  });

  it("requires an explicit production origin", () => {
    expect(() =>
      resolveSiteUrl({ environment: "production" }),
    ).toThrow(/production site URL is required/i);
  });

  it.each([
    "http://science.example.com",
    "http://localhost:3000",
    "https://127.0.0.1:3000",
  ])("rejects an unsafe production URL: %s", (configuredUrl) => {
    expect(() =>
      resolveSiteUrl({ configuredUrl, environment: "production" }),
    ).toThrow(/must use HTTPS|cannot point to localhost/i);
  });

  it.each([
    "https://science.example.com/path",
    "https://science.example.com?preview=true",
    "https://science.example.com#section",
    "https://user:password@science.example.com",
  ])("rejects a non-origin URL: %s", (configuredUrl) => {
    expect(() => resolveSiteUrl({ configuredUrl })).toThrow(
      /must contain only the site origin/i,
    );
  });
});
