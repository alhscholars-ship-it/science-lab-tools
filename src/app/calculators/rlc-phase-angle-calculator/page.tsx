import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RlcPhaseAngleCalculator } from "@/components/calculators/rlc-phase-angle-calculator";
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
  "RLC Phase Angle Calculator";

const pageDescription =
  "Calculate phase angle, resistance, inductive reactance, or capacitive reactance for a series RLC circuit, with impedance, power factor, and circuit behavior.";

const pagePath =
  "/calculators/rlc-phase-angle-calculator";

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
      "What formula does the RLC phase angle calculator use?",
    answer:
      "For a series RLC circuit, phase angle is calculated using φ = tan⁻¹((XL − XC) / R), where XL is inductive reactance, XC is capacitive reactance, and R is resistance.",
  },
  {
    question:
      "What does a positive RLC phase angle mean?",
    answer:
      "A positive phase angle means inductive reactance is greater than capacitive reactance. The circuit is inductive, and current lags voltage.",
  },
  {
    question:
      "What does a negative RLC phase angle mean?",
    answer:
      "A negative phase angle means capacitive reactance is greater than inductive reactance. The circuit is capacitive, and current leads voltage.",
  },
  {
    question:
      "What is the phase angle at resonance?",
    answer:
      "At resonance, inductive reactance equals capacitive reactance, net reactance is zero, and the phase angle is 0 degrees.",
  },
  {
    question:
      "How is power factor related to phase angle?",
    answer:
      "Power factor equals cos φ. In a series RLC circuit it can also be calculated as resistance divided by impedance.",
  },
] as const;

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const faqSchema =
  createFaqSchema(faqItems);

const breadcrumbSchema =
  createBreadcrumbSchema({
    pageName: pageTitle,
    pagePath,
  });

