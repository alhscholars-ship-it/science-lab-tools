import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ExternalLink } from "../external-link";

describe("ExternalLink", () => {
  it("opens in a new tab safely and announces it to screen readers", () => {
    const markup = renderToStaticMarkup(
      <ExternalLink href="https://example.com/issues">
        Report an issue
      </ExternalLink>,
    );

    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
    expect(markup).toContain('href="https://example.com/issues"');
    expect(markup).toContain("Report an issue");
    expect(markup).toContain("(opens in a new tab)");
  });
});
