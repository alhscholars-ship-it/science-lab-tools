import Link from "next/link";
import type { Metadata } from "next";

import { AccelerationDueToGravityCalculator } from "@/components/calculators/acceleration-due-to-gravity-calculator";
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

const pageTitle =
  "Acceleration Due to Gravity Calculator";

const pageDescription =
  "Calculate gravitational acceleration from the mass and radius of a planet or celestial body using g = GM / r².";

const pagePath =
  "/calculators/acceleration-due-to-gravity-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
};

const faqItems = [
  {
    question:
      "What formula calculates acceleration due to gravity?",
    answer:
      "The calculator uses g = GM / r², where G is the universal gravitational constant, M is the mass of the celestial body, and r is the distance from its center.",
  },
  {
    question:
      "What is the acceleration due to gravity on Earth?",
    answer:
      "The standard value near Earth's surface is approximately 9.81 metres per second squared, although the exact value varies slightly with altitude and location.",
  },
  {
    question:
      "Why does gravity decrease with distance?",
    answer:
      "Gravitational acceleration follows an inverse-square relationship, so increasing the distance from the centre reduces gravity in proportion to the square of that distance.",
  },
  {
    question:
      "Can this calculator be used for other planets?",
    answer:
      "Yes. Enter the mass and radius of any planet, moon, star, or other spherical celestial body to estimate its surface gravitational acceleration.",
  },
];

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const faqSchema = createFaqSchema(faqItems);

const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath,
});

export default function AccelerationDueToGravityCalculatorPage() {
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
                Acceleration Due to Gravity Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Gravitational physics tool
            </p>

            <h1>
              Acceleration Due to Gravity Calculator
            </h1>

            <p>
              Calculate gravitational acceleration from
              planetary mass and radius using g = GM / r².
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Acceleration due to gravity calculator"
      >
        <Container>
          <AccelerationDueToGravityCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Physics overview
              </p>

              <h2 id="overview-heading">
                What is acceleration due to gravity?
              </h2>

              <p>
                Acceleration due to gravity is the
                acceleration experienced by an object
                because of a body&apos;s gravitational field.
                Near Earth&apos;s surface, its magnitude is
                approximately 9.81 m/s².
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Gravitational acceleration formula
              </h2>

              <div className="formula-card">
                <p>
                  Gravity
                  <span>g = GM / r²</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>g</strong> is gravitational
                  acceleration in m/s².
                </li>
                <li>
                  <strong>G</strong> is the universal
                  gravitational constant.
                </li>
                <li>
                  <strong>M</strong> is the mass of the
                  celestial body in kilograms.
                </li>
                <li>
                  <strong>r</strong> is distance from the
                  body&apos;s centre in metres.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate gravity near Earth&apos;s surface
              </h2>

              <ol className="calculation-steps">
                <li>
                  Use Earth&apos;s mass:
                  <strong> 5.972 × 10²⁴ kg</strong>.
                </li>
                <li>
                  Use Earth&apos;s mean radius:
                  <strong> 6.371 × 10⁶ m</strong>.
                </li>
                <li>
                  Apply <strong>g = GM / r²</strong>.
                </li>
                <li>
                  The result is approximately
                  <strong> 9.82 m/s²</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="distance-heading">
              <p className="eyebrow">
                Distance effect
              </p>

              <h2 id="distance-heading">
                Why gravity changes with altitude
              </h2>

              <p>
                Gravity becomes weaker as distance from a
                planet&apos;s centre increases. Because radius
                is squared in the denominator, even modest
                increases in distance reduce gravitational
                acceleration.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where this calculation is used
              </h2>

              <ul className="article-list">
                <li>Planetary science calculations.</li>
                <li>Satellite and orbital analysis.</li>
                <li>Free-fall and projectile problems.</li>
                <li>Spacecraft mission planning.</li>
                <li>Comparing gravity on planets and moons.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your gravity analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/free-fall-calculator"
                >
                  Free Fall Calculator
                </Link>{" "}
                to calculate falling distance, time, and
                final velocity.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/gravitational-potential-energy-calculator"
                >
                  Gravitational Potential Energy Calculator
                </Link>{" "}
                to calculate energy associated with height.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">Model limits</p>
              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>
              <p>
                The calculation assumes a spherical gravitating body
                and uses distance from its center. It also treats the
                body mass as fixed and ignores local variations caused
                by rotation, altitude, terrain, and density differences.
              </p>
              <p>
                The result is an ideal gravitational-field estimate.
                It may differ from locally measured acceleration and
                is not suitable for relativistic conditions or
                locations inside a nonuniform body.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="acceleration-due-to-gravity-calculator"
              heading="Continue your gravity analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Acceleration due to gravity FAQ
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
            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Quick reference
              </p>

              <h2>Gravity checklist</h2>

              <ul>
                <li>Enter mass in kilograms</li>
                <li>Enter radius in metres</li>
                <li>Use distance from the centre</li>
                <li>Apply g = GM / r²</li>
                <li>Report acceleration in m/s²</li>
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
