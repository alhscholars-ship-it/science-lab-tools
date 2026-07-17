import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { ResonantFrequencyCalculator } from "@/components/calculators/resonant-frequency-calculator";
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
  "Resonant Frequency Calculator";

const pageDescription =
  "Calculate resonant frequency, inductance, or capacitance for an ideal LC or RLC circuit using f₀ = 1/(2π√LC), with formulas, examples, units, and guidance.";

const pagePath =
  "/calculators/resonant-frequency-calculator";

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
      "What formula does the resonant frequency calculator use?",
    answer:
      "It uses f₀ = 1/(2π√LC), where f₀ is resonant frequency, L is inductance, and C is capacitance.",
  },
  {
    question:
      "What units should I use for inductance and capacitance?",
    answer:
      "Enter inductance in henries and capacitance in farads to obtain resonant frequency in hertz.",
  },
  {
    question:
      "What happens at resonance in a series RLC circuit?",
    answer:
      "At resonance, inductive reactance equals capacitive reactance, so the net reactance becomes zero and ideal circuit impedance equals resistance.",
  },
  {
    question:
      "Does resistance affect the ideal resonant frequency?",
    answer:
      "The standard ideal formula depends only on inductance and capacitance. Resistance affects damping, bandwidth, and quality factor, but not the ideal resonance value.",
  },
  {
    question:
      "Can this calculator solve for inductance or capacitance?",
    answer:
      "Yes. Provide resonant frequency and one component value to calculate the missing inductance or capacitance.",
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

export default function ResonantFrequencyCalculatorPage() {
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
                Resonant Frequency Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              LC and RLC circuit resonance
            </p>

            <h1>
              Resonant Frequency Calculator
            </h1>

            <p>
              Calculate resonant frequency,
              inductance, or capacitance for an
              ideal LC or RLC circuit using the
              standard resonance equation.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Resonant frequency calculator"
      >
        <Container>
          <ResonantFrequencyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Natural circuit oscillation
              </p>

              <h2 id="overview-heading">
                What is resonant frequency?
              </h2>

              <p>
                Resonant frequency is the natural
                frequency at which energy moves
                repeatedly between the magnetic
                field of an inductor and the
                electric field of a capacitor.
              </p>

              <p>
                In an ideal LC circuit, resonance
                occurs when inductive reactance and
                capacitive reactance have equal
                magnitudes.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Standard resonance equation
              </p>

              <h2 id="formula-heading">
                Resonant frequency formula
              </h2>

              <div className="formula-card">
                <p>
                  Resonant frequency
                  <span>
                    f₀ = 1 ÷ (2π√LC)
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>f₀</strong> is resonant
                  frequency in hertz.
                </li>
                <li>
                  <strong>L</strong> is inductance
                  in henries.
                </li>
                <li>
                  <strong>C</strong> is capacitance
                  in farads.
                </li>
                <li>
                  <strong>π</strong> is the
                  mathematical constant pi.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked LC circuit example
              </p>

              <h2 id="example-heading">
                Calculate resonant frequency
              </h2>

              <p>
                Suppose an LC circuit has an
                inductance of{" "}
                <strong>0.01 H</strong> and a
                capacitance of{" "}
                <strong>0.000001 F</strong>.
              </p>

              <ol>
                <li>
                  Use f₀ = 1 ÷ (2π√LC).
                </li>
                <li>
                  Multiply L and C:
                  0.01 × 0.000001 = 0.00000001.
                </li>
                <li>
                  Take the square root:
                  √0.00000001 = 0.0001.
                </li>
                <li>
                  Calculate 2π × 0.0001.
                </li>
                <li>
                  The resonant frequency is about{" "}
                  <strong>1591.55 Hz</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="reactance-heading">
              <p className="eyebrow">
                Balanced circuit reactance
              </p>

              <h2 id="reactance-heading">
                Inductive and capacitive reactance
                at resonance
              </h2>

              <p>
                Inductive reactance increases with
                frequency, while capacitive
                reactance decreases with frequency.
                At the resonant frequency, their
                magnitudes are equal.
              </p>

              <div className="formula-card">
                <p>
                  Resonance condition
                  <span>Xₗ = Xc</span>
                </p>
              </div>

              <p>
                Because the reactances act in
                opposite directions, they cancel
                each other in an ideal series RLC
                circuit.
              </p>
            </section>

            <section aria-labelledby="series-heading">
              <p className="eyebrow">
                Series circuit behavior
              </p>

              <h2 id="series-heading">
                Series RLC resonance
              </h2>

              <p>
                In an ideal series RLC circuit at
                resonance, net reactance becomes
                zero. Total impedance therefore
                equals the resistance of the
                circuit.
              </p>

              <p>
                For a fixed supply voltage, this
                produces the maximum circuit
                current. Real circuits remain
                affected by resistance, component
                tolerances, and parasitic effects.
              </p>
            </section>

            <section aria-labelledby="parallel-heading">
              <p className="eyebrow">
                Parallel circuit behavior
              </p>

              <h2 id="parallel-heading">
                Parallel RLC resonance
              </h2>

              <p>
                Parallel RLC circuits also exhibit
                resonance, although their current
                and impedance behavior differs from
                the series case.
              </p>

              <p>
                In a practical parallel resonant
                circuit, input impedance can become
                very high near resonance while the
                branch currents may remain large.
              </p>
            </section>

            <section aria-labelledby="inverse-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="inverse-heading">
                Solving for inductance or
                capacitance
              </h2>

              <div className="formula-card">
                <p>
                  Inductance
                  <span>
                    L = 1 ÷ (4π²f₀²C)
                  </span>
                </p>

                <p>
                  Capacitance
                  <span>
                    C = 1 ÷ (4π²f₀²L)
                  </span>
                </p>
              </div>

              <p>
                These rearranged equations are
                useful when designing a circuit for
                a target resonant frequency.
              </p>
            </section>

            <section aria-labelledby="effects-heading">
              <p className="eyebrow">
                Component relationships
              </p>

              <h2 id="effects-heading">
                How inductance and capacitance
                affect resonance
              </h2>

              <ul>
                <li>
                  Increasing inductance lowers the
                  resonant frequency.
                </li>
                <li>
                  Increasing capacitance lowers the
                  resonant frequency.
                </li>
                <li>
                  Decreasing either component raises
                  the resonant frequency.
                </li>
                <li>
                  Frequency changes according to the
                  inverse square root of LC.
                </li>
              </ul>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Resonant frequency units
              </h2>

              <ul>
                <li>
                  Frequency: hertz (Hz).
                </li>
                <li>
                  Angular frequency: radians per
                  second (rad/s).
                </li>
                <li>
                  Inductance: henries (H).
                </li>
                <li>
                  Capacitance: farads (F).
                </li>
              </ul>

              <p>
                Convert millihenries, microhenries,
                microfarads, nanofarads, or
                picofarads into base SI units before
                entering them into this calculator.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Engineering applications
              </p>

              <h2 id="applications-heading">
                Where resonant frequency is used
              </h2>

              <ul>
                <li>
                  Radio transmitters and receivers.
                </li>
                <li>
                  Frequency-selective filters.
                </li>
                <li>
                  Oscillator and timing circuits.
                </li>
                <li>
                  Wireless power systems.
                </li>
                <li>
                  Antenna tuning networks.
                </li>
                <li>
                  Audio and signal-processing
                  circuits.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Calculator limitations
              </h2>

              <p>
                This calculator uses the ideal LC
                resonance equation. Real components
                include resistance, tolerances,
                dielectric losses, winding losses,
                and parasitic capacitance or
                inductance.
              </p>

              <p>
                At high frequencies, physical layout
                and component construction can also
                shift the measured resonant
                frequency away from the ideal
                result.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Resonant frequency FAQ
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
            <div className="article-card">
              <p className="eyebrow">
                Related calculators
              </p>

              <h2>Continue your analysis</h2>

              <ul>
                <li>
                  <Link href="/calculators/inductive-reactance-calculator">
                    Inductive Reactance Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/capacitive-reactance-calculator">
                    Capacitive Reactance Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/ac-impedance-calculator">
                    AC Impedance Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/ohms-law-calculator">
                    Ohm&apos;s Law Calculator
                  </Link>
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
