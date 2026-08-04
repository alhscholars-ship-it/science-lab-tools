import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { MoleFractionCalculator } from "@/components/calculators/mole-fraction-calculator";
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
  "Mole Fraction Calculator";

const pageDescription =
  "Calculate mole fraction, component moles, total moles, and mole percent for a mixture. Review the formula, worked example, assumptions, and common mistakes.";

const pagePath =
  "/calculators/mole-fraction-calculator";

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
      "What is mole fraction?",
    answer:
      "Mole fraction is the number of moles of one component divided by the total number of moles in the mixture. It is dimensionless and normally ranges from 0 to 1.",
  },
  {
    question:
      "What formula does the mole fraction calculator use?",
    answer:
      "The calculator uses xᵢ = nᵢ divided by n total, where nᵢ is the amount of the selected component and n total is the sum of all component moles.",
  },
  {
    question:
      "Can mole fraction be converted to a percentage?",
    answer:
      "Yes. Multiply the mole fraction by 100 to obtain mole percent. A mole fraction of 0.4 is equal to 40 mole percent.",
  },
  {
    question:
      "Do mole fractions in a mixture add up to one?",
    answer:
      "Yes. When every component is included, the sum of all mole fractions in the mixture equals 1, apart from small differences caused by rounding.",
  },
  {
    question:
      "Does mole fraction have a unit?",
    answer:
      "No. Mole fraction is a ratio of two amounts measured in moles, so the mole units cancel and the result is dimensionless.",
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

export default function MoleFractionCalculatorPage() {
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
            title="Mole Fraction Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Mixture-composition chemistry tool
            </p>

            <h1>
              Mole Fraction Calculator
            </h1>

            <p>
              Calculate the mole fraction, mole
              percent, component amount, or total
              amount for a chemical mixture.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Mole fraction calculator"
      >
        <Container>
          <MoleFractionCalculator />
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
                What is mole fraction?
              </h2>

              <p>
                Mole fraction describes the proportion
                of a mixture represented by one
                component. It compares that
                component&apos;s amount in moles with
                the total number of moles in the
                mixture.
              </p>

              <p>
                Because both quantities use moles, their
                units cancel. The result is a
                dimensionless value between 0 and 1.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Mole-fraction formula
              </h2>

              <div className="formula-card">
                <p>
                  Mole fraction
                  <span>
                    xᵢ = nᵢ ÷ nₜₒₜₐₗ
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  xᵢ is the mole fraction of the
                  selected component.
                </li>

                <li>
                  nᵢ is the number of moles of that
                  component.
                </li>

                <li>
                  nₜₒₜₐₗ is the sum of the moles of
                  every component in the mixture.
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to calculate mole fraction
              </h2>

              <ol className="calculation-steps">
                <li>
                  Determine the moles of the selected
                  component.
                </li>

                <li>
                  Add the moles of all mixture
                  components to find total moles.
                </li>

                <li>
                  Divide component moles by total
                  moles.
                </li>

                <li>
                  Multiply by 100 when mole percent is
                  required.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Mole fraction calculation example
              </h2>

              <p>
                A mixture contains{" "}
                <strong>2 mol</strong> of component A
                and <strong>3 mol</strong> of component
                B.
              </p>

              <ol className="calculation-steps">
                <li>
                  Find total moles: 2 + 3 ={" "}
                  <strong>5 mol</strong>
                </li>

                <li>
                  Divide component A by the total:
                  2 ÷ 5 ={" "}
                  <strong>0.4</strong>
                </li>

                <li>
                  Convert to mole percent:
                  0.4 × 100 ={" "}
                  <strong>40%</strong>
                </li>
              </ol>

              <p>
                Component A therefore has a mole
                fraction of <strong>0.4</strong> and a
                mole percent of <strong>40%</strong>.
              </p>
            </section>

            <section aria-labelledby="sum-heading">
              <p className="eyebrow">
                Mixture check
              </p>

              <h2 id="sum-heading">
                Why mole fractions add up to one
              </h2>

              <p>
                Every component&apos;s mole fraction
                represents part of the same total
                mixture. Adding all component
                fractions therefore gives 1.
              </p>

              <div className="formula-card">
                <p>
                  Mixture total
                  <span>
                    x₁ + x₂ + … + xₙ = 1
                  </span>
                </p>
              </div>

              <p>
                A total slightly above or below 1 may
                result from rounding intermediate
                values.
              </p>
            </section>

            <section aria-labelledby="percent-heading">
              <p className="eyebrow">
                Result conversion
              </p>

              <h2 id="percent-heading">
                Mole fraction and mole percent
              </h2>

              <p>
                Mole fraction is normally written as a
                decimal, while mole percent expresses
                the same composition on a percentage
                scale.
              </p>

              <div className="formula-card">
                <p>
                  Mole percent
                  <span>
                    = mole fraction × 100
                  </span>
                </p>
              </div>

              <p>
                For example, a mole fraction of 0.25
                equals 25 mole percent.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common mole-fraction mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Dividing by solvent moles instead of
                  total mixture moles.
                </li>

                <li>
                  Entering grams directly without first
                  converting mass to moles.
                </li>

                <li>
                  Omitting one or more mixture
                  components from the total.
                </li>

                <li>
                  Entering mole percent as a whole
                  number instead of a fraction between
                  0 and 1.
                </li>

                <li>
                  Rounding component amounts too early.
                </li>
              </ul>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>

              <ul className="article-list">
                <li>
                  All component amounts must represent
                  the same mixture.
                </li>

                <li>
                  Total moles must be greater than
                  zero.
                </li>

                <li>
                  Component moles cannot exceed total
                  moles.
                </li>

                <li>
                  The calculation describes
                  composition but does not independently
                  model chemical interactions or
                  non-ideal behavior.
                </li>

                <li>
                  Result accuracy depends on complete
                  and accurate component amounts.
                </li>
              </ul>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Prepare mixture inputs
              </h2>

              <p>
                Convert mass to moles with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>
                , or determine a compound&apos;s molar
                mass with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>
                .
              </p>

              <p>
                For solution concentration work, use
                the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>
                . Gas-mixture calculations may also
                require the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ideal-gas-law-calculator"
                >
                  Ideal Gas Law Calculator
                </Link>
                .
              </p>
            </section>

            <RelatedCalculators
              currentSlug="mole-fraction-calculator"
              heading="Continue your mixture calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Mole fraction calculator FAQ
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
                Mole-fraction checklist
              </h2>

              <ul>
                <li>Convert each amount to moles.</li>
                <li>Add all components.</li>
                <li>Divide component by total.</li>
                <li>Keep the fraction between 0 and 1.</li>
                <li>Multiply by 100 for mole percent.</li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
