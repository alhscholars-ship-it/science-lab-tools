import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { CurrentDividerCalculator } from "@/components/calculators/current-divider-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Current Divider Calculator";

const pageDescription =
  "Calculate branch current, total current, or either resistance in an ideal two-resistor parallel current divider circuit.";

const pagePath =
  "/calculators/current-divider-calculator";

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
      "What formula does the current divider calculator use?",
    answer:
      "For two parallel resistors, the current through branch one is I1 = It × R2 ÷ (R1 + R2). The current through a branch depends on the resistance of the opposite branch.",
  },
  {
    question:
      "Why does the lower-resistance branch carry more current?",
    answer:
      "Parallel branches have the same voltage across them. According to Ohm's law, a lower resistance therefore draws a larger current.",
  },
  {
    question:
      "Can this calculator find either resistor value?",
    answer:
      "Yes. It can rearrange the two-branch current-divider equation to calculate R1 or R2 when branch-one current, total current, and the other resistance are known.",
  },
  {
    question:
      "Must both resistance values use the same unit?",
    answer:
      "Yes. Both resistances must use the same unit, such as ohms, kilo-ohms, or mega-ohms. The calculated resistance will use that same unit.",
  },
  {
    question:
      "Does the calculator support more than two branches?",
    answer:
      "No. This calculator directly models two ideal parallel resistive branches. A network with more branches requires conductance-based current division or reduction of the network first.",
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

export default function CurrentDividerCalculatorPage() {
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
                Current Divider Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electricity and parallel circuits
            </p>

            <h1>Current Divider Calculator</h1>

            <p>
              Calculate branch current, total current,
              branch-one resistance, or branch-two
              resistance in an ideal two-resistor
              parallel circuit.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Current divider calculator"
      >
        <Container>
          <CurrentDividerCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Parallel current distribution
              </p>

              <h2 id="overview-heading">
                What is a current divider?
              </h2>

              <p>
                A current divider is a parallel circuit
                in which the total current separates
                between two or more branches. Each
                branch carries part of the incoming
                current.
              </p>

              <p>
                The current is not usually divided
                equally. A branch with lower resistance
                carries more current, while a branch
                with higher resistance carries less
                current.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Current divider formula
              </h2>

              <div className="formula-card">
                <p>
                  Branch-one current
                  <span>
                    I1 = It × R2 ÷ (R1 + R2)
                  </span>
                </p>

                <p>
                  Branch-two current
                  <span>
                    I2 = It × R1 ÷ (R1 + R2)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>It</strong> is the total
                  current entering the parallel network.
                </li>

                <li>
                  <strong>I1</strong> is the current
                  through resistor R1.
                </li>

                <li>
                  <strong>I2</strong> is the current
                  through resistor R2.
                </li>

                <li>
                  <strong>R1</strong> and{" "}
                  <strong>R2</strong> are the two
                  parallel branch resistances.
                </li>
              </ul>
            </section>

            <section aria-labelledby="opposite-heading">
              <p className="eyebrow">
                Important relationship
              </p>

              <h2 id="opposite-heading">
                Why does the formula use the opposite
                resistance?
              </h2>

              <p>
                The current through R1 is multiplied by
                R2, while the current through R2 is
                multiplied by R1. This opposite-
                resistance relationship reflects the
                inverse relationship between current
                and resistance.
              </p>

              <p>
                Increasing R1 reduces the current
                through branch one and causes a larger
                share of total current to flow through
                branch two.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve every supported variable
              </p>

              <h2 id="rearranged-heading">
                Rearranged current-divider equations
              </h2>

              <div className="formula-card">
                <p>
                  Total current
                  <span>
                    It = I1 × (R1 + R2) ÷ R2
                  </span>
                </p>

                <p>
                  Branch-one resistance
                  <span>
                    R1 = R2 × (It − I1) ÷ I1
                  </span>
                </p>

                <p>
                  Branch-two resistance
                  <span>
                    R2 = I1 × R1 ÷ (It − I1)
                  </span>
                </p>
              </div>

              <p>
                The known branch current must be greater
                than zero and lower than total current.
                Otherwise, the two-branch parallel model
                cannot produce a positive resistance for
                the other branch.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked calculation
              </p>

              <h2 id="example-heading">
                Calculate current through branch one
              </h2>

              <p>
                Suppose a total current of{" "}
                <strong>3 A</strong> enters two parallel
                branches. R1 is{" "}
                <strong>10 Ω</strong> and R2 is{" "}
                <strong>20 Ω</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>
                    I1 = It × R2 ÷ (R1 + R2)
                  </strong>
                  .
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    I1 = 3 × 20 ÷ (10 + 20)
                  </strong>
                  .
                </li>

                <li>
                  Add the resistances:{" "}
                  <strong>10 + 20 = 30 Ω</strong>.
                </li>

                <li>
                  Divide and calculate:{" "}
                  <strong>I1 = 2 A</strong>.
                </li>
              </ol>

              <p>
                The remaining current is{" "}
                <strong>I2 = 3 − 2 = 1 A</strong>.
                The lower-resistance branch therefore
                carries twice as much current as the
                higher-resistance branch.
              </p>
            </section>

            <section aria-labelledby="kirchhoff-heading">
              <p className="eyebrow">
                Current conservation
              </p>

              <h2 id="kirchhoff-heading">
                Current divider and Kirchhoff&apos;s
                current law
              </h2>

              <p>
                Kirchhoff&apos;s current law states that
                the current entering a junction equals
                the current leaving that junction.
              </p>

              <div className="formula-card">
                <p>
                  Total branch current
                  <span>It = I1 + I2</span>
                </p>
              </div>

              <p>
                The calculator uses this relationship to
                display the current in the second branch
                after calculating branch-one current.
              </p>
            </section>

            <section aria-labelledby="equivalent-heading">
              <p className="eyebrow">
                Parallel network resistance
              </p>

              <h2 id="equivalent-heading">
                Equivalent resistance and circuit
                voltage
              </h2>

              <p>
                The equivalent resistance of two
                parallel resistors is:
              </p>

              <div className="formula-card">
                <p>
                  Parallel resistance
                  <span>
                    Req = R1 × R2 ÷ (R1 + R2)
                  </span>
                </p>

                <p>
                  Circuit voltage
                  <span>V = It × Req</span>
                </p>
              </div>

              <p>
                Because parallel branches share the same
                voltage, this voltage can also be
                verified using{" "}
                <strong>V = I1 × R1</strong> or{" "}
                <strong>V = I2 × R2</strong>.
              </p>
            </section>

            <section aria-labelledby="conductance-heading">
              <p className="eyebrow">
                Multiple parallel branches
              </p>

              <h2 id="conductance-heading">
                Current division using conductance
              </h2>

              <p>
                For a network containing more than two
                parallel resistors, conductance provides
                a convenient general formula.
                Conductance is the reciprocal of
                resistance.
              </p>

              <div className="formula-card">
                <p>
                  Branch conductance
                  <span>Gk = 1 ÷ Rk</span>
                </p>

                <p>
                  Branch current
                  <span>
                    Ik = It × Gk ÷ ΣG
                  </span>
                </p>
              </div>

              <p>
                This page&apos;s calculator is designed
                specifically for two branches, so larger
                networks should be analyzed separately
                or reduced to an equivalent two-branch
                arrangement.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Consistent measurements
              </p>

              <h2 id="units-heading">
                Current and resistance units
              </h2>

              <ul className="article-list">
                <li>
                  Enter current values using the same
                  current unit.
                </li>

                <li>
                  Enter both resistance values using the
                  same resistance unit.
                </li>

                <li>
                  Amperes and ohms produce circuit
                  voltage in volts.
                </li>

                <li>
                  Milliampere inputs may be used
                  consistently, but any derived voltage
                  must be interpreted with the chosen
                  current scale.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical uses
              </p>

              <h2 id="applications-heading">
                Where current-divider calculations are
                used
              </h2>

              <ul className="article-list">
                <li>
                  Parallel resistor and load analysis.
                </li>

                <li>
                  Current sharing between circuit
                  branches.
                </li>

                <li>
                  Shunt-resistor measurement circuits.
                </li>

                <li>
                  Bias networks and transistor circuits.
                </li>

                <li>
                  Electrical laboratory exercises and
                  circuit verification.
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
                This calculator assumes two ideal,
                positive, finite resistors connected
                directly in parallel. Both branches are
                assumed to share the same voltage.
              </p>

              <p>
                It does not model nonlinear components,
                reactive impedance, source resistance,
                resistor tolerance, temperature change,
                transient behavior, or unequal branch
                voltages.
              </p>

              <p>
                AC circuits containing capacitors or
                inductors require impedance-based
                current division rather than resistance-
                only formulas.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="current-divider-calculator"
              heading="Continue your current-divider and circuit analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Current divider calculator FAQ
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
            <div className="article-sidebar__card">
              <p className="eyebrow">
                Quick reference
              </p>

              <h2>Current-divider rules</h2>

              <ul className="article-list">
                <li>
                  Parallel branches share the same
                  voltage.
                </li>

                <li>
                  Lower resistance carries more current.
                </li>

                <li>
                  Total current equals all branch
                  currents combined.
                </li>

                <li>
                  Use positive values and consistent
                  units.
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
