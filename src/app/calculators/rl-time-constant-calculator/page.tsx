import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { RlTimeConstantCalculator } from "@/components/calculators/rl-time-constant-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "RL Time Constant Calculator";

const pageDescription =
  "Calculate RL time constant, inductance, resistance, rising current, decaying current, or elapsed time using standard resistor-inductor circuit equations.";

const pagePath =
  "/calculators/rl-time-constant-calculator";

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
      "What formula does the RL time constant calculator use?",
    answer:
      "The basic RL time constant formula is τ = L/R, where inductance is measured in henries and resistance is measured in ohms.",
  },
  {
    question:
      "What happens after one RL time constant?",
    answer:
      "During current rise, the inductor current reaches about 63.2% of its final value. During current decay, about 36.8% of the initial current remains.",
  },
  {
    question:
      "How do I calculate current rise in an RL circuit?",
    answer:
      "Use I(t) = Imax(1 − e⁻ᵗ/τ), where Imax is the final current, t is elapsed time, and τ is the RL time constant.",
  },
  {
    question:
      "How do I calculate current decay in an RL circuit?",
    answer:
      "Use I(t) = I₀e⁻ᵗ/τ, where I₀ is the initial current, t is elapsed time, and τ is the RL time constant.",
  },
  {
    question:
      "How long does an RL circuit take to reach steady state?",
    answer:
      "After about five time constants, the current is commonly treated as effectively at its final steady-state value.",
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

export default function RlTimeConstantCalculatorPage() {
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
                RL Time Constant Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Resistor-inductor circuit response
            </p>

            <h1>RL Time Constant Calculator</h1>

            <p>
              Calculate RL time constant, inductance,
              resistance, rising current, decaying
              current, or elapsed time.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RL time constant calculator"
      >
        <Container>
          <RlTimeConstantCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Inductor transient response
              </p>

              <h2 id="overview-heading">
                What is an RL time constant?
              </h2>

              <p>
                The RL time constant describes how
                quickly current rises or decays in a
                resistor-inductor circuit.
              </p>

              <p>
                It is represented by the Greek letter
                tau, written τ, and is measured in
                seconds.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main RL relationship
              </p>

              <h2 id="formula-heading">
                RL time constant formula
              </h2>

              <div className="formula-card">
                <p>
                  Time constant
                  <span>τ = L ÷ R</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>τ</strong> is time constant
                  in seconds.
                </li>
                <li>
                  <strong>L</strong> is inductance in
                  henries.
                </li>
                <li>
                  <strong>R</strong> is resistance in
                  ohms.
                </li>
              </ul>

              <p>
                Increasing inductance makes the
                current change more slowly, while
                increasing resistance reduces the
                time constant.
              </p>
            </section>

            <section aria-labelledby="rise-heading">
              <p className="eyebrow">
                Current growth
              </p>

              <h2 id="rise-heading">
                RL current-rise formula
              </h2>

              <div className="formula-card">
                <p>
                  Rising current
                  <span>
                    I(t) = Imax(1 − e⁻ᵗ/τ)
                  </span>
                </p>
              </div>

              <p>
                After one time constant, current
                reaches approximately 63.2% of its
                final steady-state value.
              </p>
            </section>

            <section aria-labelledby="decay-heading">
              <p className="eyebrow">
                Current decay
              </p>

              <h2 id="decay-heading">
                RL current-decay formula
              </h2>

              <div className="formula-card">
                <p>
                  Decaying current
                  <span>I(t) = I₀e⁻ᵗ/τ</span>
                </p>
              </div>

              <p>
                After one time constant, approximately
                36.8% of the initial current remains.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate an RL time constant
              </h2>

              <p>
                Suppose an RL circuit has an
                inductance of <strong>2 H</strong> and
                resistance of <strong>10 Ω</strong>.
              </p>

              <ol>
                <li>Use τ = L ÷ R.</li>
                <li>
                  Substitute L = 2 H and R = 10 Ω.
                </li>
                <li>τ = 2 ÷ 10.</li>
                <li>
                  The RL time constant is{" "}
                  <strong>0.2 seconds</strong>.
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
                  After 1τ, rising current reaches
                  about 63.2%.
                </li>
                <li>
                  After 2τ, rising current reaches
                  about 86.5%.
                </li>
                <li>
                  After 3τ, rising current reaches
                  about 95.0%.
                </li>
                <li>
                  After 5τ, rising current exceeds
                  99%.
                </li>
              </ul>

              <p>
                Engineers often treat five time
                constants as effectively complete for
                both current rise and current decay.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                RL circuit units
              </h2>

              <ul>
                <li>Time constant: seconds (s).</li>
                <li>Inductance: henries (H).</li>
                <li>Resistance: ohms (Ω).</li>
                <li>Current: amperes (A).</li>
                <li>Elapsed time: seconds (s).</li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where RL time constants matter
              </h2>

              <ul>
                <li>Relay and solenoid switching.</li>
                <li>Motor winding current response.</li>
                <li>
                  Switching power supply inductors.
                </li>
                <li>
                  Electromagnets and magnetic
                  actuators.
                </li>
                <li>
                  Transient protection and flyback
                  circuits.
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
                  The resistor and inductor are treated
                  as ideal linear components.
                </li>
                <li>
                  Inductance is assumed constant.
                </li>
                <li>
                  Core saturation and hysteresis are
                  not included.
                </li>
                <li>
                  Parasitic capacitance is ignored.
                </li>
                <li>
                  All calculations use positive
                  magnitudes.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="rl-time-constant-calculator"
              heading="Continue studying RL circuits"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                RL time constant calculator FAQ
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
              <h2>RL circuit checklist</h2>

              <ul>
                <li>Convert inductance to henries</li>
                <li>Enter resistance in ohms</li>
                <li>Use time in seconds</li>
                <li>Select rise or decay mode</li>
                <li>Compare current limits</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate inductance</h2>

              <p>
                Calculate inductance, coil turns,
                magnetic flux, current, area, or coil
                length.
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
