import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { SeriesParallelResistanceCalculator } from "@/components/calculators/series-parallel-resistance-calculator";
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
  "Series and Parallel Resistance Calculator";

const pageDescription =
  "Calculate equivalent resistance for two or more resistors connected in series or parallel, with formulas, worked examples, and circuit guidance.";

const pagePath =
  "/calculators/series-parallel-resistance-calculator";

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
      "How do you calculate resistance in series?",
    answer:
      "Add every resistor value directly. For example, three resistors of 100 ohms, 220 ohms, and 330 ohms have an equivalent series resistance of 650 ohms.",
  },
  {
    question:
      "How do you calculate resistance in parallel?",
    answer:
      "Add the reciprocals of the resistor values and then take the reciprocal of that sum. The general equation is 1 divided by equivalent resistance equals 1 divided by R1 plus 1 divided by R2 and so on.",
  },
  {
    question:
      "Is parallel resistance always lower than the smallest resistor?",
    answer:
      "Yes. For positive finite resistor values, the equivalent resistance of a parallel network is always lower than the smallest individual branch resistance.",
  },
  {
    question:
      "Is series resistance always greater than each resistor?",
    answer:
      "Yes. Because all positive resistor values are added, the equivalent series resistance is greater than every individual resistor in the series network.",
  },
  {
    question:
      "Can I enter resistance values in kilo-ohms?",
    answer:
      "The calculator interprets entries as ohms. Convert kilo-ohms to ohms before entering them, so 1 kilo-ohm should be entered as 1000 ohms.",
  },
] as const;

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const faqSchema = createFaqSchema(faqItems);

const breadcrumbSchema =
  createBreadcrumbSchema({
    pageName: pageTitle,
    pagePath,
  });

