import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { WaveSpeedCalculator } from "@/components/calculators/wave-speed-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Wave Speed Calculator";

const pageDescription =
  "Calculate wave speed, frequency, or wavelength using v = f × λ, with formulas, unit guidance, worked examples, and calculation steps.";

const pagePath =
  "/calculators/wave-speed-calculator";

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
      "What formula does the wave speed calculator use?",
    answer:
      "The calculator uses v = f × λ, where v is wave speed, f is frequency, and λ is wavelength.",
  },
  {
    question:
      "How do I calculate wavelength?",
    answer:
      "Divide wave speed by frequency using λ = v ÷ f.",
  },
  {
    question:
      "How do I calculate frequency?",
    answer:
      "Divide wave speed by wavelength using f = v ÷ λ.",
  },
  {
    question:
      "What units should I use?",
    answer:
      "Use metres per second for wave speed, hertz for frequency, and metres for wavelength.",
  },
  {
    question:
      "Does wave speed change when frequency changes?",
    answer:
      "In a fixed medium under unchanged conditions, wave speed is usually determined by the medium. Frequency and wavelength adjust inversely.",
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

export default function WaveSpeedCalculatorPage() {
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
                Wave Speed Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Waves and oscillations
            </p>

            <h1>Wave Speed Calculator</h1>

            <p>
              Calculate wave speed, frequency, or
              wavelength from two known wave
              quantities.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Wave speed calculator"
      >
        <Container>
          <WaveSpeedCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Wave motion
              </p>

              <h2 id="overview-heading">
                What is wave speed?
              </h2>

              <p>
                Wave speed is the distance a wave
                disturbance travels per unit time. It
                depends on the properties of the
                medium and the type of wave.
              </p>

              <p>
                Frequency describes how many complete
                cycles occur each second, while
                wavelength describes the distance
                between corresponding points on
                adjacent waves.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Wave speed formula
              </h2>

              <div className="formula-card">
                <p>
                  Wave speed
                  <span>v = f × λ</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>v</strong> is wave speed in
                  metres per second.
                </li>

                <li>
                  <strong>f</strong> is frequency in
                  hertz.
                </li>

                <li>
                  <strong>λ</strong> is wavelength in
                  metres.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Calculate frequency or wavelength
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Frequency
                  </p>

                  <h3>f = v ÷ λ</h3>

                  <p>
                    Divide wave speed by wavelength.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Wavelength
                  </p>

                  <h3>λ = v ÷ f</h3>

                  <p>
                    Divide wave speed by frequency.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate speed from frequency and
                wavelength
              </h2>

              <ol className="calculation-steps">
                <li>
                  Frequency is{" "}
                  <strong>170 Hz</strong>.
                </li>

                <li>
                  Wavelength is{" "}
                  <strong>2 m</strong>.
                </li>

                <li>
                  Apply{" "}
                  <strong>v = f × λ</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>v = 170 × 2</strong>.
                </li>

                <li>
                  Wave speed is{" "}
                  <strong>340 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">
                Inverse relationship
              </p>

              <h2 id="relationship-heading">
                Frequency and wavelength
              </h2>

              <p>
                In the same medium, wave speed is
                normally constant. Increasing
                frequency therefore decreases
                wavelength, while decreasing
                frequency increases wavelength.
              </p>

              <p>
                This inverse relationship is central
                to sound waves, water waves,
                electromagnetic radiation, and many
                laboratory experiments.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit guidance
              </p>

              <h2 id="units-heading">
                Use compatible wave units
              </h2>

              <ul className="article-list">
                <li>
                  Wave speed: metres per second
                  (m/s).
                </li>

                <li>
                  Frequency: hertz (Hz), equivalent
                  to cycles per second.
                </li>

                <li>
                  Wavelength: metres (m).
                </li>
              </ul>

              <p>
                Convert centimetres, millimetres,
                kilohertz, megahertz, or other unit
                prefixes before entering values.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where the wave equation is used
              </h2>

              <ul className="article-list">
                <li>
                  Sound waves and acoustics.
                </li>

                <li>
                  Water and mechanical waves.
                </li>

                <li>
                  Radio and electromagnetic waves.
                </li>

                <li>
                  Laboratory oscillation experiments.
                </li>

                <li>
                  Communications and signal analysis.
                </li>
              </ul>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">
                Model limitations
              </p>

              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>

              <p>
                The equation assumes a single wave
                travelling through a uniform medium
                under stable conditions. The entered
                frequency and wavelength must refer
                to the same wave.
              </p>

              <p>
                Wave speed may change when the medium,
                temperature, tension, density,
                pressure, or other physical conditions
                change. Dispersive media can also
                produce different speeds for
                different frequencies.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your wave and motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/average-speed-calculator"
                >
                  Average Speed Calculator
                </Link>{" "}
                for distance and elapsed-time
                calculations.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rotational-frequency-calculator"
                >
                  Rotational Frequency Calculator
                </Link>{" "}
                to calculate frequency from
                revolutions and elapsed time.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Wave speed calculator FAQ
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
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Quick reference
              </p>

              <h2>Wave equation checklist</h2>

              <ul>
                <li>v = f × λ</li>
                <li>f = v ÷ λ</li>
                <li>λ = v ÷ f</li>
                <li>Use compatible units</li>
                <li>Use positive values</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate rotational frequency</h2>

              <p>
                Calculate frequency, revolutions, or
                elapsed time for repeated rotation.
              </p>

              <Link href="/calculators/rotational-frequency-calculator">
                Open Rotational Frequency Calculator
              </Link>
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
