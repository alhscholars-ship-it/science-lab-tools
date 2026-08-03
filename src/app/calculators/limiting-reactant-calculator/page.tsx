import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { LimitingReactantCalculator } from "@/components/calculators/limiting-reactant-calculator";
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
  "Limiting Reactant Calculator";

const pageDescription =
  "Identify the limiting and excess reactants and calculate theoretical product yield from balanced coefficients, available amounts, and molar masses.";

const pagePath =
  "/calculators/limiting-reactant-calculator";

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
      "What is a limiting reactant?",
    answer:
      "The limiting reactant is the substance that runs out first according to the balanced-equation coefficients and therefore limits the amount of product that can form.",
  },
  {
    question:
      "How does the calculator identify the limiting reactant?",
    answer:
      "It converts each available amount to moles, divides each mole quantity by its balanced coefficient, and selects the smaller reaction capacity.",
  },
  {
    question:
      "Can I enter reactants in grams?",
    answer:
      "Yes. Select grams and enter the correct molar mass for each reactant expressed in grams.",
  },
  {
    question:
      "What does co-limiting mean?",
    answer:
      "Reactants are co-limiting when their coefficient-normalized reaction capacities are equal, so neither reactant remains in excess.",
  },
  {
    question:
      "Does the result equal the actual laboratory yield?",
    answer:
      "No. The calculated product is a theoretical yield that assumes complete reaction, pure reactants, and no experimental loss.",
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

export default function LimitingReactantCalculatorPage() {
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
            title="Limiting Reactant Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Balanced-reaction chemistry tool
            </p>

            <h1>
              Limiting Reactant Calculator
            </h1>

            <p>
              Compare two available reactants,
              identify which one limits the reaction,
              calculate the excess remaining, and find
              the theoretical amount of product.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Limiting reactant calculator"
      >
        <Container>
          <LimitingReactantCalculator />
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
                What is a limiting reactant?
              </h2>

              <p>
                A limiting reactant is consumed first
                when reactants combine according to a
                balanced chemical equation. Once that
                reactant is exhausted, additional
                product cannot form.
              </p>

              <p>
                The other substance is the excess
                reactant. Some of it remains after the
                maximum theoretical reaction has
                occurred.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Limiting-reactant formula
              </h2>

              <div className="formula-card">
                <p>
                  Reaction capacity
                  <span>
                    = available moles ÷ balanced
                    coefficient
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Available moles = mass ÷ molar mass
                  when the input uses grams.
                </li>

                <li>
                  The smaller reaction capacity
                  identifies the limiting reactant.
                </li>

                <li>
                  Product moles = reaction capacity ×
                  product coefficient.
                </li>

                <li>
                  Excess moles = available moles −
                  moles consumed.
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to find the limiting reactant
              </h2>

              <ol className="calculation-steps">
                <li>
                  Balance the chemical equation.
                </li>

                <li>
                  Record the available amount of each
                  reactant.
                </li>

                <li>
                  Convert every mass input to moles.
                </li>

                <li>
                  Divide each reactant&apos;s moles by
                  its coefficient.
                </li>

                <li>
                  Select the smaller reaction capacity.
                </li>

                <li>
                  Use that capacity to calculate product
                  and excess reactant.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Hydrogen and oxygen example
              </h2>

              <p>
                For{" "}
                <strong>
                  2H₂ + O₂ → 2H₂O
                </strong>
                , suppose the reaction starts with{" "}
                <strong>2 mol H₂</strong> and{" "}
                <strong>2 mol O₂</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Hydrogen capacity: 2 ÷ 2 ={" "}
                  <strong>1</strong>
                </li>

                <li>
                  Oxygen capacity: 2 ÷ 1 ={" "}
                  <strong>2</strong>
                </li>

                <li>
                  Hydrogen has the smaller capacity, so
                  it is the{" "}
                  <strong>limiting reactant</strong>.
                </li>

                <li>
                  Product: 1 × 2 ={" "}
                  <strong>2 mol H₂O</strong>
                </li>

                <li>
                  Oxygen remaining: 2 − 1 ={" "}
                  <strong>1 mol O₂</strong>
                </li>
              </ol>
            </section>

            <section aria-labelledby="grams-heading">
              <p className="eyebrow">
                Mass inputs
              </p>

              <h2 id="grams-heading">
                Using grams in the calculator
              </h2>

              <p>
                A balanced equation compares particles
                and moles rather than grams directly.
                The calculator therefore converts every
                mass input to moles before comparing
                reaction capacities.
              </p>

              <p>
                Enter the molar mass in grams per mole
                whenever a reactant or product uses
                grams. Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>
                {" "}when you need to determine a
                compound&apos;s molar mass.
              </p>
            </section>

            <section aria-labelledby="coefficients-heading">
              <p className="eyebrow">
                Balanced coefficients
              </p>

              <h2 id="coefficients-heading">
                Why coefficients matter
              </h2>

              <p>
                Coefficients state the mole ratio in a
                balanced equation. Comparing raw mole
                amounts without dividing by coefficients
                can identify the wrong limiting
                reactant.
              </p>

              <p>
                In{" "}
                <strong>
                  N₂ + 3H₂ → 2NH₃
                </strong>
                , hydrogen moles must be divided by
                three, while nitrogen moles are divided
                by one.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common limiting-reactant mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using coefficients from an unbalanced
                  equation.
                </li>

                <li>
                  Comparing grams directly instead of
                  converting them to moles.
                </li>

                <li>
                  Comparing mole amounts without
                  normalizing by coefficients.
                </li>

                <li>
                  Entering an incorrect molar mass.
                </li>

                <li>
                  Treating theoretical yield as actual
                  experimental yield.
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
                The chemical equation must be correctly
                balanced, and all amounts, coefficients,
                units, and molar masses must correspond
                to the selected substances.
              </p>

              <p>
                The calculation assumes pure reactants,
                complete reaction, and the stated
                stoichiometric pathway.
              </p>

              <p>
                The result does not account for
                impurities, equilibrium, side reactions,
                incomplete conversion, measurement
                uncertainty, or experimental product
                loss.
              </p>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Continue the reaction calculation
              </h2>

              <p>
                Review single-substance mole ratios with
                the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/stoichiometry-calculator"
                >
                  Stoichiometry Calculator
                </Link>
                , or convert between mass and moles with
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
              currentSlug="limiting-reactant-calculator"
              heading="Continue your reaction calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Limiting reactant calculator FAQ
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
                Limiting-reactant checklist
              </h2>

              <ul>
                <li>Balance the equation.</li>
                <li>Convert grams to moles.</li>
                <li>Divide by each coefficient.</li>
                <li>Select the smaller capacity.</li>
                <li>Calculate product and excess.</li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
