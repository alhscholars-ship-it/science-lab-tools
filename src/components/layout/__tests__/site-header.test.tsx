import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

import { SiteHeader } from "../site-header";

describe("SiteHeader", () => {
  it("renders desktop and disclosure-based mobile navigation", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup).toContain('aria-label="Main navigation"');
    expect(markup).toContain('class="mobile-navigation"');
    expect(markup).toContain("<summary>");
    expect(markup).toContain('aria-label="Mobile navigation"');

    for (const category of siteConfig.categories) {
      expect(markup.match(new RegExp(`href="${category.href}"`, "g"))).toHaveLength(2);
    }
  });
});
