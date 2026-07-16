import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { ElectricPotentialCalculator } from "@/components/calculators/electric-potential-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Electric Potential Calculator";

const pageDescription =
  "Calculate electric potential, source charge, or distance for a point charge using V = kQ/r, with formulas, units, worked examples, and limitations.";

const pagePath =
  "/calculators/electric-potential-calculator";

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
      "What formula does the electric potential calculator use?",
    answer:
      "The calculator uses V = kQ/r, where V is electric potential, Q is source-charge magnitude, r is distance, and k is Coulomb's constant.",
  },
  {
    question:
      "What is the unit of electric potential?",
    answer:
      "Electric potential is measured in volts. One volt equals one joule per coulomb.",
  },
  {
    question:
      "How do I calculate the source charge?",
    answer:
      "Multiply electric potential by distance and divide by Coulomb's constant using Q = Vr/k.",
  },
  {
    question:
      "How do I calculate distance from a point charge?",
    answer:
      "Multiply Coulomb's constant by the source charge and divide by electric potential using r = kQ/V.",
  },
  {
    question:
      "Is electric potential the same as electric potential energy?",
    answer:
      "No. Electric potential is energy per unit charge, while electric potential energy depends on both the potential and the charge placed in the field.",
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

export default function ElectricPotentialCalculatorPage() {
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
                Electric Potential Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrostatics and voltage
            </p>

            <h1>Electric Potential Calculator</h1>

            <p>
              Calculate electric potential, source
              charge, or distance for a stationary
              point charge.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Electric potential calculator"
      >
        <Container>
          <ElectricPotentialCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Electrostatic potential
              </p>

              <h2 id="overview-heading">
                What is electric potential?
              </h2>

              <p>
                Electric potential describes the
                electric potential energy available
                per unit charge at a particular
                location in an electric field.
              </p>

              <p>
                For a single stationary point charge,
                electric potential depends on the
                source-charge magnitude and the
                distance from that charge.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Electric potential formula
              </h2>

              <div className="formula-card">
                <p>
                  Electric potential
                  <span>V = kQ ÷ r</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>V</strong> is electric
                  potential in volts.
                </li>

                <li>
                  <strong>Q</strong> is source-charge
                  magnitude in coulombs.
                </li>

                <li>
                  <strong>r</strong> is distance from
                  the point charge in metres.
                </li>

                <li>
                  <strong>k</strong> is Coulomb&apos;s
                  constant.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for charge or distance
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Source charge
                  </p>

                  <h3>Q = Vr ÷ k</h3>

                  <p>
                    Multiply potential by distance,
                    then divide by Coulomb&apos;s
                    constant.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Distance
                  </p>

                  <h3>r = kQ ÷ V</h3>

                  <p>
                    Multiply Coulomb&apos;s constant
                    by charge, then divide by
                    potential.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate electric potential
              </h2>

              <ol className="calculation-steps">
                <li>
                  Source charge is{" "}
                  <strong>2 × 10⁻⁶ C</strong>.
                </li>

                <li>
                  Distance is{" "}
                  <strong>0.05 m</strong>.
                </li>

                <li>
                  Apply{" "}
                  <strong>V = kQ ÷ r</strong>.
                </li>

                <li>
                  Substitute the known values into
                  the equation.
                </li>

                <li>
                  Electric potential is approximately{" "}
                  <strong>359,502 V</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="energy-heading">
              <p className="eyebrow">
                Related concept
              </p>

              <h2 id="energy-heading">
                Potential versus potential energy
              </h2>

              <p>
                Electric potential is measured in
                volts and represents energy per unit
                charge.
              </p>

              <p>
                Electric potential energy is measured
                in joules and depends on the charge
                placed at that potential. The two
                concepts are related by{" "}
                <strong>U = qV</strong>.
              </p>
            </section>

            <section aria-labelledby="sign-heading">
              <p className="eyebrow">
                Potential sign
              </p>

              <h2 id="sign-heading">
                Positive and negative source charges
              </h2>

              <p>
                A positive source charge produces
                positive electric potential, while a
                negative source charge produces
                negative electric potential.
              </p>

              <p>
                This calculator uses positive charge
                and potential magnitudes. Apply the
                appropriate sign separately based on
                the source charge.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit guidance
              </p>

              <h2 id="units-heading">
                Electric potential units
              </h2>

              <ul className="article-list">
                <li>
                  Electric potential: volts (V).
                </li>

                <li>
                  Source charge: coulombs (C).
                </li>

                <li>
                  Distance: metres (m).
                </li>

                <li>
                  1 microcoulomb = 1 × 10⁻⁶ C.
                </li>

                <li>
                  1 nanocoulomb = 1 × 10⁻⁹ C.
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
                The point-charge equation assumes a
                stationary source charge in vacuum or
                approximately in air. Distance is
                measured from the centre of the
                charge.
              </p>

              <p>
                Multiple charges, extended charge
                distributions, conductive surfaces,
                dielectric materials, and complex
                geometries require superposition or
                more advanced electrostatic models.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your electrostatics analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/electric-field-calculator"
                >
                  Electric Field Calculator
                </Link>{" "}
                to calculate field strength, force,
                charge, or distance.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/coulombs-law-calculator"
                >
                  Coulomb&apos;s Law Calculator
                </Link>{" "}
                to calculate electrostatic force
                between two point charges.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Electric potential calculator FAQ
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

              <h2>Electric potential formulas</h2>

              <ul>
                <li>V = kQ ÷ r</li>
                <li>Q = Vr ÷ k</li>
                <li>r = kQ ÷ V</li>
                <li>Use charge in coulombs</li>
                <li>Use distance in metres</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate electric field</h2>

              <p>
                Calculate electric field strength
                from force, charge, or distance.
              </p>

              <Link href="/calculators/electric-field-calculator">
                Open Electric Field Calculator
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
