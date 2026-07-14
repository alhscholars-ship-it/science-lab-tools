import type { Metadata } from "next";
import Link from "next/link";

import { ProjectileMotionCalculator } from "@/components/calculators/projectile-motion-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Projectile Motion Calculator";

const pageDescription =
  "Calculate projectile range, maximum height, flight time, and motion components from launch speed, angle, and gravity with step-by-step results.";

const pagePath =
  "/calculators/projectile-motion-calculator";

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
    question: "What is projectile motion?",
    answer:
      "Projectile motion describes an object moving horizontally while gravity accelerates it vertically.",
  },
  {
    question: "What launch angle gives the greatest range?",
    answer:
      "In the ideal model with equal launch and landing heights and no air resistance, a 45-degree launch angle gives the greatest range.",
  },
  {
    question: "Does the projectile motion calculator include air resistance?",
    answer:
      "No. It uses the standard ideal projectile model and assumes negligible drag and wind.",
  },
  {
    question: "Why are horizontal and vertical velocity calculated separately?",
    answer:
      "Horizontal velocity remains constant in the ideal model, while vertical velocity changes because of gravitational acceleration.",
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

export default function ProjectileMotionCalculatorPage() {
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
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/calculators">Calculators</Link>
              </li>
              <li aria-current="page">
                Projectile Motion Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Two-dimensional motion tool</p>
            <h1>Projectile Motion Calculator</h1>
            <p>
              Calculate range, maximum height, flight time,
              and velocity components from launch speed,
              launch angle, and gravity.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Projectile motion calculator"
      >
        <Container>
          <ProjectileMotionCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Physics formula</p>
              <h2 id="formula-heading">
                How projectile motion is calculated
              </h2>
              <p>
                Projectile motion combines constant horizontal
                velocity with vertical acceleration caused by
                gravity. The launch velocity is resolved into
                horizontal and vertical components before range,
                height, and flight time are calculated.
              </p>
              <p>
                The standard model assumes negligible air
                resistance and equal launch and landing heights.
                Real-world results can differ when drag, wind,
                or elevation changes are significant.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Projectile launched at 20 m/s and 45 degrees
              </h2>
              <p>
                Consider a projectile launched at 20 m/s at an
                angle of 45° using gravitational acceleration
                g = 9.81 m/s².
              </p>
              <div className="formula-card">
                <p>
                  Range = v² sin(2θ) ÷ g
                </p>
                <p>
                  Range = 20² × sin(90°) ÷ 9.81 ≈ 40.8 m
                </p>
              </div>
              <p>
                The ideal horizontal range is approximately
                40.8 metres. The calculated flight time is about
                2.88 seconds, and the maximum height is about
                10.2 metres.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">Model limitations</p>
              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>
              <p>
                The standard equations assume constant gravity,
                negligible air resistance, no wind, and equal
                launch and landing elevations.
              </p>
              <p>
                Results may be inaccurate for aerodynamic objects,
                long-range trajectories, strong wind, changing
                elevation, spin effects, or launch conditions where
                drag cannot be ignored.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related motion calculators
              </h2>
              <p>
                Study vertical motion independently with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/free-fall-calculator"
                >
                  Free Fall Calculator
                </Link>
                .
              </p>
              <p>
                Calculate changes in velocity with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-calculator"
                >
                  Acceleration Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Common questions</p>
              <h2 id="faq-heading">
                Projectile motion calculator FAQs
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
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
