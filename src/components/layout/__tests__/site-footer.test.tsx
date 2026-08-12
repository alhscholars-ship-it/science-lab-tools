import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

import { SiteFooter } from "../site-footer";

describe("SiteFooter", () => {
  it("links to the public issue tracker so visitors have a real contact method", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain(
      `href="${siteConfig.feedback.newIssueUrl}"`,
    );
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain("Report an issue");
  });

  it("offers a way to change cookie preferences", () => {
    const markup = renderToStaticMarkup(<SiteFooter />);

    expect(markup).toContain("Cookie preferences");
  });
});
