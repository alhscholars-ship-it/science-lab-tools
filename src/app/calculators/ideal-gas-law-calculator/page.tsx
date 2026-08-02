import type { Metadata } from "next";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { IdealGasLawCalculator } from "@/components/calculators/ideal-gas-law-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Ideal Gas Law Calculator";

const pageDescription =
  "Calculate pressure, volume, moles, or temperature with the ideal gas law PV = nRT. Includes unit conversions, formulas, examples, and model assumptions.";

const pagePath =
  "/calculators/ideal-gas-law-calculator";

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
      "What formula does the ideal gas law calculator use?",
    answer:
      "The calculator uses PV = nRT, where P is absolute pressure, V is gas volume, n is the amount of gas in moles, R is the ideal gas constant, and T is absolute temperature in kelvin.",
  },
  {
    question:
      "Can the ideal gas law calculator solve for any variable?",
    answer:
      "Yes. Enter three known values and select pressure, volume, moles, or temperature as the unknown variable.",
  },
  {
    question:
      "Does temperature need to be entered in kelvin?",
    answer:
      "No. You can enter temperature in kelvin, Celsius, or Fahrenheit. The calculator converts the value to kelvin internally before applying the formula.",
  },
  {
    question:
      "When is the ideal gas law less accurate?",
    answer:
      "The ideal gas law becomes less accurate for gases at high pressure, very low temperature, or near condensation because real molecular volume and intermolecular forces become significant.",
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
    sectionName: "Chemistry Calculators",
    sectionPath: "/chemistry-calculators",
  });

export default function IdealGasLawCalculatorPage() {
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
          <CalculatorBreadcrumb
            category="Chemistry"
            title="Ideal Gas Law Calculator"
          />

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry gas law tool
            </p>

            <h1>Ideal Gas Law Calculator</h1>

            <p>
              Solve for pressure, volume, moles,
              or temperature using PV = nRT with
              automatic pressure, volume, and
              temperature unit conversions.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Ideal gas law calculator"
      >
        <Container>
          <IdealGasLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Chemistry overview
              </p>

              <h2 id="overview-heading">
                What is the ideal gas law?
              </h2>

              <p>
                The ideal gas law relates the
                pressure, volume, amount, and
                absolute temperature of a gas.
                It combines several simpler gas
                laws into one equation that can
                solve many introductory chemistry
                and laboratory problems.
              </p>

              <p>
                The equation models gas particles
                as having negligible volume and
                no intermolecular attraction. It
                provides a useful approximation
                when a real gas behaves close to
                those assumptions.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Ideal gas law formula
              </h2>

              <div className="formula-card">
                <p>
                  Ideal gas law
                  <span>P × V = n × R × T</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>P</strong> is absolute
                  gas pressure.
                </li>

                <li>
                  <strong>V</strong> is the volume
                  occupied by the gas.
                </li>

                <li>
                  <strong>n</strong> is the amount
                  of gas in moles.
                </li>

                <li>
                  <strong>R</strong> is the ideal
                  gas constant.
                </li>

                <li>
                  <strong>T</strong> is absolute
                  temperature in kelvin.
                </li>
              </ul>

              <p>
                This calculator uses{" "}
                <strong>
                  R = 8.314462618 kPa·L/(mol·K)
                </strong>
                . It converts entered values to
                compatible internal units before
                solving the equation.
              </p>
            </section>

            <section
              aria-labelledby="rearranged-heading"
            >
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for any ideal gas variable
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Pressure
                  </p>

                  <h3>P = nRT ÷ V</h3>

                  <p>
                    Divide moles times the gas
                    constant and temperature by
                    volume.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Volume
                  </p>

                  <h3>V = nRT ÷ P</h3>

                  <p>
                    Divide moles times the gas
                    constant and temperature by
                    pressure.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Moles
                  </p>

                  <h3>n = PV ÷ RT</h3>

                  <p>
                    Divide pressure times volume
                    by the gas constant and
                    temperature.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Temperature
                  </p>

                  <h3>T = PV ÷ nR</h3>

                  <p>
                    Divide pressure times volume
                    by moles and the gas constant.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Supported units
              </p>

              <h2 id="units-heading">
                Pressure, volume, and temperature
                units
              </h2>

              <ul className="article-list">
                <li>
                  Pressure: pascals, kilopascals,
                  bar, atmospheres, or millimeters
                  of mercury.
                </li>

                <li>
                  Volume: milliliters, liters, or
                  cubic meters.
                </li>

                <li>
                  Amount of gas: moles.
                </li>

                <li>
                  Temperature: kelvin, Celsius, or
                  Fahrenheit.
                </li>
              </ul>

              <p>
                Temperature is always converted to
                kelvin for the calculation because
                gas-law equations require an
                absolute temperature scale.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate gas pressure at standard
                temperature
              </h2>

              <p>
                Find the pressure of{" "}
                <strong>1 mole</strong> of an ideal
                gas occupying{" "}
                <strong>22.414 liters</strong> at{" "}
                <strong>273.15 kelvin</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Rearrange the equation for
                  pressure:{" "}
                  <strong>P = nRT ÷ V</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    P = 1 × 8.314462618 × 273.15
                    ÷ 22.414
                  </strong>
                  .
                </li>

                <li>
                  Complete the calculation:{" "}
                  <strong>
                    P ≈ 101.325 kPa
                  </strong>
                  .
                </li>

                <li>
                  This pressure is approximately{" "}
                  <strong>1 atmosphere</strong>.
                </li>
              </ol>
            </section>

            <section
              aria-labelledby="mistakes-heading"
            >
              <p className="eyebrow">
                Chemistry guidance
              </p>

              <h2 id="mistakes-heading">
                Common ideal gas law mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Using gauge pressure instead of
                  absolute pressure.
                </li>

                <li>
                  Substituting Celsius or
                  Fahrenheit directly without
                  converting to kelvin.
                </li>

                <li>
                  Mixing pressure and volume units
                  that do not match the selected
                  gas constant.
                </li>

                <li>
                  Entering particle count instead
                  of amount in moles.
                </li>

                <li>
                  Rounding converted values too
                  early in the calculation.
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="limitations-heading"
            >
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Ideal gas law assumptions and
                limitations
              </h2>

              <ul className="article-list">
                <li>
                  Gas particles are treated as
                  having negligible individual
                  volume.
                </li>

                <li>
                  Intermolecular attractions and
                  repulsions are ignored.
                </li>

                <li>
                  Particle collisions are assumed
                  to be perfectly elastic.
                </li>

                <li>
                  The gas is assumed to be in a
                  uniform equilibrium state.
                </li>

                <li>
                  Accuracy may decrease at high
                  pressure, low temperature, or
                  near a phase change.
                </li>

                <li>
                  All entered quantities must
                  describe the same gas sample and
                  physical state.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="ideal-gas-law-calculator"
              heading="Continue your chemistry calculations"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Ideal gas law calculator FAQ
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

              <h2>
                Ideal gas law checklist
              </h2>

              <ul>
                <li>
                  Select the unknown variable
                </li>

                <li>
                  Enter the other three values
                </li>

                <li>
                  Use absolute pressure
                </li>

                <li>
                  Keep temperature above absolute
                  zero
                </li>

                <li>
                  Check that units describe the
                  same gas state
                </li>

                <li>
                  Apply PV = nRT
                </li>
              </ul>
            </div>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="chemistry" />
        </Container>
      </section>
    </main>
  );
}
