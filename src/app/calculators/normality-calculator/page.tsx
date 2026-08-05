import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { NormalityCalculator } from "@/components/calculators/normality-calculator";
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
  "Normality Calculator";

const pageDescription =
  "Calculate normality, solute equivalents, or solution volume in liters or milliliters. Includes formulas, n-factor guidance, examples, and limitations.";

const pagePath =
  "/calculators/normality-calculator";

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
      "What is normality in chemistry?",
    answer:
      "Normality is the number of reactive equivalents of solute per liter of total solution. It is commonly written as equivalents per liter or with the symbol N.",
  },
  {
    question:
      "What formula does the normality calculator use?",
    answer:
      "The calculator uses N equals equivalents divided by liters of solution. It can also rearrange the equation to calculate equivalents or solution volume.",
  },
  {
    question:
      "How do I convert moles to equivalents?",
    answer:
      "Multiply moles by the reaction-specific n-factor. The correct n-factor depends on the chemical species and the acid-base, redox, precipitation, or other reaction being analyzed.",
  },
  {
    question:
      "Is normality the same as molarity?",
    answer:
      "Not always. Molarity measures moles per liter, while normality measures reactive equivalents per liter. For a specified reaction, normality equals molarity multiplied by the n-factor.",
  },
  {
    question:
      "Can the same solution have different normalities?",
    answer:
      "Yes. Because equivalents depend on the reaction, the same solution can have different normality values when it participates in different chemical processes.",
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

export default function NormalityCalculatorPage() {
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
            title="Normality Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Reaction-based concentration tool
            </p>

            <h1>
              Normality Calculator
            </h1>

            <p>
              Calculate normality, reactive
              equivalents, or total solution volume
              with automatic liter and milliliter
              conversion.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Normality calculator"
      >
        <Container>
          <NormalityCalculator />
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
                What is normality?
              </h2>

              <p>
                Normality describes the number of
                chemically reactive equivalents of
                solute in each liter of total
                solution.
              </p>

              <p>
                Unlike molarity, normality depends
                not only on the amount of substance
                and solution volume, but also on the
                specific reaction being considered.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Formula
              </p>

              <h2 id="formula-heading">
                Normality formula
              </h2>

              <div className="formula-card">
                <p>
                  Normality
                  <span>
                    N = equivalents ÷ L of solution
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  N is normality in equivalents per
                  liter.
                </li>

                <li>
                  Equivalents represent the reactive
                  capacity of the solute for the
                  specified reaction.
                </li>

                <li>
                  The denominator is the final total
                  solution volume in liters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="method-heading">
              <p className="eyebrow">
                Calculation method
              </p>

              <h2 id="method-heading">
                How to calculate normality
              </h2>

              <ol className="calculation-steps">
                <li>
                  Identify the number of reactive
                  equivalents in the solution.
                </li>

                <li>
                  Determine the final total solution
                  volume.
                </li>

                <li>
                  Convert milliliters to liters when
                  necessary.
                </li>

                <li>
                  Divide equivalents by liters of
                  solution.
                </li>
              </ol>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Normality calculation example
              </h2>

              <p>
                A solution contains{" "}
                <strong>0.5 equivalents</strong> in a
                final volume of{" "}
                <strong>250 mL</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Convert volume:
                  250 mL ÷ 1000 ={" "}
                  <strong>0.25 L</strong>
                </li>

                <li>
                  Apply the formula:
                  0.5 eq ÷ 0.25 L ={" "}
                  <strong>2</strong>
                </li>

                <li>
                  Report the result as{" "}
                  <strong>2 eq/L</strong>, or{" "}
                  <strong>2 N</strong>
                </li>
              </ol>

              <p>
                The solution therefore has a
                normality of{" "}
                <strong>2 N</strong> for the
                specified reaction.
              </p>
            </section>

            <section aria-labelledby="rearrange-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearrange-heading">
                Find equivalents or solution volume
              </h2>

              <div className="formula-card">
                <p>
                  Solute equivalents
                  <span>
                    equivalents = N × L of solution
                  </span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  Solution volume
                  <span>
                    L of solution = equivalents ÷ N
                  </span>
                </p>
              </div>

              <p>
                The calculator automatically
                rearranges the normality equation
                according to the selected unknown.
              </p>
            </section>

            <section aria-labelledby="nfactor-heading">
              <p className="eyebrow">
                Reaction-specific input
              </p>

              <h2 id="nfactor-heading">
                Moles, equivalents, and the n-factor
              </h2>

              <p>
                The calculator accepts equivalents
                directly. When a problem supplies
                moles, convert them using the
                reaction-specific n-factor.
              </p>

              <div className="formula-card">
                <p>
                  Reactive equivalents
                  <span>
                    equivalents = moles × n-factor
                  </span>
                </p>
              </div>

              <p>
                The n-factor may represent donated
                or accepted protons in an acid-base
                reaction, transferred electrons in
                a redox reaction, or another
                reaction-defined capacity.
              </p>

              <p>
                Always determine the n-factor from
                the balanced reaction and the role
                of the chemical species. It is not
                necessarily a permanent property of
                the substance.
              </p>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">
                Concentration comparison
              </p>

              <h2 id="comparison-heading">
                Normality versus molarity
              </h2>

              <p>
                Molarity measures moles per liter of
                solution. Normality measures
                reactive equivalents per liter of
                solution.
              </p>

              <div className="formula-card">
                <p>
                  Relationship for a specified reaction
                  <span>
                    N = M × n-factor
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Molarity unit: mol/L or M.
                </li>

                <li>
                  Normality unit: eq/L or N.
                </li>

                <li>
                  Molarity does not change with the
                  reaction definition.
                </li>

                <li>
                  Normality can change when the
                  relevant reaction changes.
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
                {" "}when the concentration is based
                on moles rather than reactive
                equivalents.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Laboratory applications
              </p>

              <h2 id="applications-heading">
                Where normality is used
              </h2>

              <ul className="article-list">
                <li>
                  Acid-base titrations based on
                  proton transfer.
                </li>

                <li>
                  Oxidation-reduction calculations
                  based on electron transfer.
                </li>

                <li>
                  Precipitation and ion-reaction
                  calculations when equivalents are
                  defined.
                </li>

                <li>
                  Analytical chemistry procedures
                  that report reactive capacity per
                  liter.
                </li>
              </ul>

              <p>
                For dilution calculations involving
                an initial and final concentration,
                use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/dilution-calculator"
                >
                  Dilution Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common errors
              </p>

              <h2 id="mistakes-heading">
                Common normality mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Entering moles directly without
                  applying the correct n-factor.
                </li>

                <li>
                  Treating the n-factor as fixed for
                  every possible reaction.
                </li>

                <li>
                  Using milliliters directly instead
                  of converting them to liters.
                </li>

                <li>
                  Using solvent volume instead of
                  final total solution volume.
                </li>

                <li>
                  Reporting normality without
                  identifying the chemical reaction.
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
                  Equivalents must already reflect
                  the correct reaction-specific
                  n-factor.
                </li>

                <li>
                  Solution volume must represent the
                  final total volume after
                  preparation.
                </li>

                <li>
                  Solution volume must be greater
                  than zero.
                </li>

                <li>
                  The calculator does not infer a
                  balanced reaction or determine the
                  n-factor automatically.
                </li>

                <li>
                  Activity coefficients,
                  non-ideal behavior, and
                  temperature-driven volume changes
                  are not modeled.
                </li>

                <li>
                  Result accuracy depends on the
                  accuracy and chemical relevance of
                  the entered values.
                </li>
              </ul>
            </section>

            <section aria-labelledby="supporting-heading">
              <p className="eyebrow">
                Supporting tools
              </p>

              <h2 id="supporting-heading">
                Prepare the required chemistry inputs
              </h2>

              <p>
                Convert sample mass to moles with
                the{" "}
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
                For concentration based on solvent
                mass rather than solution volume,
                use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/molality-calculator"
                >
                  Molality Calculator
                </Link>
                .
              </p>
            </section>

            <RelatedCalculators
              currentSlug="normality-calculator"
              heading="Continue your concentration calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Normality calculator FAQ
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
                Normality checklist
              </h2>

              <ul>
                <li>
                  Define the chemical reaction.
                </li>
                <li>
                  Determine the correct n-factor.
                </li>
                <li>
                  Convert moles to equivalents.
                </li>
                <li>
                  Use final solution volume.
                </li>
                <li>
                  Convert volume to liters.
                </li>
                <li>
                  Report the result in eq/L or N.
                </li>
              </ul>
            </div>

            <CalculatorTrustPanel subject="chemistry" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
