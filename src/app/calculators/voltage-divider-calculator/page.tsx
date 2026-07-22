import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { VoltageDividerCalculator } from "@/components/calculators/voltage-divider-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Voltage Divider Calculator";

const pageDescription =
  "Calculate output voltage, input voltage, upper resistance, or lower resistance for an ideal unloaded voltage divider circuit.";

const pagePath =
  "/calculators/voltage-divider-calculator";

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
      "What formula does the voltage divider calculator use?",
    answer:
      "The main equation is Vout = Vin × R2 ÷ (R1 + R2), where R1 is the upper resistor and R2 is the lower resistor connected to ground.",
  },
  {
    question:
      "Can the calculator find either resistor value?",
    answer:
      "Yes. It can rearrange the divider equation to calculate R1 or R2 when the input voltage, output voltage, and other resistance are known.",
  },
  {
    question:
      "Why must output voltage be below input voltage?",
    answer:
      "A passive two-resistor voltage divider can only reduce the applied input voltage. An output equal to or above the input would require a different circuit arrangement or an active component.",
  },
  {
    question:
      "Can I enter resistance in kilo-ohms?",
    answer:
      "Yes, provided both resistor values use the same unit. For example, both may be entered in ohms or both in kilo-ohms because the divider ratio depends on their proportion.",
  },
  {
    question:
      "Does this calculator account for a connected load?",
    answer:
      "No. It models an ideal unloaded voltage divider. A load connected across R2 changes the effective lower resistance and must be included as a parallel resistance.",
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

export default function VoltageDividerCalculatorPage() {
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
                Voltage Divider Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electricity and resistor circuits
            </p>

            <h1>Voltage Divider Calculator</h1>

            <p>
              Calculate output voltage, input voltage,
              upper resistance, or lower resistance for
              an ideal two-resistor voltage divider.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Voltage divider calculator"
      >
        <Container>
          <VoltageDividerCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Resistor network
              </p>

              <h2 id="overview-heading">
                What is a voltage divider?
              </h2>

              <p>
                A voltage divider is a simple series
                circuit that produces an output voltage
                lower than its applied input voltage.
                It normally consists of two resistors
                connected in series.
              </p>

              <p>
                The output is measured across the lower
                resistor, commonly identified as R2.
                The voltage is divided in proportion to
                the two resistance values.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Voltage divider formula
              </h2>

              <div className="formula-card">
                <p>
                  Output voltage
                  <span>
                    Vout = Vin × R2 ÷ (R1 + R2)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Vout</strong> is the voltage
                  measured across R2.
                </li>

                <li>
                  <strong>Vin</strong> is the total
                  applied input voltage.
                </li>

                <li>
                  <strong>R1</strong> is the upper
                  resistor between the input and output
                  nodes.
                </li>

                <li>
                  <strong>R2</strong> is the lower
                  resistor between the output node and
                  ground.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve every variable
              </p>

              <h2 id="rearranged-heading">
                Rearranged voltage divider equations
              </h2>

              <div className="formula-card">
                <p>
                  Input voltage
                  <span>
                    Vin = Vout × (R1 + R2) ÷ R2
                  </span>
                </p>

                <p>
                  Upper resistance
                  <span>
                    R1 = R2 × (Vin − Vout) ÷ Vout
                  </span>
                </p>

                <p>
                  Lower resistance
                  <span>
                    R2 = Vout × R1 ÷ (Vin − Vout)
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked calculation
              </p>

              <h2 id="example-heading">
                Calculate output voltage
              </h2>

              <p>
                Suppose the input voltage is{" "}
                <strong>12 V</strong>, R1 is{" "}
                <strong>2,000 Ω</strong>, and R2 is{" "}
                <strong>1,000 Ω</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>
                    Vout = Vin × R2 ÷ (R1 + R2)
                  </strong>
                  .
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    Vout = 12 × 1,000 ÷
                    (2,000 + 1,000)
                  </strong>
                  .
                </li>

                <li>
                  Add the resistances:{" "}
                  <strong>
                    R1 + R2 = 3,000 Ω
                  </strong>
                  .
                </li>

                <li>
                  Calculate the result:{" "}
                  <strong>Vout = 4 V</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="ratio-heading">
              <p className="eyebrow">
                Divider proportion
              </p>

              <h2 id="ratio-heading">
                Understanding the divider ratio
              </h2>

              <p>
                The divider ratio is the output voltage
                divided by the input voltage:
              </p>

              <div className="formula-card">
                <p>
                  Divider ratio
                  <span>
                    Ratio = Vout ÷ Vin =
                    R2 ÷ (R1 + R2)
                  </span>
                </p>
              </div>

              <p>
                In the worked example, the ratio is
                one-third, so the output voltage is
                one-third of the applied input voltage.
              </p>
            </section>

            <section aria-labelledby="current-heading">
              <p className="eyebrow">
                Series current
              </p>

              <h2 id="current-heading">
                Current through the divider
              </h2>

              <p>
                In an ideal unloaded divider, the same
                current flows through both series
                resistors.
              </p>

              <div className="formula-card">
                <p>
                  Circuit current
                  <span>
                    I = Vin ÷ (R1 + R2)
                  </span>
                </p>
              </div>

              <p>
                For 12 V across a total resistance of
                3,000 Ω, the ideal divider current is
                0.004 A, or 4 mA.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Consistent values
              </p>

              <h2 id="units-heading">
                Voltage and resistance units
              </h2>

              <ul className="article-list">
                <li>
                  Enter voltage values in volts.
                </li>

                <li>
                  Enter both resistances using the same
                  resistance unit.
                </li>

                <li>
                  Both resistances may be entered in
                  ohms, kilo-ohms, or mega-ohms when
                  the same unit is used for each.
                </li>
              </ul>

              <p>
                The calculator displays ideal circuit
                current assuming resistance values were
                entered in ohms.
              </p>
            </section>

            <section aria-labelledby="loading-heading">
              <p className="eyebrow">
                Real circuit behavior
              </p>

              <h2 id="loading-heading">
                Voltage-divider loading effect
              </h2>

              <p>
                A connected load draws current from the
                output and appears electrically in
                parallel with R2. This reduces the
                effective lower resistance and changes
                the output voltage.
              </p>

              <p>
                For accurate loaded-divider analysis,
                first calculate the parallel combination
                of R2 and the load resistance, then use
                that effective resistance as the lower
                resistance.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Assumptions and limitations
              </h2>

              <p>
                This calculator assumes an ideal DC
                source, ideal resistors, and no connected
                load. Real circuits may be affected by
                resistor tolerance, temperature,
                source resistance, wiring resistance,
                and measurement-device impedance.
              </p>

              <p>
                A passive two-resistor divider cannot
                produce an output voltage equal to or
                greater than its input voltage.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="voltage-divider-calculator"
              heading="Continue your voltage-divider and circuit analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Voltage divider calculator FAQ
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
            <CalculatorTrustPanel subject="physics" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
