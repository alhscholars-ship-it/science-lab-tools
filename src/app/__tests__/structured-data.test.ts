import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(
  "src/app/layout.tsx",
  "utf8",
);

describe("sitewide structured data", () => {
  it("defines stable Organization and WebSite entities", () => {
    expect(layoutSource).toContain(
      'absoluteUrl("/#organization")',
    );
    expect(layoutSource).toContain(
      'absoluteUrl("/#website")',
    );
    expect(layoutSource).toContain('"@type": "Organization"');
    expect(layoutSource).toContain('"@type": "WebSite"');
  });

  it("uses the reusable brand mark as the organization logo", () => {
    expect(layoutSource).toContain(
      'absoluteUrl("/brand/science-lab-tools-mark.svg")',
    );
    expect(layoutSource).not.toContain(
      'logo: absoluteUrl("/favicon.ico")',
    );
  });

  it("connects the website publisher to the organization entity", () => {
    expect(layoutSource).toContain(
      'publisher: {\n        "@id": organizationId,',
    );
    expect(layoutSource).toContain(
      "inLanguage: siteConfig.language",
    );
  });
});
