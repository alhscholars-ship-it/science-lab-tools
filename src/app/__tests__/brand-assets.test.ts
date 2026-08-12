import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const iconSource = readFileSync(
  "src/app/icon.tsx",
  "utf8",
);

const appleIconSource = readFileSync(
  "src/app/apple-icon.tsx",
  "utf8",
);

const openGraphSource = readFileSync(
  "src/app/opengraph-image.tsx",
  "utf8",
);

const twitterSource = readFileSync(
  "src/app/twitter-image.tsx",
  "utf8",
);

const manifestSource = readFileSync(
  "src/app/manifest.ts",
  "utf8",
);

describe("brand assets", () => {
  it("defines the expected generated image dimensions", () => {
    expect(iconSource).toContain("width: 512");
    expect(iconSource).toContain("height: 512");

    expect(appleIconSource).toContain("width: 180");
    expect(appleIconSource).toContain("height: 180");

    expect(openGraphSource).toContain("width: 1200");
    expect(openGraphSource).toContain("height: 630");

    expect(twitterSource).toContain(
      'from "./opengraph-image"',
    );
  });

  it("uses PNG content types for generated images", () => {
    expect(iconSource).toContain(
      'export const contentType = "image/png"',
    );

    expect(appleIconSource).toContain(
      'export const contentType = "image/png"',
    );

    expect(openGraphSource).toContain(
      'export const contentType = "image/png"',
    );

    expect(twitterSource).toContain("contentType");
  });

  it("provides descriptive Open Graph alt text", () => {
    expect(openGraphSource).toContain("siteConfig.name");
    expect(openGraphSource).toContain("siteConfig.description");
  });

  it("uses the ALH brand palette instead of the sister project's colors", () => {
    expect(iconSource).not.toContain("#0f766e");
    expect(appleIconSource).not.toContain("#0f766e");
    expect(openGraphSource).not.toContain("#0f766e");
    expect(openGraphSource).not.toContain("Science Lab Tools");
  });

  it("defines a stable and scoped web app identity", () => {
    expect(manifestSource).toContain('id: "/"');
    expect(manifestSource).toContain('start_url: "/"');
    expect(manifestSource).toContain('scope: "/"');
    expect(manifestSource).toContain('display: "standalone"');
    expect(manifestSource).toContain('orientation: "any"');
  });

  it("declares manifest language and categories", () => {
    expect(manifestSource).toContain("lang: siteConfig.language");
    expect(manifestSource).toContain('dir: "ltr"');
    expect(manifestSource).toContain(
      '["education", "science", "utilities"]',
    );
  });

  it("includes generated icons in the web manifest", () => {
    expect(manifestSource).toContain(
      'src: "/icon"',
    );

    expect(manifestSource).toContain(
      'sizes: "512x512"',
    );

    expect(manifestSource).toContain(
      'purpose: "maskable"',
    );

    expect(manifestSource).toContain(
      'src: "/apple-icon"',
    );

    expect(manifestSource).toContain(
      'sizes: "180x180"',
    );

    expect(manifestSource).toContain(
      'src: "/favicon.ico"',
    );
  });
});
