import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { RlcBandwidthCalculator } from "@/components/calculators/rlc-bandwidth-calculator";
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
  "RLC Bandwidth Calculator";

const pageDescription =
  "Calculate RLC circuit bandwidth, resonant frequency, or quality factor and estimate the lower and upper half-power frequencies.";

const pagePath =
  "/calculators/rlc-bandwidth-calculator";

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
      "What formula does the RLC bandwidth calculator use?",
    answer:
      "The calculator uses BW = f₀ ÷ Q, where BW is bandwidth, f₀ is resonant frequency, and Q is the circuit quality factor.",
  },
  {
    question:
      "How do you calculate resonant frequency from bandwidth?",
    answer:
      "Multiply bandwidth by quality factor using f₀ = BW × Q.",
  },
  {
    question:
      "How do you calculate quality factor from bandwidth?",
    answer:
      "Divide resonant frequency by bandwidth using Q = f₀ ÷ BW.",
  },
  {
    question:
      "What does a narrow RLC bandwidth mean?",
    answer:
      "A narrow bandwidth normally indicates a higher quality factor, sharper resonance, and greater frequency selectivity.",
  },
  {
    question:
      "What are half-power frequencies?",
    answer:
      "Half-power frequencies are the lower and upper cutoff frequencies that define the circuit bandwidth around resonance.",
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

export default function RlcBandwidthCalculatorPage() {
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
                RLC Bandwidth Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Series RLC frequency response
            </p>

            <h1>
              RLC Bandwidth Calculator
            </h1>

            <p>
              Calculate bandwidth, resonant
              frequency, or quality factor for
              a resonant RLC circuit. Review
              estimated lower and upper
              half-power frequencies with each
              result.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="RLC bandwidth calculator"
      >
        <Container>
          <RlcBandwidthCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Resonance frequency range
              </p>

              <h2 id="overview-heading">
                What is bandwidth in an RLC
                circuit?
              </h2>

              <p>
                Bandwidth is the frequency
                interval between the lower and
                upper half-power points of a
                resonant circuit.
              </p>

              <p>
                It describes how wide the
                circuit&apos;s useful resonance
                response is around its center or
                resonant frequency.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                RLC bandwidth formula
              </h2>

              <div className="formula-card">
                <p>
                  Bandwidth
                  <span>BW = f₀ ÷ Q</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>BW</strong> is
                  bandwidth in hertz.
                </li>

                <li>
                  <strong>f₀</strong> is the
                  resonant frequency in hertz.
                </li>

                <li>
                  <strong>Q</strong> is the
                  dimensionless quality factor.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked calculation
              </p>

              <h2 id="example-heading">
                Calculate RLC bandwidth
              </h2>

              <p>
                Suppose a resonant circuit has a
                resonant frequency of{" "}
                <strong>1,000 Hz</strong> and a
                quality factor of{" "}
                <strong>20</strong>.
              </p>

              <ol>
                <li>
                  Use BW = f₀ ÷ Q.
                </li>

                <li>
                  Substitute BW = 1,000 ÷ 20.
                </li>

                <li>
                  The bandwidth is{" "}
                  <strong>50 Hz</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve related variables
              </p>

              <h2 id="rearranged-heading">
                Rearranged bandwidth equations
              </h2>

              <div className="formula-card">
                <p>
                  Resonant frequency
                  <span>f₀ = BW × Q</span>
                </p>

                <p>
                  Quality factor
                  <span>Q = f₀ ÷ BW</span>
                </p>
              </div>
            </section>

            <section aria-labelledby="cutoff-heading">
              <p className="eyebrow">
                Frequency limits
              </p>

              <h2 id="cutoff-heading">
                Lower and upper half-power
                frequencies
              </h2>

              <p>
                For a simple centered estimate,
                half of the bandwidth is
                subtracted from and added to the
                resonant frequency.
              </p>

              <div className="formula-card">
                <p>
                  Lower frequency
                  <span>f₁ ≈ f₀ − BW ÷ 2</span>
                </p>

                <p>
                  Upper frequency
                  <span>f₂ ≈ f₀ + BW ÷ 2</span>
                </p>
              </div>

              <p>
                These values show the approximate
                frequency range across which the
                resonant response remains within
                its half-power limits.
              </p>
            </section>

            <section aria-labelledby="quality-heading">
              <p className="eyebrow">
                Resonance selectivity
              </p>

              <h2 id="quality-heading">
                How quality factor affects
                bandwidth
              </h2>

              <ul>
                <li>
                  A higher quality factor produces
                  a narrower bandwidth.
                </li>

                <li>
                  A lower quality factor produces
                  a broader bandwidth.
                </li>

                <li>
                  Narrow-band circuits provide
                  greater frequency selectivity.
                </li>

                <li>
                  Broad-band circuits respond over
                  a wider frequency range.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="rlc-bandwidth-calculator"
              heading="Continue your RLC analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                RLC bandwidth calculator FAQ
              </h2>

              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="faq-item"
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
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
