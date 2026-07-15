import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { ElectricFieldCalculator } from "@/components/calculators/electric-field-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Electric Field Calculator";

const pageDescription =
  "Calculate electric field strength, electric force, test charge, source charge, or distance using E = F/q and E = kQ/r².";

const pagePath =
  "/calculators/electric-field-calculator";

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
      "What formulas does the electric field calculator use?",
    answer:
      "It uses E = F/q for force and test-charge calculations, and E = kQ/r² for the field produced by a point source charge.",
  },
  {
    question:
      "What is the unit of electric field strength?",
    answer:
      "Electric field strength is measured in newtons per coulomb, written N/C. It is also equivalent to volts per metre.",
  },
  {
    question:
      "How do I calculate electric force from field strength?",
    answer:
      "Multiply electric field strength by the test charge using F = Eq.",
  },
  {
    question:
      "How do I calculate the field around a point charge?",
    answer:
      "Multiply Coulomb's constant by the source-charge magnitude and divide by the square of the distance using E = kQ/r².",
  },
  {
    question:
      "Does this calculator show electric-field direction?",
    answer:
      "No. It calculates magnitude. The field points away from a positive source charge and toward a negative source charge.",
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

export default function ElectricFieldCalculatorPage() {
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
                Electric Field Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrostatics and electric fields
            </p>

            <h1>Electric Field Calculator</h1>

            <p>
              Calculate electric field strength from
              force and test charge, or from a point
              source charge and distance.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Electric field calculator"
      >
        <Container>
          <ElectricFieldCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Electric interaction
              </p>

              <h2 id="overview-heading">
                What is an electric field?
              </h2>

              <p>
                An electric field describes the
                electric force that a positive test
                charge would experience at a
                particular location.
              </p>

              <p>
                Electric field strength is a vector
                quantity. This calculator determines
                its magnitude using either force and
                test charge or a point source charge
                and distance.
              </p>
            </section>

            <section aria-labelledby="force-formula-heading">
              <p className="eyebrow">
                Force and charge model
              </p>

              <h2 id="force-formula-heading">
                Electric field from force
              </h2>

              <div className="formula-card">
                <p>
                  Electric field strength
                  <span>E = F ÷ q</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>E</strong> is electric field
                  strength in newtons per coulomb.
                </li>

                <li>
                  <strong>F</strong> is electric force
                  in newtons.
                </li>

                <li>
                  <strong>q</strong> is test-charge
                  magnitude in coulombs.
                </li>
              </ul>
            </section>

            <section aria-labelledby="point-formula-heading">
              <p className="eyebrow">
                Point-charge model
              </p>

              <h2 id="point-formula-heading">
                Electric field from a point charge
              </h2>

              <div className="formula-card">
                <p>
                  Point-charge electric field
                  <span>E = kQ ÷ r²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>Q</strong> is the source
                  charge magnitude in coulombs.
                </li>

                <li>
                  <strong>r</strong> is distance from
                  the source charge in metres.
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
                Solve for force, charge, or distance
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Electric force
                  </p>

                  <h3>F = Eq</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Test charge
                  </p>

                  <h3>q = F ÷ E</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Source charge
                  </p>

                  <h3>Q = Er² ÷ k</h3>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Distance
                  </p>

                  <h3>r = √(kQ ÷ E)</h3>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate field from force and charge
              </h2>

              <ol className="calculation-steps">
                <li>
                  Electric force is{" "}
                  <strong>0.02 N</strong>.
                </li>

                <li>
                  Test charge is{" "}
                  <strong>4 × 10⁻⁶ C</strong>.
                </li>

                <li>
                  Apply{" "}
                  <strong>E = F ÷ q</strong>.
                </li>

                <li>
                  Substitute the values:{" "}
                  <strong>
                    E = 0.02 ÷ 4 × 10⁻⁶
                  </strong>
                  .
                </li>

                <li>
                  Electric field strength is{" "}
                  <strong>5000 N/C</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Field direction
              </p>

              <h2 id="direction-heading">
                Positive and negative source charges
              </h2>

              <p>
                The electric field points away from a
                positive source charge and toward a
                negative source charge.
              </p>

              <p>
                The calculator accepts positive
                magnitudes and reports field
                magnitude. Determine direction from
                the source-charge sign and geometry.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Unit guidance
              </p>

              <h2 id="units-heading">
                Electric field units and conversions
              </h2>

              <ul className="article-list">
                <li>
                  Electric field: newtons per coulomb
                  (N/C).
                </li>

                <li>
                  Electric force: newtons (N).
                </li>

                <li>
                  Electric charge: coulombs (C).
                </li>

                <li>
                  Distance: metres (m).
                </li>

                <li>
                  1 microcoulomb = 1 × 10⁻⁶ C.
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
                The force-charge model assumes that
                the test charge is sufficiently small
                that it does not significantly alter
                the original electric field.
              </p>

              <p>
                The point-charge model assumes a
                stationary point source in vacuum or
                approximately in air. Extended charge
                distributions, dielectric materials,
                multiple charges, shielding, and
                complex geometry require more
                advanced field analysis.
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
                  href="/calculators/coulombs-law-calculator"
                >
                  Coulomb&apos;s Law Calculator
                </Link>{" "}
                to calculate the electric force
                between two point charges.
              </p>

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
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Electric field calculator FAQ
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

              <h2>Electric field formulas</h2>

              <ul>
                <li>E = F ÷ q</li>
                <li>F = Eq</li>
                <li>q = F ÷ E</li>
                <li>E = kQ ÷ r²</li>
                <li>r = √(kQ ÷ E)</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>

              <h2>Calculate electrostatic force</h2>

              <p>
                Calculate force, charge, or separation
                distance between point charges.
              </p>

              <Link href="/calculators/coulombs-law-calculator">
                Open Coulomb&apos;s Law Calculator
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
