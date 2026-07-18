import type { Metadata } from "next";
import Link from "next/link";

import { OhmsLawCalculator } from "@/components/calculators/ohms-law-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Ohm's Law Calculator";
const pageDescription =
  "Calculate voltage, current, resistance, or electrical power using Ohm's law and related power formulas, with worked examples and calculation steps.";

const pagePath =
  "/calculators/ohms-law-calculator";

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
      "What formula does the Ohm's law calculator use?",
    answer:
      "The primary formula is V = I × R, where V is voltage, I is current, and R is resistance. It also uses P = V × I and equivalent electrical power formulas.",
  },
  {
    question:
      "Can this calculator find electrical power?",
    answer:
      "Yes. It can calculate power from voltage and current, current and resistance, or voltage and resistance.",
  },
  {
    question:
      "What units should I use for Ohm's law?",
    answer:
      "Use volts for voltage, amperes for current, ohms for resistance, and watts for power.",
  },
  {
    question:
      "Can voltage, current, or resistance be zero?",
    answer:
      "This calculator requires positive, non-zero inputs because several rearranged formulas divide by these quantities.",
  },
  {
    question:
      "Does Ohm's law apply to every electrical component?",
    answer:
      "No. The simple relationship V = I × R is most appropriate for ohmic components whose resistance remains effectively constant under the stated conditions.",
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

export default function OhmsLawCalculatorPage() {
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
                Ohm&apos;s Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electricity and circuits
            </p>

            <h1>Ohm&apos;s Law Calculator</h1>

            <p>
              Calculate voltage, current,
              resistance, or electrical power from
              any compatible pair of known circuit
              values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Ohm's law calculator"
      >
        <Container>
          <OhmsLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Circuit relationship
              </p>

              <h2 id="overview-heading">
                What is Ohm&apos;s law?
              </h2>

              <p>
                Ohm&apos;s law describes the
                relationship between voltage,
                electric current, and resistance in
                an ohmic circuit. Increasing voltage
                increases current when resistance
                remains constant.
              </p>

              <p>
                Increasing resistance reduces current
                when the applied voltage remains
                constant. The law is widely used to
                analyze basic direct-current circuits
                and electrical components.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Ohm&apos;s law formula
              </h2>

              <div className="formula-card">
                <p>
                  Voltage
                  <span>V = I × R</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>V</strong> is voltage in
                  volts.
                </li>

                <li>
                  <strong>I</strong> is current in
                  amperes.
                </li>

                <li>
                  <strong>R</strong> is resistance in
                  ohms.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for current or resistance
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Current
                  </p>

                  <h3>I = V ÷ R</h3>

                  <p>
                    Divide voltage by resistance.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Resistance
                  </p>

                  <h3>R = V ÷ I</h3>

                  <p>
                    Divide voltage by current.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="power-heading">
              <p className="eyebrow">
                Electrical power
              </p>

              <h2 id="power-heading">
                Ohm&apos;s law power formulas
              </h2>

              <p>
                Electrical power can be combined with
                Ohm&apos;s law to calculate all four
                circuit quantities.
              </p>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Voltage and current
                  </p>

                  <h3>P = V × I</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Current and resistance
                  </p>

                  <h3>P = I² × R</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Voltage and resistance
                  </p>

                  <h3>P = V² ÷ R</h3>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Find voltage from 2 A and 6 Ω
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>V = I × R</strong>.
                </li>

                <li>
                  Substitute the known values:{" "}
                  <strong>V = 2 × 6</strong>.
                </li>

                <li>
                  Calculate the voltage:{" "}
                  <strong>V = 12 V</strong>.
                </li>

                <li>
                  Calculate electrical power:{" "}
                  <strong>
                    P = V × I = 12 × 2 = 24 W
                  </strong>
                  .
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Standard units
              </p>

              <h2 id="units-heading">
                Volts, amperes, ohms, and watts
              </h2>

              <ul className="article-list">
                <li>
                  Voltage is measured in volts (V).
                </li>

                <li>
                  Current is measured in amperes (A).
                </li>

                <li>
                  Resistance is measured in ohms (Ω).
                </li>

                <li>
                  Electrical power is measured in
                  watts (W).
                </li>
              </ul>

              <p>
                Convert millivolts, milliamperes,
                kilo-ohms, or other prefixes to
                consistent base units before entering
                values.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Model limitations
              </p>

              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>

              <p>
                The calculation assumes an ohmic
                component with effectively constant
                resistance. Real resistance may
                change with temperature, current,
                voltage, material properties, or
                operating conditions.
              </p>

              <p>
                Semiconductor devices, lamps,
                electrolytes, and other non-ohmic
                components may not follow a constant
                linear voltage-current relationship.
                Complex alternating-current circuits
                may also require impedance and phase
                calculations.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue analyzing electricity and
                energy
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/power-calculator"
                >
                  Power Calculator
                </Link>{" "}
                to analyze mechanical work and energy
                transfer rates.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/kirchhoffs-law-calculator"
                >
                  Kirchhoff&apos;s Law Calculator
                </Link>{" "}
                when a circuit contains multiple loops or junctions
                that cannot be solved using Ohm&apos;s law alone.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/work-calculator"
                >
                  Work Calculator
                </Link>{" "}
                to explore the relationship between
                force, displacement, and energy.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Ohm&apos;s law calculator FAQ
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
                Ohm&apos;s law formula checklist
              </h2>

              <ul>
                <li>V = I × R</li>
                <li>I = V ÷ R</li>
                <li>R = V ÷ I</li>
                <li>P = V × I</li>
                <li>Use consistent units</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate power</h2>

              <p>
                Calculate power, work, or elapsed
                time using the mechanical power
                formula.
              </p>

              <Link href="/calculators/power-calculator">
                Open Power Calculator
              </Link>
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
