import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { RlcQualityFactorCalculator } from "@/components/calculators/rlc-quality-factor-calculator";
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
  "RLC Quality Factor Calculator";

const pageDescription =
  "Calculate the quality factor, resistance, inductance, capacitance, damping ratio, or bandwidth of a series RLC circuit using standard resonance formulas.";

const pagePath =
  "/calculators/rlc-quality-factor-calculator";

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
      "What formula does the RLC quality factor calculator use?",
    answer:
      "For a series RLC circuit, it uses Q = √(L/C) ÷ R, where Q is quality factor, L is inductance, C is capacitance, and R is series resistance.",
  },
  {
    question:
      "Is quality factor measured in a unit?",
    answer:
      "No. Quality factor is a dimensionless ratio that describes resonance sharpness, selectivity, and relative energy loss.",
  },
  {
    question:
      "How is bandwidth calculated from quality factor?",
    answer:
      "Bandwidth is calculated using BW = f₀/Q, where f₀ is resonant frequency and Q is quality factor.",
  },
  {
    question:
      "What does a high quality factor mean?",
    answer:
      "A high quality factor generally indicates a narrow bandwidth, sharp resonance, low damping, and relatively low energy loss per oscillation cycle.",
  },
  {
    question:
      "Does increasing resistance reduce quality factor?",
    answer:
      "Yes. In a series RLC circuit, increasing resistance lowers quality factor and broadens the resonance response.",
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

export default function RlcQualityFactorCalculatorPage() {
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
                RLC Quality Factor Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Series RLC circuit analysis
            </p>

            <h1>
              RLC Quality Factor Calculator
            </h1>

            <p>
              Calculate quality factor,
              resistance, inductance, or
              capacitance for a series RLC
              circuit, with optional bandwidth
              and damping-ratio results.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RLC quality factor calculator"
      >
        <Container>
          <RlcQualityFactorCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Resonance sharpness
              </p>

              <h2 id="overview-heading">
                What is the quality factor of an
                RLC circuit?
              </h2>

              <p>
                The quality factor, represented
                by <strong>Q</strong>, describes
                how sharply an RLC circuit
                responds near its resonant
                frequency.
              </p>

              <p>
                It compares stored energy with
                energy lost during each
                oscillation cycle. A higher
                quality factor normally indicates
                lower damping and a narrower
                resonance bandwidth.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Series circuit equation
              </p>

              <h2 id="formula-heading">
                RLC quality factor formula
              </h2>

              <div className="formula-card">
                <p>
                  Quality factor
                  <span>
                    Q = √(L ÷ C) ÷ R
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Q</strong> is the
                  dimensionless quality factor.
                </li>
                <li>
                  <strong>R</strong> is series
                  resistance in ohms.
                </li>
                <li>
                  <strong>L</strong> is
                  inductance in henries.
                </li>
                <li>
                  <strong>C</strong> is
                  capacitance in farads.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked calculation
              </p>

              <h2 id="example-heading">
                Calculate the quality factor
              </h2>

              <p>
                Suppose a series RLC circuit has
                a resistance of{" "}
                <strong>10 Ω</strong>, an
                inductance of{" "}
                <strong>0.1 H</strong>, and a
                capacitance of{" "}
                <strong>0.000001 F</strong>.
              </p>

              <ol>
                <li>
                  Use Q = √(L ÷ C) ÷ R.
                </li>
                <li>
                  Divide inductance by
                  capacitance:
                  0.1 ÷ 0.000001 = 100,000.
                </li>
                <li>
                  Take the square root:
                  √100,000 ≈ 316.2278.
                </li>
                <li>
                  Divide by resistance:
                  316.2278 ÷ 10.
                </li>
                <li>
                  The quality factor is about{" "}
                  <strong>31.6228</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve missing circuit values
              </p>

              <h2 id="rearranged-heading">
                Rearranged quality factor
                equations
              </h2>

              <div className="formula-card">
                <p>
                  Resistance
                  <span>
                    R = √(L ÷ C) ÷ Q
                  </span>
                </p>

                <p>
                  Inductance
                  <span>
                    L = (QR)²C
                  </span>
                </p>

                <p>
                  Capacitance
                  <span>
                    C = L ÷ (QR)²
                  </span>
                </p>
              </div>

              <p>
                These equations allow the
                calculator to solve for any one
                of the four principal variables
                when the remaining three are
                known.
              </p>
            </section>

            <section aria-labelledby="bandwidth-heading">
              <p className="eyebrow">
                Frequency response
              </p>

              <h2 id="bandwidth-heading">
                Quality factor and bandwidth
              </h2>

              <div className="formula-card">
                <p>
                  Bandwidth
                  <span>
                    BW = f₀ ÷ Q
                  </span>
                </p>
              </div>

              <p>
                A high-Q circuit has a narrow
                bandwidth and responds strongly
                over a small frequency range. A
                low-Q circuit has a broader
                response.
              </p>

              <p>
                Entering an optional resonant
                frequency allows this calculator
                to estimate the corresponding
                bandwidth.
              </p>
            </section>

            <section aria-labelledby="damping-heading">
              <p className="eyebrow">
                Energy-loss behavior
              </p>

              <h2 id="damping-heading">
                Quality factor and damping ratio
              </h2>

              <div className="formula-card">
                <p>
                  Damping ratio
                  <span>
                    ζ = 1 ÷ (2Q)
                  </span>
                </p>
              </div>

              <p>
                The damping ratio indicates how
                quickly oscillations decay. As
                quality factor increases, damping
                ratio decreases.
              </p>
            </section>

            <section aria-labelledby="resistance-heading">
              <p className="eyebrow">
                Resistive energy loss
              </p>

              <h2 id="resistance-heading">
                How resistance affects quality
                factor
              </h2>

              <ul>
                <li>
                  Increasing resistance lowers
                  quality factor.
                </li>
                <li>
                  Lower quality factor produces
                  broader bandwidth.
                </li>
                <li>
                  Higher resistance increases
                  energy dissipation.
                </li>
                <li>
                  Lower resistance creates sharper
                  resonance in the ideal series
                  model.
                </li>
              </ul>
            </section>

            <section aria-labelledby="components-heading">
              <p className="eyebrow">
                Inductor and capacitor effects
              </p>

              <h2 id="components-heading">
                How inductance and capacitance
                affect Q
              </h2>

              <p>
                For fixed resistance and
                capacitance, increasing
                inductance raises quality factor.
                For fixed resistance and
                inductance, increasing
                capacitance lowers quality
                factor.
              </p>

              <p>
                These relationships follow from
                the square-root term √(L/C) in
                the series RLC equation.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Input requirements
              </p>

              <h2 id="units-heading">
                RLC quality factor units
              </h2>

              <ul>
                <li>
                  Quality factor: dimensionless.
                </li>
                <li>
                  Resistance: ohms (Ω).
                </li>
                <li>
                  Inductance: henries (H).
                </li>
                <li>
                  Capacitance: farads (F).
                </li>
                <li>
                  Resonant frequency: hertz (Hz).
                </li>
                <li>
                  Bandwidth: hertz (Hz).
                </li>
              </ul>

              <p>
                Convert millihenries,
                microhenries, microfarads,
                nanofarads, and other prefixed
                units into base SI units before
                entering them.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical circuit design
              </p>

              <h2 id="applications-heading">
                Where RLC quality factor is used
              </h2>

              <ul>
                <li>
                  Radio-frequency tuning circuits.
                </li>
                <li>
                  Band-pass and band-stop filters.
                </li>
                <li>
                  Oscillator design.
                </li>
                <li>
                  Antenna matching networks.
                </li>
                <li>
                  Audio crossover circuits.
                </li>
                <li>
                  Resonant sensors and measurement
                  systems.
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
                This calculator uses the standard
                ideal series RLC quality-factor
                model. Real circuits can include
                inductor winding resistance,
                capacitor equivalent series
                resistance, dielectric loss, and
                parasitic components.
              </p>

              <p>
                At high frequencies, component
                construction and circuit layout
                can significantly affect measured
                quality factor.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="rlc-quality-factor-calculator"
              heading="Continue your RLC analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                RLC quality factor FAQ
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

          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
