import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ScientificDataTableTemplatePage from "../page";

describe("ScientificDataTableTemplatePage", () => {
  it("makes horizontally scrollable tables keyboard accessible", () => {
    const markup = renderToStaticMarkup(
      <ScientificDataTableTemplatePage />,
    );

    expect(markup).toContain(
      'role="region" aria-labelledby="primary-table-heading" tabindex="0"',
    );
    expect(markup).toContain(
      'role="region" aria-labelledby="observation-table-heading" tabindex="0"',
    );
  });
});
