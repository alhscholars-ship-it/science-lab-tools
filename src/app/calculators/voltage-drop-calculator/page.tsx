import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { VoltageDropCalculator } from "@/components/calculators/voltage-drop-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Voltage Drop Calculator";

const pageDescription =
  "Calculate voltage drop, current, cable length, conductor area, or resistivity using a round-trip DC conductor resistance model.";

const pagePath =
  "/calculators/voltage-drop-calculator";

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
      "What formula does the voltage drop calculator use?",
    answer:
      "The calculator uses Vdrop = 2 × I × ρ × L ÷ A. The factor of two represents the outgoing and return conductors in a two-wire DC circuit.",
  },
  {
    question:
      "Why is conductor length entered as one-way distance?",
    answer:
      "You enter the distance from the source to the load. The calculator automatically doubles that distance to account for the complete electrical loop.",
  },
  {
    question:
      "Which resistivity value should I use for copper?",
    answer:
      "A common reference value for copper at approximately 20 degrees Celsius is 1.724 × 10⁻⁸ ohm-metres. Actual resistance changes with temperature and material composition.",
  },
  {
    question:
      "Can this calculator determine cable size?",
    answer:
      "Yes. Select cross-sectional area as the unknown and enter the permitted voltage drop, current, one-way length, and conductor resistivity.",
  },
  {
    question:
      "Does the calculator support AC circuits?",
    answer:
      "It models resistive round-trip conductor loss and is most suitable for simple DC or low-reactance single-phase applications. AC impedance, power factor, and three-phase systems require additional calculations.",
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

export default function VoltageDropCalculatorPage() {
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
                Voltage Drop Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrical conductors and wiring
            </p>

            <h1>Voltage Drop Calculator</h1>

            <p>
              Calculate conductor voltage drop,
              allowable current, one-way cable length,
              cross-sectional area, or electrical
              resistivity.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Voltage drop calculator"
      >
        <Container>
          <VoltageDropCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Conductor losses
              </p>

              <h2 id="overview-heading">
                What is voltage drop?
              </h2>

              <p>
                Voltage drop is the reduction in
                electrical potential that occurs when
                current flows through a conductor with
                resistance.
              </p>

              <p>
                Every real wire has some resistance.
                Longer conductors, smaller conductor
                areas, higher current, and materials with
                greater resistivity all produce a larger
                voltage drop.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Voltage drop formula
              </h2>

              <div className="formula-card">
                <p>
                  Voltage drop
                  <span>
                    Vdrop = 2 × I × ρ × L ÷ A
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Vdrop</strong> is the voltage
                  lost across the complete conductor loop.
                </li>

                <li>
                  <strong>I</strong> is current in amperes.
                </li>

                <li>
                  <strong>ρ</strong> is conductor
                  resistivity in ohm-metres.
                </li>

                <li>
                  <strong>L</strong> is the one-way
                  conductor length in metres.
                </li>

                <li>
                  <strong>A</strong> is conductor
                  cross-sectional area in square metres
                  inside the equation.
                </li>
              </ul>

              <p>
                Because this calculator accepts conductor
                area in square millimetres, it converts
                the entered value to square metres before
                applying the equation.
              </p>
            </section>

            <section aria-labelledby="factor-heading">
              <p className="eyebrow">
                Complete circuit path
              </p>

              <h2 id="factor-heading">
                Why does the formula include a factor of
                two?
              </h2>

              <p>
                In a simple two-wire circuit, current
                travels from the source to the load and
                then returns to the source. Both
                conductors contribute resistance.
              </p>

              <p>
                The calculator therefore uses twice the
                entered one-way length. You should not
                manually double the cable distance before
                entering it.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Solve every variable
              </p>

              <h2 id="rearranged-heading">
                Rearranged voltage drop equations
              </h2>

              <div className="formula-card">
                <p>
                  Current
                  <span>
                    I = Vdrop × A ÷ (2 × ρ × L)
                  </span>
                </p>

                <p>
                  One-way length
                  <span>
                    L = Vdrop × A ÷ (2 × I × ρ)
                  </span>
                </p>

                <p>
                  Cross-sectional area
                  <span>
                    A = 2 × I × ρ × L ÷ Vdrop
                  </span>
                </p>

                <p>
                  Resistivity
                  <span>
                    ρ = Vdrop × A ÷ (2 × I × L)
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked calculation
              </p>

              <h2 id="example-heading">
                Voltage drop example for a copper cable
              </h2>

              <p>
                Consider a 10-ampere load connected by a
                copper conductor with a one-way length of
                20 metres and an area of 2.5 mm².
              </p>

              <ul className="article-list">
                <li>Current: 10 A</li>
                <li>One-way length: 20 m</li>
                <li>Conductor area: 2.5 mm²</li>
                <li>
                  Copper resistivity: 1.724 × 10⁻⁸ Ω·m
                </li>
              </ul>

              <div className="formula-card">
                <p>
                  Substitute the values
                  <span>
                    Vdrop = 2 × 10 × 1.724 × 10⁻⁸ ×
                    20 ÷ 2.5 × 10⁻⁶
                  </span>
                </p>

                <p>
                  Result
                  <span>Vdrop = 2.7584 V</span>
                </p>
              </div>

              <p>
                The complete conductor loop has a
                resistance of approximately 0.27584 Ω and
                loses approximately 27.584 watts at
                10 amperes.
              </p>
            </section>

            <section aria-labelledby="resistivity-heading">
              <p className="eyebrow">
                Material properties
              </p>

              <h2 id="resistivity-heading">
                Typical conductor resistivity values
              </h2>

              <p>
                Approximate resistivity values near room
                temperature include:
              </p>

              <ul className="article-list">
                <li>
                  Copper: approximately 1.724 × 10⁻⁸ Ω·m
                </li>

                <li>
                  Aluminium: approximately 2.82 × 10⁻⁸
                  Ω·m
                </li>
              </ul>

              <p>
                Actual values vary with temperature,
                purity, alloy composition, and
                manufacturing conditions. Use the
                specification supplied for the conductor
                when accuracy is important.
              </p>
            </section>

            <section aria-labelledby="effects-heading">
              <p className="eyebrow">
                Design relationships
              </p>

              <h2 id="effects-heading">
                What increases voltage drop?
              </h2>

              <ul className="article-list">
                <li>
                  Increasing current increases voltage
                  drop proportionally.
                </li>

                <li>
                  Increasing conductor length increases
                  both resistance and voltage drop.
                </li>

                <li>
                  Reducing conductor area increases
                  resistance and voltage drop.
                </li>

                <li>
                  A material with higher resistivity
                  produces a greater voltage drop.
                </li>

                <li>
                  Higher conductor temperature usually
                  increases resistance.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model limitations
              </p>

              <h2 id="limitations-heading">
                When this calculator should be used
                carefully
              </h2>

              <p>
                This tool uses a simplified resistive
                conductor model. It does not automatically
                include:
              </p>

              <ul className="article-list">
                <li>AC reactance or impedance</li>
                <li>Power factor</li>
                <li>Three-phase correction factors</li>
                <li>Temperature-adjusted resistance</li>
                <li>Connector and termination losses</li>
                <li>Code-required conductor sizing rules</li>
              </ul>

              <p>
                For permanent building wiring, industrial
                systems, high-current equipment, or
                safety-critical installations, follow the
                applicable electrical code and consult a
                qualified electrical professional.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Voltage drop calculator FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="article-sidebar__card">
              <p className="eyebrow">
                Quick reference
              </p>

              <h2>Voltage drop model</h2>

              <ul className="article-list">
                <li>
                  Uses the complete outgoing and return
                  conductor path.
                </li>

                <li>
                  Converts cross-sectional area from mm²
                  to m².
                </li>

                <li>
                  Reports estimated loop resistance and
                  conductor power loss.
                </li>
              </ul>
            </div>

            <div className="article-sidebar__card">
              <p className="eyebrow">
                Related calculators
              </p>

              <h2>Continue your circuit analysis</h2>

              <ul className="article-list">
                <li>
                  <Link href="/calculators/ohms-law-calculator">
                    Ohm&apos;s Law Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/power-calculator">
                    Power Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/series-parallel-resistance-calculator">
                    Series and Parallel Resistance Calculator
                  </Link>
                </li>

                <li>
                  <Link href="/calculators/ac-impedance-calculator">
                    AC Impedance Calculator
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
