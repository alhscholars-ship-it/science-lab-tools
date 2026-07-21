import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { InductorEnergyCalculator } from "@/components/calculators/inductor-energy-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Inductor Energy Calculator";

const pageDescription =
  "Calculate energy stored in an inductor, inductance, or electric current using E = 1/2 LI², with formulas, examples, units, and limitations.";

const pagePath =
  "/calculators/inductor-energy-calculator";

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
      "What formula does the inductor energy calculator use?",
    answer:
      "It uses E = 1/2 LI², where E is stored magnetic energy, L is inductance, and I is current.",
  },
  {
    question:
      "What is the SI unit of energy stored in an inductor?",
    answer:
      "Inductor energy is measured in joules, written J.",
  },
  {
    question:
      "How do I calculate inductance from stored energy?",
    answer:
      "Multiply stored energy by two and divide by current squared using L = 2E/I².",
  },
  {
    question:
      "How do I calculate current from energy and inductance?",
    answer:
      "Divide twice the stored energy by inductance and take the square root using I = √(2E/L).",
  },
  {
    question:
      "Why does inductor energy depend on current squared?",
    answer:
      "The magnetic field becomes stronger as current rises, so stored energy increases in proportion to the square of current.",
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

export default function InductorEnergyCalculatorPage() {
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
                Inductor Energy Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Magnetic energy in inductors
            </p>

            <h1>Inductor Energy Calculator</h1>

            <p>
              Calculate stored magnetic energy,
              inductance, or electric current from any
              two known inductor values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Inductor energy calculator"
      >
        <Container>
          <InductorEnergyCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Magnetic field energy
              </p>

              <h2 id="overview-heading">
                What is energy stored in an inductor?
              </h2>

              <p>
                An inductor stores energy in the
                magnetic field created when electric
                current flows through its coil.
              </p>

              <p>
                The stored energy depends on the
                inductance of the component and the
                square of the current passing through
                it.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main energy equation
              </p>

              <h2 id="formula-heading">
                Inductor energy formula
              </h2>

              <div className="formula-card">
                <p>
                  Stored magnetic energy
                  <span>E = ½LI²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>E</strong> is stored energy
                  in joules.
                </li>

                <li>
                  <strong>L</strong> is inductance in
                  henries.
                </li>

                <li>
                  <strong>I</strong> is electric
                  current in amperes.
                </li>
              </ul>

              <p>
                The equation can be rearranged as
                L = 2E/I² to calculate inductance and
                I = √(2E/L) to calculate current.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate energy from inductance and
                current
              </h2>

              <p>
                Suppose an inductor has an inductance
                of <strong>0.5 H</strong> and carries a
                current of <strong>4 A</strong>.
              </p>

              <ol>
                <li>Use E = ½LI².</li>

                <li>
                  Substitute L = 0.5 H and I = 4 A.
                </li>

                <li>
                  E = ½ × 0.5 × 4².
                </li>

                <li>
                  The stored energy is{" "}
                  <strong>4 J</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="current-heading">
              <p className="eyebrow">
                Current effect
              </p>

              <h2 id="current-heading">
                Why current strongly affects energy
              </h2>

              <p>
                Current is squared in the energy
                equation. Doubling current increases
                stored energy by a factor of four when
                inductance stays constant.
              </p>

              <p>
                This is important in switching
                circuits because interrupting a large
                inductor current can produce a high
                induced voltage.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Inductor energy units
              </h2>

              <ul>
                <li>Energy: joules (J).</li>
                <li>Inductance: henries (H).</li>
                <li>Current: amperes (A).</li>
                <li>
                  1 millihenry = 1 × 10⁻³ H.
                </li>
                <li>
                  1 microhenry = 1 × 10⁻⁶ H.
                </li>
                <li>
                  1 millijoule = 1 × 10⁻³ J.
                </li>
              </ul>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical applications
              </p>

              <h2 id="applications-heading">
                Where inductor energy matters
              </h2>

              <ul>
                <li>
                  Switching power supplies and
                  converters.
                </li>
                <li>
                  Transformers, motors, and relays.
                </li>
                <li>
                  Electromagnets and magnetic
                  actuators.
                </li>
                <li>
                  Energy transfer in LC and RLC
                  circuits.
                </li>
                <li>
                  Flyback circuits and transient
                  protection.
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
                  The inductor is treated as an ideal
                  linear component.
                </li>

                <li>
                  Coil resistance is not included.
                </li>

                <li>
                  Magnetic core saturation is
                  ignored.
                </li>

                <li>
                  Hysteresis and eddy-current losses
                  are not modelled.
                </li>

                <li>
                  Inductance is assumed constant at
                  the specified current.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="inductor-energy-calculator"
              heading="Continue studying inductors and energy"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Inductor energy calculator FAQ
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
              <h2>Energy checklist</h2>

              <ul>
                <li>Convert inductance to henries</li>
                <li>Enter current in amperes</li>
                <li>Enter energy in joules</li>
                <li>Select the unknown variable</li>
                <li>Check current and core limits</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate inductance</h2>

              <p>
                Calculate coil inductance, magnetic
                flux, current, turns, area, or length
                using standard inductance formulas.
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
