import {
  readFileSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { calculators } from "@/content/calculators/registry";

const calculatorDirectory = join(
  process.cwd(),
  "src/app/calculators",
);

const calculatorPages = readdirSync(
  calculatorDirectory,
  {
    withFileTypes: true,
  },
)
  .filter((entry) => entry.isDirectory())
  .map((entry) =>
    join(
      calculatorDirectory,
      entry.name,
      "page.tsx",
    ),
  )
  .filter((pagePath) => {
    try {
      readFileSync(pagePath, "utf8");
      return true;
    } catch {
      return false;
    }
  })
  .sort();

function readPage(pagePath: string) {
  return readFileSync(pagePath, "utf8");
}

describe("calculator metadata coverage", () => {
  it("covers every registry calculator page", () => {
    expect(calculatorPages).toHaveLength(
      calculators.length,
    );
  });

  it("exports typed static metadata on every page", () => {
    for (const pagePath of calculatorPages) {
      const source = readPage(pagePath);

      expect(source).toContain(
        'import type { Metadata } from "next";',
      );

      expect(source).toMatch(
        /export const metadata:\s*Metadata\s*=/,
      );
    }
  });

  it("adds canonical, Open Graph, Twitter, and robots metadata", () => {
    for (const pagePath of calculatorPages) {
      const source = readPage(pagePath);

      expect(source).toMatch(
        /alternates:\s*\{[\s\S]*?canonical:\s*pagePath,/,
      );

      expect(source).toMatch(
        /openGraph:\s*\{[\s\S]*?url:\s*absoluteUrl\(pagePath\),/,
      );

      expect(source).toMatch(
        /twitter:\s*\{[\s\S]*?card:\s*"summary_large_image",/,
      );

      expect(source).toMatch(
        /robots:\s*\{[\s\S]*?index:\s*true,[\s\S]*?follow:\s*true,/,
      );
    }
  });

  it("uses shared title, description, and page path constants", () => {
    for (const pagePath of calculatorPages) {
      const source = readPage(pagePath);

      expect(source).toMatch(
        /const pageTitle\s*=/,
      );

      expect(source).toMatch(
        /const pageDescription\s*=/,
      );

      expect(source).toMatch(
        /const pagePath\s*=/,
      );

      expect(source).toMatch(
        /title:\s*pageTitle,/,
      );

      expect(source).toMatch(
        /description:\s*pageDescription,/,
      );
    }
  });
});