export default function RlcPhaseAngleCalculatorPage() {
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
                RLC Phase Angle Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Series RLC circuit analysis
            </p>

            <h1>
              RLC Phase Angle Calculator
            </h1>

            <p>
              Calculate phase angle,
              resistance, inductive reactance,
              or capacitive reactance for a
              series RLC circuit. Review
              impedance, power factor, net
              reactance, and current behavior
              with each result.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RLC phase angle calculator"
      >
        <Container>
          <RlcPhaseAngleCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Voltage and current timing
              </p>

              <h2 id="overview-heading">
                What is phase angle in an RLC
                circuit?
              </h2>

              <p>
                Phase angle describes the
                angular difference between the
                voltage and current waveforms in
                an alternating-current circuit.
              </p>

              <p>
                In a series RLC circuit, the
                phase angle depends on the
                difference between inductive
                reactance and capacitive
                reactance, compared with the
                circuit resistance.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                RLC phase angle formula
              </h2>

              <div className="formula-card">
                <p>
                  Phase angle
                  <span>
                    φ = tan⁻¹((Xₗ − Xc) ÷ R)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>φ</strong> is the
                  phase angle in degrees.
                </li>
                <li>
                  <strong>R</strong> is
                  resistance in ohms.
                </li>
                <li>
                  <strong>Xₗ</strong> is
                  inductive reactance in ohms.
                </li>
                <li>
                  <strong>Xc</strong> is
                  capacitive reactance in ohms.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate the phase angle
              </h2>

              <p>
                Suppose a series RLC circuit has
                a resistance of{" "}
                <strong>30 Ω</strong>, an
                inductive reactance of{" "}
                <strong>50 Ω</strong>, and a
                capacitive reactance of{" "}
                <strong>10 Ω</strong>.
              </p>

              <ol>
                <li>
                  Calculate net reactance:
                  50 − 10 = 40 Ω.
                </li>
                <li>
                  Divide net reactance by
                  resistance: 40 ÷ 30.
                </li>
                <li>
                  Apply the inverse tangent.
                </li>
                <li>
                  φ = tan⁻¹(1.3333).
                </li>
                <li>
                  The phase angle is
                  approximately{" "}
                  <strong>53.13°</strong>.
                </li>
              </ol>

              <p>
                Because the result is positive,
                the circuit is inductive and
                current lags voltage.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve missing circuit values
              </p>

              <h2 id="rearranged-heading">
                Rearranged phase angle equations
              </h2>

              <div className="formula-card">
                <p>
                  Resistance
                  <span>
                    R = (Xₗ − Xc) ÷ tan(φ)
                  </span>
                </p>

                <p>
                  Inductive reactance
                  <span>
                    Xₗ = Xc + R tan(φ)
                  </span>
                </p>

                <p>
                  Capacitive reactance
                  <span>
                    Xc = Xₗ − R tan(φ)
                  </span>
                </p>
              </div>

              <p>
                These rearranged equations allow
                the calculator to solve for any
                one of the four principal
                variables when the remaining
                values are known.
              </p>
            </section>

            <section aria-labelledby="behavior-heading">
              <p className="eyebrow">
                Circuit classification
              </p>

              <h2 id="behavior-heading">
                Positive, negative, and zero
                phase angles
              </h2>

              <ul>
                <li>
                  <strong>Positive angle:</strong>{" "}
                  Xₗ is greater than Xc, so the
                  circuit is inductive.
                </li>
                <li>
                  <strong>Negative angle:</strong>{" "}
                  Xc is greater than Xₗ, so the
                  circuit is capacitive.
                </li>
                <li>
                  <strong>Zero angle:</strong>{" "}
                  Xₗ equals Xc, so the circuit is
                  at resonance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="lead-lag-heading">
              <p className="eyebrow">
                Current relationship
              </p>

              <h2 id="lead-lag-heading">
                Does current lead or lag voltage?
              </h2>

              <p>
                In an inductive circuit, current
                lags voltage. In a capacitive
                circuit, current leads voltage.
                At resonance, current and voltage
                are in phase.
              </p>
            </section>

            <section aria-labelledby="impedance-heading">
              <p className="eyebrow">
                Total AC opposition
              </p>

              <h2 id="impedance-heading">
                Phase angle and impedance
              </h2>

              <div className="formula-card">
                <p>
                  Net reactance
                  <span>
                    X = Xₗ − Xc
                  </span>
                </p>

                <p>
                  Impedance
                  <span>
                    Z = √(R² + X²)
                  </span>
                </p>
              </div>

              <p>
                Impedance combines resistance
                and net reactance. As the
                magnitude of net reactance
                increases, the phase angle moves
                farther from zero.
              </p>
            </section>

            <section aria-labelledby="power-factor-heading">
              <p className="eyebrow">
                Real and apparent power
              </p>

              <h2 id="power-factor-heading">
                Phase angle and power factor
              </h2>

              <div className="formula-card">
                <p>
                  Power factor
                  <span>
                    PF = cos(φ) = R ÷ Z
                  </span>
                </p>
              </div>

              <p>
                A phase angle near zero produces
                a power factor near 1. Larger
                positive or negative phase
                angles produce a lower power
                factor.
              </p>
            </section>

            <section aria-labelledby="resonance-heading">
              <p className="eyebrow">
                Balanced reactance
              </p>

              <h2 id="resonance-heading">
                Phase angle at resonance
              </h2>

              <p>
                At resonance, inductive
                reactance and capacitive
                reactance are equal. Their
                effects cancel, leaving zero net
                reactance.
              </p>

              <p>
                The circuit impedance equals its
                resistance, the phase angle is
                zero, and the ideal power factor
                is 1.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Calculator assumptions and
                limitations
              </h2>

              <ul>
                <li>
                  The equations model a series
                  RLC circuit.
                </li>
                <li>
                  Resistance and reactance values
                  are treated as ideal,
                  steady-state quantities.
                </li>
                <li>
                  Phase angles must remain
                  between −90° and 90°.
                </li>
                <li>
                  Real components may include
                  parasitic resistance,
                  capacitance, and inductance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Continue circuit analysis
              </p>

              <h2 id="related-heading">
                Related electrical calculators
              </h2>

              <ul className="article-list">
                <li>
                  <Link href="/calculators/ac-impedance-calculator">
                    AC Impedance Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/inductive-reactance-calculator">
                    Inductive Reactance
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/capacitive-reactance-calculator">
                    Capacitive Reactance
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/resonant-frequency-calculator">
                    Resonant Frequency
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/calculators/rlc-quality-factor-calculator">
                    RLC Quality Factor Calculator
                  </Link>
                </li>
              </ul>
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
