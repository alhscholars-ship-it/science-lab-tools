import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { InductiveReactanceCalculator } from "@/components/calculators/inductive-reactance-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Inductive Reactance Calculator";

const pageDescription =
  "Calculate inductive reactance, frequency, or inductance using Xₗ = 2πfL, with AC circuit formulas, units, examples, and limitations.";

const pagePath =
  "/calculators/inductive-reactance-calculator";

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
      "What formula does the inductive reactance calculator use?",
    answer:
      "It uses Xₗ = 2πfL, where Xₗ is inductive reactance, f is frequency, and L is inductance.",
  },
  {
    question:
      "What is the unit of inductive reactance?",
    answer:
      "Inductive reactance is measured in ohms, written Ω.",
  },
  {
    question:
      "How does frequency affect inductive reactance?",
    answer:
      "Inductive reactance increases directly with frequency. Doubling frequency doubles reactance when inductance remains constant.",
  },
  {
    question:
      "How do I calculate inductance from reactance?",
    answer:
      "Divide inductive reactance by two pi times frequency using L = Xₗ/(2πf).",
  },
  {
    question:
      "Is inductive reactance the same as resistance?",
    answer:
      "No. Resistance dissipates energy, while ideal inductive reactance opposes alternating current through magnetic-field effects.",
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

export default function InductiveReactanceCalculatorPage() {
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
                Inductive Reactance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              AC inductor behavior
            </p>

            <h1>Inductive Reactance Calculator</h1>

            <p>
              Calculate inductive reactance,
              frequency, or inductance using the
              standard AC inductor relationship.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Inductive reactance calculator"
      >
        <Container>
          <InductiveReactanceCalculator />
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
                What is inductive reactance?
              </h2>

              <p>
                Inductive reactance is the opposition
                an inductor presents to alternating
                current because its magnetic field
                changes continuously.
              </p>

              <p>
                Unlike ordinary resistance, ideal
                inductive reactance does not dissipate
                electrical energy as heat.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main AC formula
              </p>

              <h2 id="formula-heading">
                Inductive reactance formula
              </h2>

              <div className="formula-card">
                <p>
                  Inductive reactance
                  <span>Xₗ = 2πfL</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Xₗ</strong> is inductive
                  reactance in ohms.
                </li>
                <li>
                  <strong>f</strong> is frequency in
                  hertz.
                </li>
                <li>
                  <strong>L</strong> is inductance in
                  henries.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate inductive reactance
              </h2>

              <p>
                Suppose an inductor has an inductance
                of <strong>0.2 H</strong> in a
                <strong>50 Hz</strong> AC circuit.
              </p>

              <ol>
                <li>Use Xₗ = 2πfL.</li>
                <li>
                  Substitute f = 50 Hz and L = 0.2 H.
                </li>
                <li>
                  Xₗ = 2 × π × 50 × 0.2.
                </li>
                <li>
                  The inductive reactance is about{" "}
                  <strong>62.83 Ω</strong>.
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
                Inductive reactance rises directly
                with frequency. An inductor therefore
                offers little opposition to very
                low-frequency current but greater
                opposition at higher frequencies.
              </p>
            </section>

            <section aria-labelledby="dc-heading">
              <p className="eyebrow">
                AC versus DC
              </p>

              <h2 id="dc-heading">
                Inductors in DC circuits
              </h2>

              <p>
                At steady-state direct current,
                frequency is zero, so ideal inductive
                reactance is also zero.
              </p>

              <p>
                A real inductor still has winding
                resistance and other non-ideal
                effects.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Reactance units
              </h2>

              <ul>
                <li>Reactance: ohms (Ω).</li>
                <li>Frequency: hertz (Hz).</li>
                <li>Inductance: henries (H).</li>
                <li>
                  Angular frequency: radians per
                  second.
                </li>
                <li>
                  1 millihenry = 1 × 10⁻³ H.
                </li>
                <li>
                  1 microhenry = 1 × 10⁻⁶ H.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where inductive reactance matters
              </h2>

              <ul>
                <li>AC filters and crossover circuits.</li>
                <li>Transformers and motor windings.</li>
                <li>Radio-frequency inductors.</li>
                <li>Power-factor calculations.</li>
                <li>RLC circuit analysis.</li>
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
                  The inductor is treated as ideal.
                </li>
                <li>
                  Winding resistance is ignored.
                </li>
                <li>
                  Parasitic capacitance is not
                  included.
                </li>
                <li>
                  Core saturation and frequency losses
                  are not modelled.
                </li>
                <li>
                  Inductance is assumed constant.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue studying AC inductors
              </h2>

              <div className="related-links">
                <Link href="/calculators/inductance-calculator">
                  Inductance Calculator
                </Link>

                <Link href="/calculators/inductor-energy-calculator">
                  Inductor Energy Calculator
                </Link>

                <Link href="/calculators/rl-time-constant-calculator">
                  RL Time Constant Calculator
                </Link>

                <Link href="/calculators/ohms-law-calculator">
                  Ohm&apos;s Law Calculator
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Inductive reactance calculator FAQ
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
                <li>Convert inductance to henries</li>
                <li>Enter frequency in hertz</li>
                <li>Use reactance in ohms</li>
                <li>Select the unknown variable</li>
                <li>Check real inductor losses</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate inductance</h2>

              <p>
                Calculate inductance, turns, magnetic
                flux, current, area, or coil length.
              </p>

              <Link href="/calculators/inductance-calculator">
                Open Inductance Calculator
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
