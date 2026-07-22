import type { Metadata } from "next";
import Link from "next/link";

import {
  ImpulseCalculator,
} from "@/components/calculators/impulse-calculator";
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

const pageTitle = "Impulse Calculator";

const pageDescription =
  "Calculate impulse, force, or time interval using J = FΔt, with momentum-change guidance, supported units, and clear step-by-step results.";

const pagePath =
  "/calculators/impulse-calculator";

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
      "What formula does the impulse calculator use?",
    answer:
      "It uses J = FΔt, where impulse equals average force multiplied by the time interval.",
  },
  {
    question:
      "What is the SI unit of impulse?",
    answer:
      "The SI unit of impulse is the newton-second, written as N·s. It is equivalent to kilogram-meter per second.",
  },
  {
    question:
      "How is impulse related to momentum?",
    answer:
      "Impulse equals the change in momentum of an object, so J = Δp.",
  },
  {
    question:
      "How do you calculate force from impulse?",
    answer:
      "Divide impulse by the time interval using F = J ÷ Δt.",
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

export default function ImpulseCalculatorPage() {
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
                Impulse Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Force over time
            </p>

            <h1>Impulse Calculator</h1>

            <p>
              Solve impulse, force, or time interval
              using J = FΔt.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Impulse calculator"
      >
        <Container>
          <ImpulseCalculator />
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
                What is impulse?
              </h2>

              <p>
                Impulse measures the effect of a force
                acting over a period of time. A larger
                force or a longer time interval
                produces a greater impulse.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Impulse formula
              </h2>

              <div className="formula-card">
                <p>
                  Impulse
                  <span>J = FΔt</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>J</strong> is impulse in
                  newton-seconds.
                </li>
                <li>
                  <strong>F</strong> is average force
                  in newtons.
                </li>
                <li>
                  <strong>Δt</strong> is the time
                  interval in seconds.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 120 N force acts for 0.5 s
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>J = FΔt</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>J = 120 × 0.5</strong>.
                </li>
                <li>
                  Calculate the impulse:{" "}
                  <strong>J = 60 N·s</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="momentum-heading">
              <p className="eyebrow">
                Momentum relationship
              </p>

              <h2 id="momentum-heading">
                Impulse equals change in momentum
              </h2>

              <div className="formula-card">
                <p>
                  Impulse-Momentum Theorem
                  <span>J = Δp</span>
                </p>
              </div>

              <p>
                An impulse changes an object&apos;s
                momentum. The same impulse can result
                from a large force acting briefly or
                a smaller force acting for longer.
              </p>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for force or time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Force
                  </p>

                  <h3>F = J ÷ Δt</h3>

                  <p>
                    Divide impulse by the time
                    interval.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Time Interval
                  </p>

                  <h3>Δt = J ÷ F</h3>

                  <p>
                    Divide impulse by force.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units</p>

              <h2 id="units-heading">
                Standard SI units
              </h2>

              <p>
                Use newton-seconds for impulse,
                newtons for force, and seconds for
                time. One newton-second is equivalent
                to one kilogram-meter per second.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Real-world applications
              </p>

              <h2 id="applications-heading">
                Where impulse calculations are used
              </h2>

              <ul className="article-list">
                <li>
                  Collisions and impact experiments.
                </li>
                <li>
                  Sports involving balls, bats, or
                  rackets.
                </li>
                <li>
                  Vehicle safety systems and
                  crumple zones.
                </li>
                <li>
                  Laboratory momentum investigations.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Calculation limits
              </p>

              <h2 id="limitations-heading">
                Important assumptions
              </h2>

              <ul className="article-list">
                <li>
                  Impulse, force, and time interval
                  must be greater than zero.
                </li>
                <li>
                  The force value represents the
                  average force over the interval.
                </li>
                <li>
                  Time should be entered in seconds.
                </li>
                <li>
                  The calculator uses magnitudes and
                  does not represent vector direction.
                </li>
                <li>
                  Units are not converted
                  automatically.
                </li>
              </ul>
            </section>

            <RelatedCalculators
              currentSlug="impulse-calculator"
              heading="Continue your impulse and momentum analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Impulse calculator FAQ
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

              <h2>Impulse checklist</h2>

              <ul>
                <li>Use force in newtons</li>
                <li>Use time in seconds</li>
                <li>Apply J = FΔt</li>
                <li>Report impulse in N·s</li>
                <li>Use average force when needed</li>
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
