import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const layoutSource = readFileSync("src/app/layout.tsx", "utf8");

describe("root layout analytics wiring", () => {
  it("delegates analytics loading to the consent-gated component", () => {
    expect(layoutSource).toContain(
      "<AnalyticsGate measurementId={gaMeasurementId} />",
    );
  });

  it("never renders the gtag script unconditionally", () => {
    expect(layoutSource).not.toContain("googletagmanager.com/gtag/js");
  });
});
