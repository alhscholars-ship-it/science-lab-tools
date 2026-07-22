import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const integratedPages = [
  "ac-impedance-calculator",
  "acceleration-calculator",
  "acceleration-due-to-gravity-calculator",
  "angular-acceleration-calculator",
  "angular-displacement-calculator",
  "angular-impulse-calculator",
  "angular-momentum-calculator",
  "angular-velocity-calculator",
  "average-speed-calculator",
  "average-velocity-calculator",
  "centripetal-acceleration-calculator",
  "centripetal-force-calculator",
  "circular-velocity-calculator",
  "elastic-potential-energy-calculator",
  "gravitational-potential-energy-calculator",
  "hookes-law-calculator",
  "kinetic-energy-calculator",
  "force-calculator",
  "friction-calculator",
  "inclined-plane-calculator",
  "normal-force-calculator",
  "power-calculator",
  "rotational-power-calculator",
  "rotational-work-calculator",
  "work-calculator",
  "capacitance-calculator",
  "capacitive-reactance-calculator",
  "capacitor-energy-calculator",
  "inductance-calculator",
  "inductive-reactance-calculator",
  "inductor-energy-calculator",
  "linear-regression-calculator",
  "magnetic-field-calculator",
  "ohms-law-calculator",
  "rc-time-constant-calculator",
  "resonant-frequency-calculator",
  "rl-time-constant-calculator",
  "rlc-bandwidth-calculator",
  "rlc-quality-factor-calculator",
  "voltage-drop-calculator",
] as const;

function readCalculatorPage(slug: string): string {
  return readFileSync(
    `src/app/calculators/${slug}/page.tsx`,
    "utf8",
  );
}

describe("related calculators rollout coverage", () => {
  it("covers the expected integrated calculator pages", () => {
    expect(integratedPages).toHaveLength(40);
    expect(new Set(integratedPages).size).toBe(
      integratedPages.length,
    );
  });

  it.each(integratedPages)(
    "%s imports the reusable component exactly once",
    (slug) => {
      const page = readCalculatorPage(slug);

      const imports =
        page.match(
          /from "@\/components\/related-calculators";/g,
        ) ?? [];

      expect(imports).toHaveLength(1);
    },
  );

  it.each(integratedPages)(
    "%s renders exactly one related calculators component",
    (slug) => {
      const page = readCalculatorPage(slug);

      const components =
        page.match(/<RelatedCalculators\b/g) ?? [];

      expect(components).toHaveLength(1);
    },
  );

  it.each(integratedPages)(
    "%s uses its own calculator slug",
    (slug) => {
      const page = readCalculatorPage(slug);

      expect(page).toContain(
        `currentSlug="${slug}"`,
      );
    },
  );

  it.each(integratedPages)(
    "%s keeps exactly one calculator trust panel",
    (slug) => {
      const page = readCalculatorPage(slug);

      const trustPanels =
        page.match(/<CalculatorTrustPanel\b/g) ?? [];

      expect(trustPanels).toHaveLength(1);
    },
  );

  it.each(integratedPages)(
    "%s removes the previous manual related sidebar card",
    (slug) => {
      const page = readCalculatorPage(slug);

      const sidebarStart = page.indexOf(
        '<aside className="article-sidebar">',
      );
      const sidebarEnd = page.indexOf(
        "</aside>",
        sidebarStart,
      );

      expect(sidebarStart).toBeGreaterThanOrEqual(0);
      expect(sidebarEnd).toBeGreaterThan(sidebarStart);

      const sidebar = page.slice(
        sidebarStart,
        sidebarEnd,
      );

      expect(sidebar).not.toMatch(
        /Related calculator(?:s| statistics)?/,
      );
      expect(sidebar).not.toContain(
        'aria-labelledby="related-heading"',
      );
    },
  );

  it("removes the previous mixed-topic Ohm's Law links", () => {
    const page = readCalculatorPage(
      "ohms-law-calculator",
    );

    expect(page).not.toContain(
      'href="/calculators/work-calculator"',
    );
    expect(page).not.toContain(
      'href="/calculators/power-calculator"',
    );
    expect(page).not.toContain(
      "<h2>Calculate power</h2>",
    );
  });
});
