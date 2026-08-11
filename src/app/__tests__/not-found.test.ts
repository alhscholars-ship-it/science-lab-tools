import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync("src/app/not-found.tsx", "utf8");

describe("not-found page", () => {
  it("prevents indexing while allowing recovery links to be followed", () => {
    expect(source).toContain("index: false");
    expect(source).toContain("follow: true");
  });

  it("links to the primary resource hubs", () => {
    expect(source).toContain('href: "/calculators"');
    expect(source).toContain('href: "/formulas"');
    expect(source).toContain('href: "/templates"');
  });

  it("provides an accessible recovery section", () => {
    expect(source).toContain('aria-labelledby="not-found-heading"');
    expect(source).toContain('aria-label="Page recovery links"');
  });
});
