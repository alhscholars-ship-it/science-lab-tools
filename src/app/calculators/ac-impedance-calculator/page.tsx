import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { AcImpedanceCalculator } from "@/components/calculators/ac-impedance-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "AC Impedance Calculator";

const pageDescription =
  "Calculate impedance, resistance, inductive reactance, or capacitive reactance in a series RLC circuit using Z = √(R² + (Xₗ − Xc)²).";

const pagePath =
  "/calculators/ac-impedance-calculator";

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
      "What formula does the AC impedance calculator use?",
    answer:
      "It uses Z = √(R² + (Xₗ − Xc)²) for a series RLC circuit, where Z is impedance, R is resistance, Xₗ is inductive reactance, and Xc is capacitive reactance.",
  },
  {
    question:
      "What is the unit of AC impedance?",
    answer:
      "AC impedance is measured in ohms, represented by the symbol Ω.",
  },
  {
    question:
      "What happens when inductive and capacitive reactance are equal?",
    answer:
      "When Xₗ equals Xc, the net reactance is zero and the circuit impedance equals its resistance. This condition is called series resonance.",
  },
  {
    question:
      "Can impedance be smaller than resistance?",
    answer:
      "No. In this ideal series RLC model, impedance is always equal to or greater than resistance.",
  },
  {
    question:
      "Why can solving for reactance produce two mathematical answers?",
    answer:
      "The squared reactance difference removes its sign. This calculator uses the inductive-dominant branch when solving for Xₗ and the capacitive-dominant branch when solving for Xc.",
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

export default function AcImpedanceCalculatorPage() {
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
                AC Impedance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Series RLC circuit analysis
            </p>

            <h1>AC Impedance Calculator</h1>

            <p>
              Calculate impedance, resistance,
              inductive reactance, or capacitive
              reactance for an ideal series RLC
              circuit.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="AC impedance calculator"
      >
        <Container>
          <AcImpedanceCalculator />
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
                What is AC impedance?
              </h2>

              <p>
                AC impedance is the total opposition
                a circuit presents to alternating
                current. It combines resistance with
                the net effect of inductive and
                capacitive reactance.
              </p>

              <p>
                Unlike resistance alone, impedance
                accounts for energy storage in
                inductors and capacitors as well as
                energy dissipation in resistors.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Series RLC formula
              </p>

              <h2 id="formula-heading">
                AC impedance formula
              </h2>

              <div className="formula-card">
                <p>
                  Series circuit impedance
                  <span>
                    Z = √(R² + (Xₗ − Xc)²)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Z</strong> is total
                  impedance in ohms.
                </li>
                <li>
                  <strong>R</strong> is resistance in
                  ohms.
                </li>
                <li>
                  <strong>Xₗ</strong> is inductive
                  reactance in ohms.
                </li>
                <li>
                  <strong>Xc</strong> is capacitive
                  reactance in ohms.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate series AC impedance
              </h2>

              <p>
                Suppose a series RLC circuit has
                resistance of <strong>30 Ω</strong>,
                inductive reactance of{" "}
                <strong>50 Ω</strong>, and capacitive
                reactance of <strong>10 Ω</strong>.
              </p>

              <ol>
                <li>
                  Find net reactance:
                  Xₗ − Xc = 50 − 10 = 40 Ω.
                </li>
                <li>
                  Square resistance and net
                  reactance.
                </li>
                <li>
                  Z = √(30² + 40²).
                </li>
                <li>
                  Z = √2500 ={" "}
                  <strong>50 Ω</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="resonance-heading">
              <p className="eyebrow">
                Balanced reactance
              </p>

              <h2 id="resonance-heading">
                Impedance at series resonance
              </h2>

              <p>
                Series resonance occurs when
                inductive reactance equals capacitive
                reactance. Their effects cancel, so
                net reactance becomes zero.
              </p>

              <p>
                Under the ideal model, impedance then
                equals resistance and circuit current
                reaches its maximum value for a fixed
                supply voltage.
              </p>
            </section>

            <section aria-labelledby="dominance-heading">
              <p className="eyebrow">
                Circuit behavior
              </p>

              <h2 id="dominance-heading">
                Inductive and capacitive dominance
              </h2>

              <ul>
                <li>
                  When Xₗ is greater than Xc, the
                  circuit is inductive-dominant.
                </li>
                <li>
                  When Xc is greater than Xₗ, the
                  circuit is capacitive-dominant.
                </li>
                <li>
                  When Xₗ equals Xc, the circuit is
                  at resonance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="inverse-heading">
              <p className="eyebrow">
                Inverse calculations
              </p>

              <h2 id="inverse-heading">
                Solving for individual reactance
              </h2>

              <p>
                Because the reactance difference is
                squared, solving the impedance
                equation backward can produce two
                mathematical branches.
              </p>

              <p>
                This calculator uses the
                inductive-dominant branch when solving
                for Xₗ and the capacitive-dominant
                branch when solving for Xc.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit guidance
              </p>

              <h2 id="units-heading">
                Impedance and reactance units
              </h2>

              <ul>
                <li>Impedance: ohms (Ω).</li>
                <li>Resistance: ohms (Ω).</li>
                <li>
                  Inductive reactance: ohms (Ω).
                </li>
                <li>
                  Capacitive reactance: ohms (Ω).
                </li>
                <li>
                  All entered values must use
                  compatible units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where AC impedance matters
              </h2>

              <ul>
                <li>Series RLC circuit analysis.</li>
                <li>AC current calculations.</li>
                <li>Filter and resonant circuits.</li>
                <li>Power-factor analysis.</li>
                <li>Audio crossover networks.</li>
                <li>
                  Electrical and electronics
                  laboratory work.
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
                  The circuit is treated as a series
                  RLC circuit.
                </li>
                <li>
                  Components are assumed ideal.
                </li>
                <li>
                  Parasitic effects are ignored.
                </li>
                <li>
                  Component values are assumed
                  constant.
                </li>
                <li>
                  Frequency-dependent losses are not
                  included.
                </li>
                <li>
                  Phase angle and complex impedance
                  are not calculated directly.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue studying AC circuits
              </h2>

              <div className="related-links">
                <Link href="/calculators/inductive-reactance-calculator">
                  Inductive Reactance Calculator
                </Link>

                <Link href="/calculators/capacitive-reactance-calculator">
                  Capacitive Reactance Calculator
                </Link>

                <Link href="/calculators/ohms-law-calculator">
                  Ohm&apos;s Law Calculator
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
                AC impedance calculator FAQ
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
              <h2>Impedance checklist</h2>

              <ul>
                <li>Use all values in ohms</li>
                <li>Identify the unknown variable</li>
                <li>Check the net reactance sign</li>
                <li>Verify impedance is at least R</li>
                <li>Consider resonance conditions</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate reactance</h2>

              <p>
                Calculate inductive reactance from
                frequency and inductance.
              </p>

              <Link href="/calculators/inductive-reactance-calculator">
                Open Inductive Reactance Calculator
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
