import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { CoulombsLawCalculator } from "@/components/calculators/coulombs-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Coulomb's Law Calculator";

const pageDescription =
  "Calculate electrostatic force, electric charge, or separation distance using Coulomb's law, with formulas, worked examples, units, and limitations.";

const pagePath =
  "/calculators/coulombs-law-calculator";

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
      "What formula does the Coulomb's law calculator use?",
    answer:
      "The calculator uses F = kq₁q₂ / r², where F is electrostatic force, q₁ and q₂ are charge magnitudes, r is separation distance, and k is Coulomb's constant.",
  },
  {
    question:
      "What value is used for Coulomb's constant?",
    answer:
      "The calculator uses approximately 8.9875517923 × 10⁹ newton metre squared per coulomb squared.",
  },
  {
    question:
      "What units should I enter?",
    answer:
      "Enter force in newtons, charge magnitudes in coulombs, and separation distance in metres.",
  },
  {
    question:
      "Can I enter microcoulombs or nanocoulombs?",
    answer:
      "Yes, after converting them to coulombs. For example, 1 microcoulomb is 1 × 10⁻⁶ coulombs and 1 nanocoulomb is 1 × 10⁻⁹ coulombs.",
  },
  {
    question:
      "Does the calculator determine attraction or repulsion?",
    answer:
      "The calculator determines force magnitude only. Charges with the same sign repel, while charges with opposite signs attract.",
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

export default function CoulombsLawCalculatorPage() {
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
                Coulomb&apos;s Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrostatics and electric charge
            </p>

            <h1>Coulomb&apos;s Law Calculator</h1>

            <p>
              Calculate electrostatic force, either
              charge magnitude, or separation
              distance between two point charges.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Coulomb's law calculator"
      >
        <Container>
          <CoulombsLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Electrostatic interaction
              </p>

              <h2 id="overview-heading">
                What is Coulomb&apos;s law?
              </h2>

              <p>
                Coulomb&apos;s law describes the
                magnitude of the electric force
                between two stationary point charges.
                The force increases with charge
                magnitude and decreases rapidly as
                distance increases.
              </p>

              <p>
                The relationship is an inverse-square
                law, meaning that doubling the
                separation distance reduces the force
                to one quarter of its original value.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">
                Main equation
              </p>

              <h2 id="formula-heading">
                Coulomb&apos;s law formula
              </h2>

              <div className="formula-card">
                <p>
                  Electrostatic force
                  <span>F = kq₁q₂ ÷ r²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>F</strong> is force in
                  newtons.
                </li>

                <li>
                  <strong>q₁</strong> and{" "}
                  <strong>q₂</strong> are charge
                  magnitudes in coulombs.
                </li>

                <li>
                  <strong>r</strong> is centre-to-centre
                  separation distance in metres.
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
                    First charge
                  </p>

                  <h3>q₁ = Fr² ÷ kq₂</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Second charge
                  </p>

                  <h3>q₂ = Fr² ÷ kq₁</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Distance
                  </p>

                  <h3>r = √(kq₁q₂ ÷ F)</h3>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Find electrostatic force
              </h2>

              <ol className="calculation-steps">
                <li>
                  Let q₁ ={" "}
                  <strong>1 × 10⁻⁶ C</strong>.
                </li>

                <li>
                  Let q₂ ={" "}
                  <strong>2 × 10⁻⁶ C</strong>.
                </li>

                <li>
                  Let separation distance be{" "}
                  <strong>0.05 m</strong>.
                </li>

                <li>
                  Apply{" "}
                  <strong>
                    F = kq₁q₂ ÷ r²
                  </strong>
                  .
                </li>

                <li>
                  The force magnitude is approximately{" "}
                  <strong>7.19 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Attraction and repulsion
              </p>

              <h2 id="direction-heading">
                Charge signs determine direction
              </h2>

              <p>
                Charges with the same sign repel each
                other. Charges with opposite signs
                attract each other.
              </p>

              <p>
                This calculator uses positive charge
                magnitudes and reports the magnitude
                of the force. Determine direction
                separately from the signs of the
                charges.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit guidance
              </p>

              <h2 id="units-heading">
                Convert charge values to coulombs
              </h2>

              <ul className="article-list">
                <li>
                  1 microcoulomb = 1 × 10⁻⁶ C.
                </li>

                <li>
                  1 nanocoulomb = 1 × 10⁻⁹ C.
                </li>

                <li>
                  1 millimetre = 1 × 10⁻³ m.
                </li>

                <li>
                  Force is reported in newtons.
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
                Coulomb&apos;s law in this form assumes
                stationary point charges in vacuum or
                approximately in air. The separation
                distance must be measured between the
                charge centres.
              </p>

              <p>
                Extended charge distributions,
                dielectric materials, moving charges,
                shielding, and complex electric-field
                geometries may require more advanced
                models.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your force analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                to calculate force, mass, or
                acceleration using Newton&apos;s
                second law.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ohms-law-calculator"
                >
                  Ohm&apos;s Law Calculator
                </Link>{" "}
                to analyze voltage, current,
                resistance, and electrical power.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Coulomb&apos;s law calculator FAQ
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

              <h2>Coulomb&apos;s law checklist</h2>

              <ul>
                <li>F = kq₁q₂ ÷ r²</li>
                <li>Use charge magnitudes</li>
                <li>Convert charges to coulombs</li>
                <li>Use distance in metres</li>
                <li>Determine direction from signs</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate mechanical force</h2>

              <p>
                Calculate force, mass, or
                acceleration using F = ma.
              </p>

              <Link href="/calculators/force-calculator">
                Open Force Calculator
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
