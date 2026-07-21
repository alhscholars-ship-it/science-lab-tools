import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { InductanceCalculator } from "@/components/calculators/inductance-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Inductance Calculator";

const pageDescription =
  "Calculate inductance, coil turns, magnetic flux, current, solenoid area, or coil length using flux-linkage and air-core solenoid formulas.";

const pagePath =
  "/calculators/inductance-calculator";

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
      "What formulas does the inductance calculator use?",
    answer:
      "It uses L = NΦ/I for flux linkage and L = μ₀N²A/ℓ for an ideal air-core solenoid.",
  },
  {
    question:
      "What is the SI unit of inductance?",
    answer:
      "The SI unit of inductance is the henry, written H.",
  },
  {
    question:
      "How do I calculate inductance from magnetic flux?",
    answer:
      "Multiply the number of turns by magnetic flux and divide by current using L = NΦ/I.",
  },
  {
    question:
      "How do coil turns affect solenoid inductance?",
    answer:
      "In the air-core solenoid equation, inductance is proportional to the square of the number of turns.",
  },
  {
    question:
      "Does this calculator work for iron-core inductors?",
    answer:
      "The solenoid mode assumes an ideal air core. Magnetic cores require their relative permeability and additional non-ideal effects.",
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

export default function InductanceCalculatorPage() {
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
                Inductance Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Coils and magnetic flux linkage
            </p>

            <h1>Inductance Calculator</h1>

            <p>
              Calculate inductance and related coil
              variables using flux-linkage or ideal
              air-core solenoid equations.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Inductance calculator"
      >
        <Container>
          <InductanceCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Magnetic energy storage
              </p>

              <h2 id="overview-heading">
                What is inductance?
              </h2>

              <p>
                Inductance describes the ability of a
                conductor or coil to oppose changes in
                current by producing an induced
                voltage.
              </p>

              <p>
                It depends on magnetic flux linkage,
                coil geometry, number of turns, and
                magnetic permeability.
              </p>
            </section>

            <section aria-labelledby="flux-heading">
              <p className="eyebrow">
                Flux-linkage model
              </p>

              <h2 id="flux-heading">
                Inductance from magnetic flux
              </h2>

              <div className="formula-card">
                <p>
                  Flux-linkage inductance
                  <span>L = NΦ ÷ I</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>L</strong> is inductance in
                  henries.
                </li>
                <li>
                  <strong>N</strong> is the number of
                  coil turns.
                </li>
                <li>
                  <strong>Φ</strong> is magnetic flux
                  through one turn in webers.
                </li>
                <li>
                  <strong>I</strong> is current in
                  amperes.
                </li>
              </ul>
            </section>

            <section aria-labelledby="solenoid-heading">
              <p className="eyebrow">
                Air-core solenoid
              </p>

              <h2 id="solenoid-heading">
                Solenoid inductance formula
              </h2>

              <div className="formula-card">
                <p>
                  Air-core solenoid
                  <span>L = μ₀N²A ÷ ℓ</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>μ₀</strong> is vacuum
                  permeability.
                </li>
                <li>
                  <strong>N</strong> is the number of
                  turns.
                </li>
                <li>
                  <strong>A</strong> is cross-sectional
                  area in square metres.
                </li>
                <li>
                  <strong>ℓ</strong> is coil length in
                  metres.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate inductance from flux linkage
              </h2>

              <p>
                Suppose a coil has{" "}
                <strong>200 turns</strong>, magnetic
                flux of <strong>0.0005 Wb</strong> per
                turn, and current of{" "}
                <strong>2 A</strong>.
              </p>

              <ol>
                <li>Use L = NΦ ÷ I.</li>
                <li>
                  Substitute N = 200, Φ = 0.0005,
                  and I = 2.
                </li>
                <li>
                  L = 200 × 0.0005 ÷ 2.
                </li>
                <li>
                  The inductance is{" "}
                  <strong>0.05 H</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="turns-heading">
              <p className="eyebrow">
                Coil design
              </p>

              <h2 id="turns-heading">
                How turns affect inductance
              </h2>

              <p>
                In an ideal air-core solenoid,
                inductance is proportional to N².
                Doubling the number of turns increases
                inductance by approximately four
                times when area and length remain
                unchanged.
              </p>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                SI unit guidance
              </p>

              <h2 id="units-heading">
                Inductance units
              </h2>

              <ul>
                <li>Inductance: henries (H).</li>
                <li>Magnetic flux: webers (Wb).</li>
                <li>Current: amperes (A).</li>
                <li>Area: square metres (m²).</li>
                <li>Length: metres (m).</li>
                <li>
                  1 millihenry = 1 × 10⁻³ H.
                </li>
                <li>
                  1 microhenry = 1 × 10⁻⁶ H.
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
                  The solenoid model assumes an ideal
                  air core.
                </li>
                <li>
                  Fringing magnetic fields are
                  ignored.
                </li>
                <li>
                  Winding resistance and parasitic
                  capacitance are not included.
                </li>
                <li>
                  Core saturation and hysteresis are
                  not modelled.
                </li>
                <li>
                  All values are treated as positive
                  magnitudes.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="inductance-calculator"
              heading="Continue studying coils and circuits"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Inductance calculator FAQ
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
              <h2>Inductance checklist</h2>

              <ul>
                <li>Select the correct model</li>
                <li>Use flux in webers</li>
                <li>Use current in amperes</li>
                <li>Convert area to square metres</li>
                <li>Use coil length in metres</li>
              </ul>
            </section>

            <section className="sidebar-card">
              <h2>Calculate magnetic field</h2>

              <p>
                Compare inductance calculations with
                magnetic field strength around moving
                charges and straight conductors.
              </p>

              <Link href="/calculators/magnetic-field-calculator">
                Open Magnetic Field Calculator
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
