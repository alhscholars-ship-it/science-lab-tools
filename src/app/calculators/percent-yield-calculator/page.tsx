import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { PercentYieldCalculator } from "@/components/calculators/percent-yield-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle =
  "Percent Yield Calculator";

const pageDescription =
  "Calculate percent yield from actual and theoretical product amounts. Review the formula, worked example, results above 100%, and laboratory limitations.";

const pagePath =
  "/calculators/percent-yield-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl(pagePath),
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    question:
      "What is percent yield?",
    answer:
      "Percent yield compares the amount of product obtained experimentally with the maximum theoretical amount predicted by stoichiometry.",
  },
  {
    question:
      "What formula does the percent yield calculator use?",
    answer:
      "It divides actual yield by theoretical yield and multiplies the ratio by 100.",
  },
  {
    question:
      "Can percent yield be greater than 100%?",
    answer:
      "Yes, but a result above 100% usually indicates impurities, retained solvent, measurement error, incomplete drying, or an incorrect theoretical yield.",
  },
  {
    question:
      "Do actual and theoretical yield need the same unit?",
    answer:
      "Yes. Both quantities must represent the same substance and use compatible units because their units cancel in the ratio.",
  },
  {
    question:
      "Is percent yield the same as percent error?",
    answer:
      "No. Percent yield compares actual product with theoretical product, while percent error compares an experimental measurement with an accepted reference value.",
  },
] as const;

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const faqSchema =
  createFaqSchema(faqItems);

const breadcrumbSchema =
  createBreadcrumbSchema({
    pageName: pageTitle,
    pagePath,
    sectionName: "Chemistry Calculators",
    sectionPath: "/chemistry-calculators",
  });

export default function PercentYieldCalculatorPage() {
  return (
    <main>
      {[
        webApplicationSchema,
        faqSchema,
        breadcrumbSchema,
      ].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema),
          }}
        />
      ))}

      <section className="tool-page-hero">
        <Container>
          <CalculatorBreadcrumb
            category="Chemistry"
            title="Percent Yield Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Reaction-efficiency chemistry tool
            </p>

            <h1>
              Percent Yield Calculator
            </h1>

            <p>
              Compare the product obtained in an
              experiment with the theoretical maximum
              and calculate reaction yield as a
              percentage.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Percent yield calculator"
      >
        <Container>
          <PercentYieldCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Chemistry overview
              </p>

              <h2 id="overview-heading">
                What is percent yield?
              </h2>

              <p>
                Percent yield measures how much product
                a reaction actually produces compared
                with the maximum amount predicted by
                stoichiometry.
              </p>

              <p>
                The calculation helps evaluate reaction
                efficiency, product recovery, and the
                difference between an ideal chemical
                model and an experimental result.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Percent-yield formula
              </h2>

              <div className="formula-card">
                <p>
                  Percent yield
                  <span>
                    = actual yield ÷ theoretical yield
                    × 100
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Actual yield is the measured amount of
                  product recovered.
                </li>

                <li>
                  Theoretical yield is the maximum amount
                  predicted from stoichiometry.
                </li>

                <li>
                  Both yields must describe the same
                  product and use compatible units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to calculate percent yield
              </h2>

              <ol className="calculation-steps">
                <li>
                  Determine the actual amount of product
                  obtained.
                </li>

                <li>
                  Calculate or identify the theoretical
                  product amount.
                </li>

                <li>
                  Confirm that both yields use the same
                  unit.
                </li>

                <li>
                  Divide actual yield by theoretical
                  yield.
                </li>

                <li>
                  Multiply the ratio by 100.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Percent yield chemistry example
              </h2>

              <p>
                A reaction produces{" "}
                <strong>36.03 g</strong> of product.
                Stoichiometry predicts a theoretical
                yield of{" "}
                <strong>40 g</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Divide actual by theoretical yield:
                  36.03 ÷ 40 ={" "}
                  <strong>0.90075</strong>
                </li>

                <li>
                  Multiply by 100: 0.90075 × 100 ={" "}
                  <strong>90.075%</strong>
                </li>
              </ol>

              <p>
                The reaction therefore produced{" "}
                <strong>90.075%</strong> of the
                theoretical product amount.
              </p>
            </section>

            <section aria-labelledby="theoretical-heading">
              <p className="eyebrow">
                Required input
              </p>

              <h2 id="theoretical-heading">
                How to find theoretical yield
              </h2>

              <p>
                Theoretical yield normally comes from a
                balanced equation, the limiting
                reactant, mole ratios, and the product
                molar mass.
              </p>

              <p>
                Identify the reactant that limits product
                formation with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/limiting-reactant-calculator"
                >
                  Limiting Reactant Calculator
                </Link>
                , then calculate the expected product
                amount using the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="over-heading">
              <p className="eyebrow">
                Result interpretation
              </p>

              <h2 id="over-heading">
                Why percent yield can exceed 100%
              </h2>

              <p>
                A calculated yield above 100% does not
                mean that a reaction created more pure
                product than stoichiometry permits.
              </p>

              <p>
                Common causes include retained water or
                solvent, contamination, incomplete
                drying, weighing errors, product
                impurities, or an underestimated
                theoretical yield.
              </p>
            </section>

            <section aria-labelledby="factors-heading">
              <p className="eyebrow">
                Experimental factors
              </p>

              <h2 id="factors-heading">
                What affects percent yield?
              </h2>

              <ul className="article-list">
                <li>
                  Incomplete reaction or insufficient
                  reaction time.
                </li>

                <li>
                  Competing side reactions.
                </li>

                <li>
                  Product loss during filtration,
                  transfer, washing, or purification.
                </li>

                <li>
                  Impure starting materials.
                </li>

                <li>
                  Measurement and balance uncertainty.
                </li>

                <li>
                  Product decomposition or evaporation.
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common percent-yield mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Reversing actual and theoretical
                  yield.
                </li>

                <li>
                  Using yields expressed in different
                  units.
                </li>

                <li>
                  Calculating theoretical yield from the
                  excess reactant.
                </li>

                <li>
                  Using an unbalanced chemical equation.
                </li>

                <li>
                  Treating wet or contaminated product
                  as pure product.
                </li>

                <li>
                  Rounding intermediate results too
                  early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>

              <p>
                The actual and theoretical yields must
                refer to the same product and use
                compatible units. The theoretical yield
                must be greater than zero.
              </p>

              <p>
                Percent yield reports product recovery,
                but it does not independently identify
                purity, selectivity, measurement
                quality, or the cause of material loss.
              </p>

              <p>
                A high percent yield can still represent
                an impure product, while a low value can
                result from reaction inefficiency,
                handling loss, or analytical error.
              </p>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Complete the reaction analysis
              </h2>

              <p>
                Find molar mass with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>
                , or compare a measured value with a
                trusted reference using the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/percent-error-calculator"
                >
                  Percent Error Calculator
                </Link>
                .
              </p>
            </section>

            <RelatedCalculators
              currentSlug="percent-yield-calculator"
              heading="Continue your reaction analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Percent yield calculator FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                    </summary>

                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Quick reference
              </p>

              <h2>
                Percent-yield checklist
              </h2>

              <ul>
                <li>Use the same product.</li>
                <li>Use matching units.</li>
                <li>Find theoretical yield first.</li>
                <li>Divide actual by theoretical.</li>
                <li>Multiply the ratio by 100.</li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
