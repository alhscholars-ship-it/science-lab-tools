import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { CapacitiveReactanceCalculator } from "@/components/calculators/capacitive-reactance-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Capacitive Reactance Calculator";

const pageDescription =
  "Calculate capacitive reactance, frequency, or capacitance using Xc = 1/(2πfC), with AC circuit formulas, units, examples, and limitations.";

const pagePath =
  "/calculators/capacitive-reactance-calculator";

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
      "What formula does the capacitive reactance calculator use?",
    answer:
      "It uses Xc = 1/(2πfC), where Xc is capacitive reactance, f is frequency, and C is capacitance.",
  },
  {
    question:
      "What is the unit of capacitive reactance?",
    answer:
      "Capacitive reactance is measured in ohms, written Ω.",
  },
  {
    question:
      "How does frequency affect capacitive reactance?",
    answer:
      "Capacitive reactance decreases as frequency increases. Doubling frequency halves reactance when capacitance remains constant.",
  },
  {
    question:
      "How do I calculate capacitance from reactance?",
    answer:
      "Divide one by two pi times frequency times reactance using C = 1/(2πfXc).",
  },
  {
    question:
      "Is capacitive reactance the same as resistance?",
    answer:
      "No. Resistance dissipates electrical energy, while ideal capacitive reactance opposes alternating current through electric-field storage.",
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

export default function CapacitiveReactanceCalculatorPage() {
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
                Capacitive Reactance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              AC capacitor behavior
            </p>

            <h1>Capacitive Reactance Calculator</h1>

            <p>
              Calculate capacitive reactance,
              frequency, or capacitance using the
              standard AC capacitor relationship.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Capacitive reactance calculator"
      >
        <Container>
          <CapacitiveReactanceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                AC circuit opposition
              </p>

              <h2 id="overview-heading">
                What is capacitive reactance?
              </h2>

              <p>
                Capacitive reactance is the opposition
                a capacitor presents to alternating
                current as it repeatedly charges and
                discharges.
              </p>

              <p>
                It depends on both AC frequency and
                capacitance and is measured in ohms.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main AC formula
              </p>

              <h2 id="formula-heading">
                Capacitive reactance formula
              </h2>

              <div className="formula-card">
                <p>
                  Capacitive reactance
                  <span>Xc = 1 ÷ (2πfC)</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Xc</strong> is capacitive
                  reactance in ohms.
                </li>
                <li>
                  <strong>f</strong> is frequency in
                  hertz.
                </li>
                <li>
                  <strong>C</strong> is capacitance in
                  farads.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate capacitive reactance
              </h2>

              <p>
                Suppose a capacitor has a capacitance
                of <strong>100 μF</strong> in a
                <strong>50 Hz</strong> AC circuit.
              </p>

              <ol>
                <li>
                  Convert 100 μF to 0.0001 F.
                </li>
                <li>Use Xc = 1/(2πfC).</li>
                <li>
                  Substitute f = 50 Hz and
                  C = 0.0001 F.
                </li>
                <li>
                  Xc = 1/(2 × π × 50 × 0.0001).
                </li>
                <li>
                  The capacitive reactance is about{" "}
                  <strong>31.83 Ω</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="frequency-heading">
              <p className="eyebrow">
                Frequency relationship
              </p>

              <h2 id="frequency-heading">
                How frequency affects reactance
              </h2>

              <p>
                Capacitive reactance decreases as
                frequency increases. A capacitor
                therefore opposes low-frequency
                current more strongly than
                high-frequency current.
              </p>
            </section>

            <section aria-labelledby="capacitance-heading">
              <p className="eyebrow">
                Capacitance relationship
              </p>

              <h2 id="capacitance-heading">
                How capacitance affects reactance
              </h2>

              <p>
                Larger capacitance produces lower
                reactance at the same frequency.
                Smaller capacitors provide greater
                opposition to alternating current.
              </p>
            </section>

            <section aria-labelledby="dc-heading">
              <p className="eyebrow">
                AC versus DC
              </p>

              <h2 id="dc-heading">
                Capacitors in DC circuits
              </h2>

              <p>
                At steady-state direct current,
                frequency is effectively zero, so
                ideal capacitive reactance approaches
                infinity.
              </p>

              <p>
                A charged ideal capacitor therefore
                behaves like an open circuit under
                steady DC conditions.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Capacitive reactance units
              </h2>

              <ul>
                <li>Reactance: ohms (Ω).</li>
                <li>Frequency: hertz (Hz).</li>
                <li>Capacitance: farads (F).</li>
                <li>
                  Angular frequency: radians per
                  second.
                </li>
                <li>
                  1 microfarad = 1 × 10⁻⁶ F.
                </li>
                <li>
                  1 nanofarad = 1 × 10⁻⁹ F.
                </li>
                <li>
                  1 picofarad = 1 × 10⁻¹² F.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where capacitive reactance matters
              </h2>

              <ul>
                <li>AC filters and crossover circuits.</li>
                <li>Signal coupling and decoupling.</li>
                <li>Power-factor correction.</li>
                <li>Timing and oscillator circuits.</li>
                <li>RLC circuit analysis.</li>
                <li>Radio-frequency networks.</li>
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
                  Equivalent series resistance is
                  ignored.
                </li>
                <li>
                  Leakage current is not included.
                </li>
                <li>
                  Parasitic inductance is ignored.
                </li>
                <li>
                  Capacitance is assumed constant.
                </li>
                <li>
                  All values must use compatible SI
                  units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue studying AC capacitors
              </h2>

              <div className="related-links">
                <Link href="/calculators/capacitance-calculator">
                  Capacitance Calculator
                </Link>

                <Link href="/calculators/capacitor-energy-calculator">
                  Capacitor Energy Calculator
                </Link>

                <Link href="/calculators/rc-time-constant-calculator">
                  RC Time Constant Calculator
                </Link>

                <Link href="/calculators/inductive-reactance-calculator">
                  Inductive Reactance Calculator
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Capacitive reactance calculator FAQ
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
              <h2>Reactance checklist</h2>

              <ul>
                <li>Convert capacitance to farads</li>
                <li>Enter frequency in hertz</li>
                <li>Use reactance in ohms</li>
                <li>Select the unknown variable</li>
                <li>Consider real capacitor losses</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate capacitance</h2>

              <p>
                Calculate capacitance, charge, or
                voltage using C = Q/V.
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
