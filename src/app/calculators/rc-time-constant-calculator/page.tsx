import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RcTimeConstantCalculator } from "@/components/calculators/rc-time-constant-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "RC Time Constant Calculator";

const pageDescription =
  "Calculate RC time constant, resistance, capacitance, capacitor charging voltage, discharging voltage, or elapsed time using standard RC circuit equations.";

const pagePath =
  "/calculators/rc-time-constant-calculator";

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
      "What formula does the RC time constant calculator use?",
    answer:
      "The basic RC time constant formula is τ = RC, where resistance is measured in ohms and capacitance is measured in farads.",
  },
  {
    question:
      "What happens after one RC time constant?",
    answer:
      "During charging, capacitor voltage reaches about 63.2% of the source voltage. During discharging, about 36.8% of the initial voltage remains.",
  },
  {
    question:
      "How long does a capacitor take to charge?",
    answer:
      "An ideal capacitor approaches full charge exponentially. After about five time constants, it is commonly treated as more than 99% charged.",
  },
  {
    question:
      "How do I calculate capacitor charging voltage?",
    answer:
      "Use V(t) = Vs(1 − e⁻ᵗ/τ), where Vs is source voltage, t is elapsed time, and τ is the RC time constant.",
  },
  {
    question:
      "How do I calculate capacitor discharging voltage?",
    answer:
      "Use V(t) = V₀e⁻ᵗ/τ, where V₀ is the initial voltage, t is elapsed time, and τ is the RC time constant.",
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

export default function RcTimeConstantCalculatorPage() {
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
                RC Time Constant Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Resistor-capacitor circuits
            </p>

            <h1>RC Time Constant Calculator</h1>

            <p>
              Calculate RC time constant, resistance,
              capacitance, charging voltage,
              discharging voltage, or elapsed time.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RC time constant calculator"
      >
        <Container>
          <RcTimeConstantCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Exponential circuit response
              </p>

              <h2 id="overview-heading">
                What is an RC time constant?
              </h2>

              <p>
                The RC time constant describes how
                quickly a capacitor charges or
                discharges through a resistor.
              </p>

              <p>
                It is represented by the Greek letter
                tau, written τ, and is measured in
                seconds.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main RC relationship
              </p>

              <h2 id="formula-heading">
                RC time constant formula
              </h2>

              <div className="formula-card">
                <p>
                  Time constant
                  <span>τ = RC</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>τ</strong> is time constant
                  in seconds.
                </li>
                <li>
                  <strong>R</strong> is resistance in
                  ohms.
                </li>
                <li>
                  <strong>C</strong> is capacitance in
                  farads.
                </li>
              </ul>

              <p>
                Increasing either resistance or
                capacitance increases the time needed
                for the capacitor voltage to change.
              </p>
            </section>

            <section aria-labelledby="charging-heading">
              <p className="eyebrow">
                Capacitor charging
              </p>

              <h2 id="charging-heading">
                Charging voltage formula
              </h2>

              <div className="formula-card">
                <p>
                  Charging voltage
                  <span>V(t) = Vₛ(1 − e⁻ᵗ/τ)</span>
                </p>
              </div>

              <p>
                After one time constant, the
                capacitor reaches approximately
                63.2% of the source voltage.
              </p>
            </section>

            <section aria-labelledby="discharging-heading">
              <p className="eyebrow">
                Capacitor discharging
              </p>

              <h2 id="discharging-heading">
                Discharging voltage formula
              </h2>

              <div className="formula-card">
                <p>
                  Discharging voltage
                  <span>V(t) = V₀e⁻ᵗ/τ</span>
                </p>
              </div>

              <p>
                After one time constant, approximately
                36.8% of the initial capacitor voltage
                remains.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate an RC time constant
              </h2>

              <p>
                Suppose a circuit has a resistance of{" "}
                <strong>10,000 Ω</strong> and a
                capacitance of{" "}
                <strong>0.0001 F</strong>.
              </p>

              <ol>
                <li>Use τ = RC.</li>
                <li>
                  Substitute R = 10,000 and
                  C = 0.0001.
                </li>
                <li>
                  τ = 10,000 × 0.0001.
                </li>
                <li>
                  The RC time constant is{" "}
                  <strong>1 second</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="five-tau-heading">
              <p className="eyebrow">
                Practical approximation
              </p>

              <h2 id="five-tau-heading">
                The five-time-constant rule
              </h2>

              <ul>
                <li>
                  After 1τ, charging reaches about
                  63.2%.
                </li>
                <li>
                  After 2τ, charging reaches about
                  86.5%.
                </li>
                <li>
                  After 3τ, charging reaches about
                  95.0%.
                </li>
                <li>
                  After 5τ, charging exceeds 99%.
                </li>
              </ul>

              <p>
                Engineers often treat five time
                constants as effectively fully charged
                or fully discharged.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                RC circuit units
              </h2>

              <ul>
                <li>Time constant: seconds (s).</li>
                <li>Resistance: ohms (Ω).</li>
                <li>Capacitance: farads (F).</li>
                <li>Voltage: volts (V).</li>
                <li>Elapsed time: seconds (s).</li>
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
                  The resistor and capacitor are
                  treated as ideal components.
                </li>
                <li>
                  Capacitor leakage is not included.
                </li>
                <li>
                  Equivalent series resistance is
                  ignored.
                </li>
                <li>
                  Source voltage is assumed constant
                  during charging.
                </li>
                <li>
                  All calculations use positive
                  magnitudes.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue studying capacitor circuits
              </h2>

              <div className="related-links">
                <Link href="/calculators/capacitance-calculator">
                  Capacitance Calculator
                </Link>

                <Link href="/calculators/capacitor-energy-calculator">
                  Capacitor Energy Calculator
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
                RC time constant calculator FAQ
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
              <h2>RC circuit checklist</h2>

              <ul>
                <li>Convert capacitance to farads</li>
                <li>Enter resistance in ohms</li>
                <li>Use time in seconds</li>
                <li>Select charging or discharging</li>
                <li>Compare voltage limits</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate capacitance</h2>

              <p>
                Calculate capacitance, charge, or
                voltage using the fundamental
                capacitor relationship.
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
