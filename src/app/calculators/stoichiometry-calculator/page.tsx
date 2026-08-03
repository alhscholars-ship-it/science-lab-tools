import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { StoichiometryCalculator } from "@/components/calculators/stoichiometry-calculator";
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

const pageTitle = "Stoichiometry Calculator";

const pageDescription =
  "Convert reactant or product mass and moles using balanced-equation coefficients, mole ratios, and molar masses with formulas and worked examples.";

const pagePath =
  "/calculators/stoichiometry-calculator";

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
      "What formula does the stoichiometry calculator use?",
    answer:
      "It converts the known quantity to moles, applies the target-to-known coefficient ratio, and converts target moles to grams when requested.",
  },
  {
    question:
      "Why must the chemical equation be balanced?",
    answer:
      "Balanced coefficients provide the valid mole ratio between reactants and products.",
  },
  {
    question:
      "When is molar mass required?",
    answer:
      "Molar mass is required whenever the known or target quantity is expressed in grams.",
  },
  {
    question:
      "Can this solve grams-to-grams stoichiometry?",
    answer:
      "Yes. Enter the known mass, both coefficients, and both required molar masses.",
  },
  {
    question:
      "Does this identify a limiting reactant?",
    answer:
      "No. Limiting-reactant calculations require the available quantities of multiple reactants.",
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

export default function StoichiometryCalculatorPage() {
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
            title="Stoichiometry Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Balanced-equation chemistry tool
            </p>

            <h1>Stoichiometry Calculator</h1>

            <p>
              Convert a known reactant or product
              quantity into a target quantity using
              coefficients, mole ratios, and molar
              masses.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Stoichiometry calculator"
      >
        <Container>
          <StoichiometryCalculator />
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
                What is stoichiometry?
              </h2>

              <p>
                Stoichiometry uses a balanced
                chemical equation to calculate the
                quantitative relationship between
                reactants and products.
              </p>

              <p>
                Equation coefficients provide mole
                ratios that connect a known
                substance with a target substance.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Stoichiometry mole-ratio formula
              </h2>

              <div className="formula-card">
                <p>
                  Target moles
                  <span>
                    = known moles × (target
                    coefficient ÷ known
                    coefficient)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Known moles = known mass ÷ known
                  molar mass
                </li>

                <li>
                  Target moles = known moles × mole
                  ratio
                </li>

                <li>
                  Target mass = target moles ×
                  target molar mass
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to calculate stoichiometry
              </h2>

              <ol className="calculation-steps">
                <li>
                  Balance the chemical equation.
                </li>

                <li>
                  Identify the known and target
                  substances.
                </li>

                <li>
                  Convert the known quantity to
                  moles.
                </li>

                <li>
                  Apply the coefficient ratio.
                </li>

                <li>
                  Convert target moles to the
                  requested unit.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Convert hydrogen mass to water mass
              </h2>

              <p>
                For{" "}
                <strong>
                  2H₂ + O₂ → 2H₂O
                </strong>
                , calculate water produced from{" "}
                <strong>4.032 g H₂</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  4.032 ÷ 2.016 ={" "}
                  <strong>2 mol H₂</strong>
                </li>

                <li>
                  2 × (2 ÷ 2) ={" "}
                  <strong>2 mol H₂O</strong>
                </li>

                <li>
                  2 × 18.015 ={" "}
                  <strong>36.03 g H₂O</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="coefficients-heading">
              <p className="eyebrow">
                Balanced equations
              </p>

              <h2 id="coefficients-heading">
                Use coefficients as mole ratios
              </h2>

              <p>
                Enter the numbers written before
                chemical formulas. Do not use
                subscripts inside chemical formulas
                as coefficients.
              </p>

              <p>
                In{" "}
                <strong>
                  N₂ + 3H₂ → 2NH₃
                </strong>
                , the nitrogen-to-ammonia ratio is
                2 ÷ 1.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common stoichiometry mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using an unbalanced equation.
                </li>

                <li>
                  Reversing the coefficient ratio.
                </li>

                <li>
                  Applying mole ratios directly to
                  grams.
                </li>

                <li>
                  Entering an incorrect molar mass.
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
                The equation must be correctly
                balanced, and all coefficients and
                molar masses must match the selected
                substances.
              </p>

              <p>
                The result is theoretical and
                assumes complete reaction.
              </p>

              <p>
                This calculator does not account
                for limiting reactants, excess
                reactants, percent yield,
                impurities, equilibrium, or
                experimental loss.
              </p>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Prepare your chemistry inputs
              </h2>

              <p>
                Find molar mass with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>
                , or convert grams and moles with
                the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>
                .
              </p>
            </section>

            <RelatedCalculators
              currentSlug="stoichiometry-calculator"
              heading="Continue your stoichiometry calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Stoichiometry calculator FAQ
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
                Stoichiometry checklist
              </h2>

              <ul>
                <li>Balance the equation.</li>
                <li>Identify both substances.</li>
                <li>Copy both coefficients.</li>
                <li>Convert grams to moles.</li>
                <li>Apply the correct ratio.</li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
