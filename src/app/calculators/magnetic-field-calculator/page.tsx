import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { MagneticFieldCalculator } from "@/components/calculators/magnetic-field-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Magnetic Field Calculator";

const pageDescription =
  "Calculate magnetic field strength, magnetic force, charge, velocity, angle, current, or distance using moving-charge and straight-wire formulas.";

const pagePath =
  "/calculators/magnetic-field-calculator";

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
      "What formulas does the magnetic field calculator use?",
    answer:
      "For a moving charge, it uses F = qvB sinθ. For a long straight current-carrying conductor, it uses B = μ₀I/(2πr).",
  },
  {
    question:
      "What is the SI unit of magnetic field strength?",
    answer:
      "Magnetic field strength, or magnetic flux density, is measured in teslas, written T.",
  },
  {
    question:
      "How do I calculate magnetic field from force?",
    answer:
      "Divide magnetic force by charge, velocity, and the sine of the angle using B = F/(qv sinθ).",
  },
  {
    question:
      "When is magnetic force greatest?",
    answer:
      "Magnetic force is greatest when the charged particle moves perpendicular to the magnetic field, so θ equals 90 degrees and sinθ equals 1.",
  },
  {
    question:
      "Does the straight-wire formula work for every conductor?",
    answer:
      "No. It assumes a long, straight conductor in a uniform medium and calculates the field at a perpendicular distance from the wire.",
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

export default function MagneticFieldCalculatorPage() {
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
                Magnetic Field Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Magnetism and moving charges
            </p>

            <h1>Magnetic Field Calculator</h1>

            <p>
              Calculate magnetic field strength from
              a moving charged particle or around a
              long straight current-carrying wire.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Magnetic field calculator"
      >
        <Container>
          <MagneticFieldCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Magnetic interaction
              </p>

              <h2 id="overview-heading">
                What is a magnetic field?
              </h2>

              <p>
                A magnetic field is a region where
                moving electric charges, electric
                currents, and magnetic materials can
                experience magnetic forces.
              </p>

              <p>
                Magnetic field strength is commonly
                represented by the symbol B and is
                measured in teslas. This calculator
                determines field magnitude using two
                standard physics models.
              </p>
            </section>

            <section aria-labelledby="moving-charge-heading">
              <p className="eyebrow">
                Moving charged particle
              </p>

              <h2 id="moving-charge-heading">
                Magnetic force formula
              </h2>

              <div className="formula-card">
                <p className="formula-card__equation">
                  F = qvB sinθ
                </p>

                <ul>
                  <li>
                    <strong>F</strong> is magnetic
                    force in newtons.
                  </li>
                  <li>
                    <strong>q</strong> is charge
                    magnitude in coulombs.
                  </li>
                  <li>
                    <strong>v</strong> is particle
                    velocity in metres per second.
                  </li>
                  <li>
                    <strong>B</strong> is magnetic
                    field strength in teslas.
                  </li>
                  <li>
                    <strong>θ</strong> is the angle
                    between velocity and field
                    direction.
                  </li>
                </ul>
              </div>

              <p>
                Rearranging this equation allows the
                calculator to solve for magnetic
                field, force, charge, velocity, or
                the acute angle.
              </p>
            </section>

            <section aria-labelledby="wire-heading">
              <p className="eyebrow">
                Current-carrying conductor
              </p>

              <h2 id="wire-heading">
                Magnetic field around a straight wire
              </h2>

              <div className="formula-card">
                <p className="formula-card__equation">
                  B = μ₀I ÷ 2πr
                </p>

                <ul>
                  <li>
                    <strong>B</strong> is magnetic
                    field strength in teslas.
                  </li>
                  <li>
                    <strong>μ₀</strong> is vacuum
                    permeability.
                  </li>
                  <li>
                    <strong>I</strong> is current in
                    amperes.
                  </li>
                  <li>
                    <strong>r</strong> is perpendicular
                    distance from the conductor in
                    metres.
                  </li>
                </ul>
              </div>

              <p>
                The field becomes stronger when
                current increases and weaker as the
                observation point moves farther from
                the wire.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate magnetic field around a wire
              </h2>

              <p>
                Suppose a long straight wire carries
                a current of <strong>10 A</strong>,
                and the field is measured{" "}
                <strong>0.05 m</strong> from the wire.
              </p>

              <ol>
                <li>
                  Use B = μ₀I ÷ 2πr.
                </li>
                <li>
                  Substitute μ₀ = 4π × 10⁻⁷,
                  I = 10, and r = 0.05.
                </li>
                <li>
                  The magnetic field is approximately{" "}
                  <strong>0.00004 T</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="angle-heading">
              <p className="eyebrow">
                Direction matters
              </p>

              <h2 id="angle-heading">
                How angle affects magnetic force
              </h2>

              <p>
                Magnetic force depends on sinθ. At
                90 degrees, the force reaches its
                maximum value. At 0 or 180 degrees,
                the particle moves parallel to the
                field and the magnetic force is zero.
              </p>

              <p>
                This calculator accepts angles greater
                than 0 degrees and less than 180
                degrees. It reports the principal
                acute angle when solving inversely.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Magnetic field units
              </h2>

              <ul>
                <li>
                  Magnetic field: teslas (T).
                </li>
                <li>
                  Magnetic force: newtons (N).
                </li>
                <li>
                  Charge: coulombs (C).
                </li>
                <li>
                  Velocity: metres per second (m/s).
                </li>
                <li>
                  Current: amperes (A).
                </li>
                <li>
                  Distance: metres (m).
                </li>
                <li>
                  Angle: degrees (°).
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
                  Calculations use positive
                  magnitudes rather than vector
                  directions.
                </li>
                <li>
                  The moving-charge formula assumes
                  classical particle motion.
                </li>
                <li>
                  The straight-wire model assumes a
                  long, thin, straight conductor.
                </li>
                <li>
                  Nearby magnetic materials and other
                  field sources are not included.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related physics tools
              </p>

              <h2 id="related-heading">
                Continue studying electric and
                magnetic fields
              </h2>

              <div className="related-links">
                <Link href="/calculators/electric-field-calculator">
                  Electric Field Calculator
                </Link>

                <Link href="/calculators/coulombs-law-calculator">
                  Coulomb&apos;s Law Calculator
                </Link>

                <Link href="/calculators/electric-potential-calculator">
                  Electric Potential Calculator
                </Link>

                <Link href="/calculators/ohms-law-calculator">
                  Ohm&apos;s Law Calculator
                </Link>
              </div>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Magnetic field calculator FAQ
              </h2>

              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                  </summary>

                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
          </article>

          <aside className="article-sidebar">
            <CalculatorTrustPanel subject="physics" />

            <section className="sidebar-card">
              <h2>Magnetic field checklist</h2>

              <ul>
                <li>Select the correct model</li>
                <li>Enter SI units</li>
                <li>Use charge magnitude</li>
                <li>Check the field angle</li>
                <li>Review model assumptions</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate electric field</h2>

              <p>
                Compare magnetic interactions with
                electrostatic field calculations.
              </p>

              <Link href="/calculators/electric-field-calculator">
                Open Electric Field Calculator
              </Link>
            </section>
          </aside>
        </Container>
      </section>
    </main>
  );
}
