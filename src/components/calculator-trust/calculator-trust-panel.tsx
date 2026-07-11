import Link from "next/link";

import { siteConfig } from "@/config/site";

type CalculatorTrustPanelProps = {
  subject?: string;
};

export function CalculatorTrustPanel({
  subject = "science",
}: CalculatorTrustPanelProps) {
  return (
    <section
      className="calculator-trust-panel"
      aria-labelledby="calculator-trust-heading"
    >
      <div className="calculator-trust-panel__content">
        <p className="eyebrow">Accuracy and transparency</p>

        <h2 id="calculator-trust-heading">
          Created and maintained by our editorial team
        </h2>

        <p>
          This {subject} calculator is maintained by the{" "}
          <strong>{siteConfig.creator}</strong>. Its calculation
          logic is tested with representative inputs, while the
          supporting guidance is checked for formula clarity,
          units, assumptions, and common mistakes.
        </p>

        <p>
          Learn more about our{" "}
          <Link
            className="article-inline-link"
            href="/editorial-policy"
          >
            formula-review and correction process
          </Link>
          , or read{" "}
          <Link
            className="article-inline-link"
            href="/about"
          >
            about Science Lab Tools
          </Link>
          .
        </p>
      </div>

      <ul
        className="calculator-trust-panel__checks"
        aria-label="Calculator quality checks"
      >
        <li>Calculation logic tested</li>
        <li>Variables and units explained</li>
        <li>Assumptions stated clearly</li>
        <li>Corrections handled transparently</li>
      </ul>
    </section>
  );
}