export default function SeriesParallelResistanceCalculatorPage() {
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
          <nav
            className="breadcrumbs"
            aria-label="Breadcrumb"
          >
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/calculators">
                  Calculators
                </Link>
              </li>

              <li aria-current="page">
                Series and Parallel Resistance
                Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Resistor networks and circuit analysis
            </p>

            <h1>
              Series and Parallel Resistance Calculator
            </h1>

            <p>
              Calculate the equivalent resistance of two
              or more resistors connected in series or
              parallel and review the formula used for the
              selected circuit arrangement.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Series and parallel resistance calculator"
      >
        <Container>
          <SeriesParallelResistanceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Equivalent resistance
              </p>

              <h2 id="overview-heading">
                What is equivalent resistance?
              </h2>

              <p>
                Equivalent resistance is the single
                resistance value that can replace a group
                of resistors without changing the overall
                electrical behavior seen across the
                network terminals.
              </p>

              <p>
                The method used to calculate equivalent
                resistance depends on whether the
                resistors are connected in series or in
                parallel.
              </p>
            </section>

            <section aria-labelledby="series-heading">
              <p className="eyebrow">
                One current path
              </p>

              <h2 id="series-heading">
                Series resistance formula
              </h2>

              <p>
                Resistors are connected in series when
                current passes through each resistor one
                after another along a single path.
              </p>

              <div className="formula-card">
                <p>
                  Equivalent series resistance
                  <span>
                    Req = R1 + R2 + R3 + ...
                  </span>
                </p>
              </div>

              <p>
                Every resistor contributes additional
                opposition to current, so series
                resistance increases as more resistors
                are added.
              </p>
            </section>

            <section aria-labelledby="series-example-heading">
              <p className="eyebrow">
                Worked series example
              </p>

              <h2 id="series-example-heading">
                Calculate three resistors in series
              </h2>

              <p>
                Suppose three resistors have values of
                100 Ω, 220 Ω, and 330 Ω.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>
                    Req = R1 + R2 + R3
                  </strong>
                  .
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    Req = 100 + 220 + 330
                  </strong>
                  .
                </li>

                <li>
                  Add the resistance values:{" "}
                  <strong>Req = 650 Ω</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="parallel-heading">
              <p className="eyebrow">
                Multiple current paths
              </p>

              <h2 id="parallel-heading">
                Parallel resistance formula
              </h2>

              <p>
                Resistors are connected in parallel when
                each resistor is connected across the
                same two circuit nodes. Current can split
                between the available branches.
              </p>

              <div className="formula-card">
                <p>
                  General parallel equation
                  <span>
                    1/Req = 1/R1 + 1/R2 + 1/R3 + ...
                  </span>
                </p>
              </div>

              <p>
                After adding the reciprocals, take the
                reciprocal of the total to obtain the
                equivalent resistance.
              </p>
            </section>

            <section aria-labelledby="two-parallel-heading">
              <p className="eyebrow">
                Two-resistor shortcut
              </p>

              <h2 id="two-parallel-heading">
                Parallel formula for two resistors
              </h2>

              <p>
                When exactly two resistors are connected
                in parallel, the general equation can be
                simplified.
              </p>

              <div className="formula-card">
                <p>
                  Two parallel resistors
                  <span>
                    Req = R1 × R2 ÷ (R1 + R2)
                  </span>
                </p>
              </div>

              <p>
                This shortcut gives the same result as
                the reciprocal method and is often faster
                for manual calculations.
              </p>
            </section>

            <section aria-labelledby="parallel-example-heading">
              <p className="eyebrow">
                Worked parallel example
              </p>

              <h2 id="parallel-example-heading">
                Calculate two resistors in parallel
              </h2>

              <p>
                Consider a 100 Ω resistor and a 220 Ω
                resistor connected in parallel.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the shortcut formula:{" "}
                  <strong>
                    Req = R1 × R2 ÷ (R1 + R2)
                  </strong>
                  .
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    Req = 100 × 220 ÷ (100 + 220)
                  </strong>
                  .
                </li>

                <li>
                  Multiply the numerator:{" "}
                  <strong>100 × 220 = 22,000</strong>.
                </li>

                <li>
                  Add the denominator:{" "}
                  <strong>100 + 220 = 320</strong>.
                </li>

                <li>
                  Divide to obtain{" "}
                  <strong>
                    Req = 68.75 Ω
                  </strong>
                  .
                </li>
              </ol>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">
                Circuit behavior
              </p>

              <h2 id="comparison-heading">
                Series versus parallel resistance
              </h2>

              <ul className="article-list">
                <li>
                  Series resistance is the sum of all
                  resistor values.
                </li>

                <li>
                  Series equivalent resistance is greater
                  than every individual resistor.
                </li>

                <li>
                  Parallel networks provide multiple
                  paths for current.
                </li>

                <li>
                  Parallel equivalent resistance is lower
                  than the smallest branch resistance.
                </li>

                <li>
                  Adding another resistor in series
                  increases total resistance.
                </li>

                <li>
                  Adding another resistor in parallel
                  decreases total resistance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="equal-heading">
              <p className="eyebrow">
                Identical resistor shortcut
              </p>

              <h2 id="equal-heading">
                Equal resistors in series or parallel
              </h2>

              <p>
                When all resistor values are equal, simple
                shortcuts can be used.
              </p>

              <div className="formula-card">
                <p>
                  Equal resistors in series
                  <span>Req = n × R</span>
                </p>

                <p>
                  Equal resistors in parallel
                  <span>Req = R ÷ n</span>
                </p>
              </div>

              <p>
                Here, <strong>R</strong> is the value of
                one resistor and <strong>n</strong> is
                the number of identical resistors.
              </p>

              <p>
                For example, three 1,000 Ω resistors in
                parallel have an equivalent resistance
                of approximately 333.333 Ω.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Consistent measurements
              </p>

              <h2 id="units-heading">
                Resistance units and conversions
              </h2>

              <p>
                This calculator accepts resistance values
                in ohms. Convert larger units before
                entering them.
              </p>

              <ul className="article-list">
                <li>
                  1 kilo-ohm equals 1,000 ohms.
                </li>

                <li>
                  1 mega-ohm equals 1,000,000 ohms.
                </li>

                <li>
                  4.7 kΩ should be entered as 4,700 Ω.
                </li>

                <li>
                  2.2 MΩ should be entered as
                  2,200,000 Ω.
                </li>
              </ul>

              <p>
                The result display automatically converts
                large equivalent values to kilo-ohms or
                mega-ohms for readability.
              </p>
            </section>

            <section aria-labelledby="checks-heading">
              <p className="eyebrow">
                Result validation
              </p>

              <h2 id="checks-heading">
                Quick checks for your answer
              </h2>

              <p>
                These rules can help detect common input
                or calculation mistakes.
              </p>

              <ul className="article-list">
                <li>
                  A series result must be larger than each
                  positive resistor value.
                </li>

                <li>
                  A parallel result must be smaller than
                  the smallest positive branch resistance.
                </li>

                <li>
                  Two equal resistors in parallel produce
                  half the resistance of either resistor.
                </li>

                <li>
                  Two equal resistors in series produce
                  twice the resistance of either resistor.
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Common calculation errors
              </p>

              <h2 id="mistakes-heading">
                Mistakes to avoid
              </h2>

              <ul className="article-list">
                <li>
                  Do not add parallel resistor values
                  directly.
                </li>

                <li>
                  Do not forget to take the final
                  reciprocal in the general parallel
                  equation.
                </li>

                <li>
                  Convert kilo-ohms and mega-ohms to ohms
                  before mixing them with values already
                  expressed in ohms.
                </li>

                <li>
                  Confirm that the circuit really is a
                  pure series or pure parallel network
                  before applying these formulas.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Assumptions and limitations
              </h2>

              <p>
                This calculator assumes ideal, positive,
                finite resistors arranged as one complete
                series group or one complete parallel
                group.
              </p>

              <p>
                It does not automatically reduce mixed
                series-parallel networks, bridge circuits,
                resistor tolerances, temperature effects,
                nonlinear components, or frequency-
                dependent impedance.
              </p>

              <p>
                Real resistor values may differ from their
                nominal ratings because of manufacturing
                tolerance and operating temperature.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="series-parallel-resistance-calculator"
              heading="Continue your resistance-network analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Series and parallel resistance FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="article-sidebar__card">
              <p className="eyebrow">
                Quick reference
              </p>

              <h2>Resistance network rules</h2>

              <ul className="article-list">
                <li>
                  Series: add all resistor values.
                </li>

                <li>
                  Parallel: add reciprocal values.
                </li>

                <li>
                  Use positive values expressed in ohms.
                </li>

                <li>
                  Enter at least two resistors.
                </li>
              </ul>
            </div>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
