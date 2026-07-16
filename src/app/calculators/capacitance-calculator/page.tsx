import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { CapacitanceCalculator } from "@/components/calculators/capacitance-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Capacitance Calculator";

const pageDescription =
  "Calculate capacitance, electric charge, or voltage using C = Q/V, with capacitor formulas, SI units, conversions, examples, and limitations.";

const pagePath =
  "/calculators/capacitance-calculator";

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
      "What formula does the capacitance calculator use?",
    answer:
      "It uses C = Q/V, where capacitance equals stored charge divided by voltage. The equation can also be rearranged as Q = CV and V = Q/C.",
  },
  {
    question:
      "What is the SI unit of capacitance?",
    answer:
      "The SI unit of capacitance is the farad, written F. One farad equals one coulomb of charge stored per volt.",
  },
  {
    question:
      "How do I calculate charge stored by a capacitor?",
    answer:
      "Multiply capacitance by voltage using Q = CV. Use capacitance in farads and voltage in volts to obtain charge in coulombs.",
  },
  {
    question:
      "How do I convert microfarads to farads?",
    answer:
      "Multiply microfarads by 10⁻⁶. For example, 2 microfarads equals 0.000002 farads.",
  },
  {
    question:
      "Does this calculator determine capacitor energy?",
    answer:
      "No. This calculator covers capacitance, charge, and voltage. Capacitor energy requires a separate equation such as U = 1/2 CV².",
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

export default function CapacitanceCalculatorPage() {
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
                Capacitance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Capacitors and stored charge
            </p>

            <h1>Capacitance Calculator</h1>

            <p>
              Calculate capacitance, stored electric
              charge, or voltage from any two known
              capacitor values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Capacitance calculator"
      >
        <Container>
          <CapacitanceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Electrical charge storage
              </p>

              <h2 id="overview-heading">
                What is capacitance?
              </h2>

              <p>
                Capacitance describes the ability of
                a capacitor or electrical system to
                store electric charge when a voltage
                is applied.
              </p>

              <p>
                A larger capacitance means more charge
                can be stored at the same voltage.
                Capacitance depends on the conductor
                geometry, separation, and dielectric
                material.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main capacitor equation
              </p>

              <h2 id="formula-heading">
                Capacitance formula
              </h2>

              <div className="formula-card">
                <p>
                  Capacitance
                  <span>C = Q ÷ V</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>C</strong> is capacitance in
                  farads.
                </li>

                <li>
                  <strong>Q</strong> is stored electric
                  charge in coulombs.
                </li>

                <li>
                  <strong>V</strong> is voltage in
                  volts.
                </li>
              </ul>

              <p>
                The same relationship can be
                rearranged as Q = CV to calculate
                charge and V = Q/C to calculate
                voltage.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate capacitance from charge and
                voltage
              </h2>

              <p>
                Suppose a capacitor stores{" "}
                <strong>0.000024 C</strong> of charge
                at a potential difference of{" "}
                <strong>12 V</strong>.
              </p>

              <ol>
                <li>Use C = Q ÷ V.</li>

                <li>
                  Substitute Q = 0.000024 C and
                  V = 12 V.
                </li>

                <li>
                  C = 0.000024 ÷ 12.
                </li>

                <li>
                  The capacitance is{" "}
                  <strong>0.000002 F</strong>, or{" "}
                  <strong>2 μF</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Farad conversions
              </p>

              <h2 id="units-heading">
                Capacitance units
              </h2>

              <ul>
                <li>1 farad (F) = 1 coulomb per volt.</li>
                <li>
                  1 millifarad (mF) = 10⁻³ F.
                </li>
                <li>
                  1 microfarad (μF) = 10⁻⁶ F.
                </li>
                <li>
                  1 nanofarad (nF) = 10⁻⁹ F.
                </li>
                <li>
                  1 picofarad (pF) = 10⁻¹² F.
                </li>
              </ul>

              <p>
                Convert capacitance to farads before
                entering it. For example, 470 nF is
                entered as 0.00000047 F.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where capacitance is used
              </h2>

              <ul>
                <li>
                  Energy storage in electronic
                  circuits.
                </li>
                <li>
                  Filtering and smoothing power
                  supplies.
                </li>
                <li>
                  Timing circuits and oscillators.
                </li>
                <li>
                  Signal coupling and noise
                  suppression.
                </li>
                <li>
                  Sensors and touch-sensitive devices.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model limitations
              </p>

              <h2 id="limitations-heading">
                Assumptions and limitations
              </h2>

              <ul>
                <li>
                  Values are treated as positive
                  magnitudes.
                </li>
                <li>
                  Capacitance is assumed to remain
                  constant during the calculation.
                </li>
                <li>
                  Leakage current and dielectric loss
                  are not included.
                </li>
                <li>
                  Frequency-dependent capacitance is
                  not modelled.
                </li>
                <li>
                  This calculator does not calculate
                  capacitor energy or RC time
                  constants.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue studying electric circuits
              </h2>

              <div className="related-links">
                <Link href="/calculators/ohms-law-calculator">
                  Ohm&apos;s Law Calculator
                </Link>

                <Link href="/calculators/electric-potential-calculator">
                  Electric Potential Calculator
                </Link>

                <Link href="/calculators/electric-field-calculator">
                  Electric Field Calculator
                </Link>

                <Link href="/calculators/power-calculator">
                  Power Calculator
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Capacitance calculator FAQ
              </h2>

              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                  </summary>

                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
          </article>

          <aside className="article-sidebar">
            <section className="sidebar-card">
              <h2>Capacitance checklist</h2>

              <ul>
                <li>Convert capacitance to farads</li>
                <li>Enter charge in coulombs</li>
                <li>Enter voltage in volts</li>
                <li>Select the unknown variable</li>
                <li>Check the displayed unit</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate electrical values</h2>

              <p>
                Use Ohm&apos;s law to calculate
                voltage, current, resistance, and
                electrical power.
              </p>

              <Link href="/calculators/ohms-law-calculator">
                Open Ohm&apos;s Law Calculator
              </Link>
            </section>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
