import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { MolalityCalculator } from "@/components/calculators/molality-calculator";
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
  "Molality Calculator";

const pageDescription =
  "Calculate molality, solute moles, or solvent mass in grams or kilograms. Includes the molality formula, worked examples, unit conversion, and limitations.";

const pagePath =
  "/calculators/molality-calculator";

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
      "What is molality?",
    answer:
      "Molality is the number of moles of solute divided by the mass of solvent in kilograms. Its standard unit is moles per kilogram, written as mol/kg.",
  },
  {
    question:
      "What formula does the molality calculator use?",
    answer:
      "The calculator uses m = n divided by kilograms of solvent, where n is the amount of solute in moles and m is molality in mol/kg.",
  },
  {
    question:
      "Should solvent mass be entered in grams or kilograms?",
    answer:
      "Either unit can be used. The calculator automatically converts grams to kilograms before applying the molality formula.",
  },
  {
    question:
      "Is molality the same as molarity?",
    answer:
      "No. Molality uses kilograms of solvent, while molarity uses liters of total solution. They describe concentration using different denominators.",
  },
  {
    question:
      "Does temperature affect molality?",
    answer:
      "Molality is based on mass rather than volume, so it is generally less sensitive to temperature-driven expansion or contraction than molarity.",
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

export default function MolalityCalculatorPage() {
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
            title="Molality Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Solution-concentration chemistry tool
            </p>

            <h1>
              Molality Calculator
            </h1>

            <p>
              Calculate molality, moles of solute,
              or solvent mass with automatic gram
              and kilogram conversion.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Molality calculator"
      >
        <Container>
          <MolalityCalculator />
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
                What is molality?
              </h2>

              <p>
                Molality measures the number of moles
                of dissolved solute in each kilogram
                of solvent.
              </p>

              <p>
                Unlike concentration measures based
                on solution volume, molality uses the
                mass of the solvent alone.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Molality formula
              </h2>

              <div className="formula-card">
                <p>
                  Molality
                  <span>
                    m = n ÷ kg of solvent
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  m is molality in moles per
                  kilogram.
                </li>

                <li>
                  n is the amount of dissolved
                  solute in moles.
                </li>

                <li>
                  The denominator is solvent mass
                  in kilograms, not total solution
                  mass.
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to calculate molality
              </h2>

              <ol className="calculation-steps">
                <li>
                  Determine the amount of solute in
                  moles.
                </li>

                <li>
                  Identify the mass of solvent
                  separately from the solute.
                </li>

                <li>
                  Convert solvent mass from grams
                  to kilograms when necessary.
                </li>

                <li>
                  Divide solute moles by kilograms
                  of solvent.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Molality calculation example
              </h2>

              <p>
                A solution contains{" "}
                <strong>0.25 mol</strong> of solute
                dissolved in{" "}
                <strong>500 g</strong> of solvent.
              </p>

              <ol className="calculation-steps">
                <li>
                  Convert solvent mass:
                  500 g ÷ 1000 ={" "}
                  <strong>0.5 kg</strong>
                </li>

                <li>
                  Apply the formula:
                  0.25 ÷ 0.5 ={" "}
                  <strong>0.5</strong>
                </li>

                <li>
                  Report the result as{" "}
                  <strong>0.5 mol/kg</strong>
                </li>
              </ol>

              <p>
                The solution therefore has a
                molality of{" "}
                <strong>0.5 mol/kg</strong>.
              </p>
            </section>

            <section aria-labelledby="rearrange-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearrange-heading">
                Find solute moles or solvent mass
              </h2>

              <div className="formula-card">
                <p>
                  Solute moles
                  <span>
                    n = m × kg of solvent
                  </span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Solvent mass
                  <span>
                    kg of solvent = n ÷ m
                  </span>
                </p>
              </div>

              <p>
                The calculator automatically
                rearranges the equation according
                to the selected unknown variable.
              </p>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">
                Concentration comparison
              </p>

              <h2 id="comparison-heading">
                Molality versus molarity
              </h2>

              <p>
                Molality divides solute moles by
                kilograms of solvent. Molarity
                divides solute moles by liters of
                total solution.
              </p>

              <ul className="article-list">
                <li>
                  Molality unit: mol/kg of solvent.
                </li>

                <li>
                  Molarity unit: mol/L of solution.
                </li>

                <li>
                  Molality depends on mass.
                </li>

                <li>
                  Molarity depends on volume.
                </li>
              </ul>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molarity-calculator"
                >
                  Molarity Calculator
                </Link>
                {" "}when the problem provides total
                solution volume rather than solvent
                mass.
              </p>
            </section>

            <section aria-labelledby="temperature-heading">
              <p className="eyebrow">
                Temperature behavior
              </p>

              <h2 id="temperature-heading">
                Why molality is less temperature-dependent
              </h2>

              <p>
                Mass normally remains constant when
                temperature changes, while liquid
                volume can expand or contract.
              </p>

              <p>
                Molality is therefore commonly used
                in calculations where temperature
                changes could make volume-based
                concentration less stable.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common molality mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using total solution mass instead
                  of solvent mass.
                </li>

                <li>
                  Entering grams without converting
                  them to kilograms.
                </li>

                <li>
                  Using solute mass in grams instead
                  of solute amount in moles.
                </li>

                <li>
                  Confusing molality with molarity.
                </li>

                <li>
                  Rounding intermediate values too
                  early.
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
                  Solute amount must be expressed in
                  moles.
                </li>

                <li>
                  Solvent mass must be greater than
                  zero.
                </li>

                <li>
                  Solvent mass must exclude the mass
                  of the dissolved solute.
                </li>

                <li>
                  The calculator reports composition
                  but does not model activity
                  coefficients or non-ideal solution
                  behavior.
                </li>

                <li>
                  Result accuracy depends on the
                  accuracy of the entered amounts.
                </li>
              </ul>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Prepare the required inputs
              </h2>

              <p>
                Convert solute mass to moles with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mass-moles-calculator"
                >
                  Mass to Moles Calculator
                </Link>
                , or determine molar mass using the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molecular-weight-calculator"
                >
                  Molecular Weight Calculator
                </Link>
                .
              </p>

              <p>
                For mixture composition based on
                component and total moles, use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/mole-fraction-calculator"
                >
                  Mole Fraction Calculator
                </Link>
                .
              </p>
            </section>

            <RelatedCalculators
              currentSlug="molality-calculator"
              heading="Continue your solution calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Molality calculator FAQ
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
                Molality checklist
              </h2>

              <ul>
                <li>Use moles of solute.</li>
                <li>Use solvent mass only.</li>
                <li>Convert grams to kilograms.</li>
                <li>Divide moles by kilograms.</li>
                <li>Report the result in mol/kg.</li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
