import type { Metadata } from "next";
import Link from "next/link";

import { AverageVelocityCalculator } from "@/components/calculators/average-velocity-calculator";
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

const pageTitle = "Average Velocity Calculator";

const pageDescription =
  "Calculate average velocity, displacement, or elapsed time using v̄ = Δx ÷ Δt, with signed motion values, unit guidance, and clear working steps.";

const pagePath =
  "/calculators/average-velocity-calculator";

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
      "What formula does the average velocity calculator use?",
    answer:
      "It uses average velocity equals displacement divided by elapsed time: v̄ = Δx ÷ Δt.",
  },
  {
    question:
      "What is the difference between average velocity and average speed?",
    answer:
      "Average velocity uses displacement and includes direction, while average speed uses total distance travelled and has no direction.",
  },
  {
    question:
      "Can average velocity be negative?",
    answer:
      "Yes. A negative average velocity means the net displacement is in the selected negative direction.",
  },
  {
    question:
      "Can average velocity be zero?",
    answer:
      "Yes. Average velocity is zero when final position equals initial position, even if the object travelled some distance.",
  },
] as const;

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

export default function AverageVelocityCalculatorPage() {
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
                Average Velocity Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Linear motion tool
            </p>

            <h1>Average Velocity Calculator</h1>

            <p>
              Calculate average velocity, displacement,
              or elapsed time from two known motion
              values.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Average velocity calculator"
      >
        <Container>
          <AverageVelocityCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Motion analysis
              </p>

              <h2 id="overview-heading">
                What is average velocity?
              </h2>

              <p>
                Average velocity describes how quickly
                an object changes position over an
                elapsed time interval. It is a vector
                quantity, so its sign represents
                direction.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Average velocity formula
              </h2>

              <div className="formula-card">
                <p>
                  Average velocity
                  <span>v̄ = Δx ÷ Δt</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>v̄</strong> is average velocity.
                </li>
                <li>
                  <strong>Δx</strong> is displacement.
                </li>
                <li>
                  <strong>Δt</strong> is elapsed time.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                Calculate velocity from displacement
              </h2>

              <ol className="calculation-steps">
                <li>
                  Displacement is
                  <strong> 120 metres</strong>.
                </li>
                <li>
                  Elapsed time is
                  <strong> 10 seconds</strong>.
                </li>
                <li>
                  Apply
                  <strong> v̄ = 120 ÷ 10</strong>.
                </li>
                <li>
                  Average velocity is
                  <strong> 12 m/s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="speed-heading">
              <p className="eyebrow">
                Important distinction
              </p>

              <h2 id="speed-heading">
                Average velocity versus average speed
              </h2>

              <p>
                Average velocity uses net displacement,
                while average speed uses total distance.
                An object can return to its starting
                position and have zero average velocity
                even though its average speed is greater
                than zero.
              </p>
            </section>

            <section aria-labelledby="direction-heading">
              <p className="eyebrow">
                Direction
              </p>

              <h2 id="direction-heading">
                Why average velocity can be negative
              </h2>

              <p>
                The sign depends on the coordinate
                direction selected for the motion. A
                negative value indicates that net
                displacement occurred in the negative
                direction.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Applications
              </p>

              <h2 id="applications-heading">
                Where average velocity is used
              </h2>

              <ul className="article-list">
                <li>Linear motion experiments.</li>
                <li>Position-time graph analysis.</li>
                <li>Vehicle and transport studies.</li>
                <li>Projectile and free-fall problems.</li>
                <li>Introductory kinematics calculations.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue your motion analysis
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>{" "}
                to calculate changes in velocity over
                time.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/rate-of-change-calculator"
                >
                  Rate of Change Calculator
                </Link>{" "}
                for general change-over-time analysis.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">Interpretation limits</p>
              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>
              <p>
                Average velocity is based on net displacement divided
                by elapsed time. It does not describe the complete
                path, instantaneous velocity, acceleration, or
                variations that occur during the interval.
              </p>
              <p>
                Direction must be represented consistently with signs
                or coordinates. A round trip can have zero average
                velocity even when the object travelled a substantial
                total distance.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="average-velocity-calculator"
              heading="Continue your linear motion analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Average velocity FAQ
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

              <h2>Velocity checklist</h2>

              <ul>
                <li>Use displacement, not distance</li>
                <li>Use positive elapsed time</li>
                <li>Include direction through sign</li>
                <li>Apply v̄ = Δx ÷ Δt</li>
                <li>Report velocity in m/s</li>
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
