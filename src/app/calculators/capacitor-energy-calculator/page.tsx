import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { CapacitorEnergyCalculator } from "@/components/calculators/capacitor-energy-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Capacitor Energy Calculator";

const pageDescription =
  "Calculate energy stored in a capacitor, capacitance, charge, or voltage using U = 1/2 CV², U = 1/2 QV, and U = Q²/2C.";

const pagePath =
  "/calculators/capacitor-energy-calculator";

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
      "What formulas does the capacitor energy calculator use?",
    answer:
      "It uses U = 1/2 CV², U = 1/2 QV, and U = Q²/(2C), depending on which two capacitor values are known.",
  },
  {
    question:
      "What is the unit of energy stored in a capacitor?",
    answer:
      "Capacitor energy is measured in joules, written J.",
  },
  {
    question:
      "How do I calculate capacitor energy from capacitance and voltage?",
    answer:
      "Multiply one-half by capacitance and by the square of voltage using U = 1/2 CV².",
  },
  {
    question:
      "Why does capacitor energy depend on voltage squared?",
    answer:
      "As voltage increases, both the stored charge and the energy per unit charge increase, so total stored energy grows with V².",
  },
  {
    question:
      "Is this the same as a capacitance calculator?",
    answer:
      "No. A capacitance calculator focuses on C = Q/V. This calculator focuses on stored electrical energy and related rearrangements.",
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

export default function CapacitorEnergyCalculatorPage() {
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
                Capacitor Energy Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrical energy storage
            </p>

            <h1>Capacitor Energy Calculator</h1>

            <p>
              Calculate stored capacitor energy,
              capacitance, charge, or voltage from a
              compatible pair of known values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Capacitor energy calculator"
      >
        <Container>
          <CapacitorEnergyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Stored electrical energy
              </p>

              <h2 id="overview-heading">
                What is capacitor energy?
              </h2>

              <p>
                A charged capacitor stores electrical
                potential energy in the electric field
                between its conductors.
              </p>

              <p>
                The stored energy depends on the
                capacitor&apos;s capacitance, voltage,
                and charge. This calculator supports
                the three standard equivalent energy
                formulas.
              </p>
            </section>

            <section aria-labelledby="formulas-heading">
              <p className="eyebrow">
                Equivalent equations
              </p>

              <h2 id="formulas-heading">
                Capacitor energy formulas
              </h2>

              <div className="formula-card">
                <p>
                  From capacitance and voltage
                  <span>U = ½CV²</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  From charge and voltage
                  <span>U = ½QV</span>
                </p>
              </div>

              <div className="formula-card">
                <p>
                  From charge and capacitance
                  <span>U = Q² ÷ 2C</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>U</strong> is stored energy
                  in joules.
                </li>
                <li>
                  <strong>C</strong> is capacitance in
                  farads.
                </li>
                <li>
                  <strong>Q</strong> is electric charge
                  in coulombs.
                </li>
                <li>
                  <strong>V</strong> is voltage in
                  volts.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate energy from capacitance and
                voltage
              </h2>

              <p>
                Suppose a capacitor has a capacitance
                of <strong>2 μF</strong> and a voltage
                of <strong>12 V</strong>.
              </p>

              <ol>
                <li>
                  Convert 2 μF to 0.000002 F.
                </li>
                <li>
                  Use U = ½CV².
                </li>
                <li>
                  Substitute C = 0.000002 and V = 12.
                </li>
                <li>
                  U = ½ × 0.000002 × 12².
                </li>
                <li>
                  The stored energy is{" "}
                  <strong>0.000144 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="voltage-heading">
              <p className="eyebrow">
                Voltage effect
              </p>

              <h2 id="voltage-heading">
                Why voltage has a strong effect
              </h2>

              <p>
                In U = ½CV², voltage is squared. This
                means doubling voltage increases
                stored energy by a factor of four when
                capacitance remains constant.
              </p>

              <p>
                Real capacitors have rated voltage
                limits. Exceeding the manufacturer&apos;s
                rating can damage the dielectric and
                create a safety hazard.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Capacitor energy units
              </h2>

              <ul>
                <li>Energy: joules (J).</li>
                <li>Capacitance: farads (F).</li>
                <li>Charge: coulombs (C).</li>
                <li>Voltage: volts (V).</li>
                <li>
                  1 microfarad = 1 × 10⁻⁶ F.
                </li>
                <li>
                  1 millijoule = 1 × 10⁻³ J.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical uses
              </p>

              <h2 id="applications-heading">
                Where capacitor energy matters
              </h2>

              <ul>
                <li>
                  Camera flashes and pulse circuits.
                </li>
                <li>
                  Power-supply smoothing and backup.
                </li>
                <li>
                  Defibrillators and pulsed medical
                  equipment.
                </li>
                <li>
                  Electric vehicle and industrial
                  power electronics.
                </li>
                <li>
                  Laboratory demonstrations of
                  electrical energy storage.
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
                  The capacitor is treated as ideal.
                </li>
                <li>
                  Leakage current is not included.
                </li>
                <li>
                  Equivalent series resistance is not
                  included.
                </li>
                <li>
                  Dielectric heating and losses are
                  ignored.
                </li>
                <li>
                  All inputs are treated as positive
                  magnitudes.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="capacitor-energy-calculator"
              heading="Continue studying capacitors and circuits"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Capacitor energy calculator FAQ
              </h2>

              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
          </article>

          <aside className="article-sidebar">
            <section className="sidebar-card">
              <h2>Energy checklist</h2>

              <ul>
                <li>Convert capacitance to farads</li>
                <li>Enter energy in joules</li>
                <li>Use charge in coulombs</li>
                <li>Use voltage in volts</li>
                <li>Select a compatible value pair</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate capacitance</h2>

              <p>
                Use charge and voltage to calculate
                capacitance directly with C = Q/V.
              </p>

              <Link href="/calculators/capacitance-calculator">
                Open Capacitance Calculator
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
