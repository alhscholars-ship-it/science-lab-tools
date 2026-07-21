import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const ohmsLawPage = readFileSync(
  "src/app/calculators/ohms-law-calculator/page.tsx",
  "utf8",
);

describe("related calculators pilot coverage", () => {
  it("imports the reusable component exactly once", () => {
    const imports =
      ohmsLawPage.match(
        /from "@\/components\/related-calculators";/g,
      ) ?? [];

    expect(imports).toHaveLength(1);
  });

  it("renders exactly one related calculators section", () => {
    const components =
      ohmsLawPage.match(/<RelatedCalculators/g) ?? [];

    expect(components).toHaveLength(1);
  });

  it("uses the correct current calculator slug", () => {
    expect(ohmsLawPage).toContain(
      'currentSlug="ohms-law-calculator"',
    );
  });

  it("keeps exactly one trust panel", () => {
    const trustPanels =
      ohmsLawPage.match(
        /<CalculatorTrustPanel subject="physics" \/>/g,
      ) ?? [];

    expect(trustPanels).toHaveLength(1);
  });

  it("removes the previous mixed-topic related content", () => {
    expect(ohmsLawPage).not.toContain(
      'aria-labelledby="related-heading"',
    );
    expect(ohmsLawPage).not.toContain(
      'href="/calculators/work-calculator"',
    );
    expect(ohmsLawPage).not.toContain(
      'href="/calculators/power-calculator"',
    );
    expect(ohmsLawPage).not.toContain(
      "<h2>Calculate power</h2>",
    );
  });
});
