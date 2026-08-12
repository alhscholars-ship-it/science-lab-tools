import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { AnalyticsConsentBanner } from "../analytics-consent-banner";

describe("AnalyticsConsentBanner", () => {
  it("links to the privacy policy and offers accept and decline actions", () => {
    const markup = renderToStaticMarkup(
      <AnalyticsConsentBanner onRespond={vi.fn()} />,
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('href="/privacy-policy"');
    expect(markup).toContain("Accept");
    expect(markup).toContain("Decline");
  });
});
