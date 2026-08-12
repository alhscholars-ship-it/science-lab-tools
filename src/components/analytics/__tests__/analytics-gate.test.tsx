import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnalyticsGate } from "../analytics-gate";

describe("AnalyticsGate", () => {
  it("renders nothing when no measurement ID is configured", () => {
    const markup = renderToStaticMarkup(
      <AnalyticsGate measurementId={null} />,
    );

    expect(markup).toBe("");
  });

  it("shows the consent banner instead of loading analytics before a decision exists", () => {
    const markup = renderToStaticMarkup(
      <AnalyticsGate measurementId="G-TEST12345" />,
    );

    expect(markup).toContain("Analytics preferences");
    expect(markup).not.toContain("googletagmanager.com/gtag/js");
    expect(markup).not.toContain("google-analytics");
  });
});
