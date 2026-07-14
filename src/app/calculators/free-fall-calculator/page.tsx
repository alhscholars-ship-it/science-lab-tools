import type { Metadata } from "next";
import Link from "next/link";

import { FreeFallCalculator } from "@/components/calculators/free-fall-calculator";
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

const pageTitle = "Free Fall Calculator";

const pageDescription =
  "Calculate free-fall time, falling distance, final velocity, or gravitational acceleration with tested equations, units, and clear step-by-step results.";

const pagePath =
  "/calculators/free-fall-calculator";

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
    question: "What is free fall?",
    answer:
      "Free fall is vertical motion in which gravity is the only significant force acting on an object.",
  },
  {
    question: "What value of gravity should I use near Earth?",
    answer:
      "A standard value of 9.81 metres per second squared is commonly used for calculations near Earth’s surface.",
  },
  {
    question: "Does the free fall calculator include air resistance?",
    answer:
      "No. It uses an idealized model that ignores air resistance and assumes constant gravitational acceleration.",
  },
  {
    question: "Can I solve for falling time or final velocity?",
    answer:
      "Yes. The calculator can solve for time, falling distance, final velocity, or gravitational acceleration when enough values are provided.",
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

export default function FreeFallCalculatorPage() {
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
              <li aria-current="page">Free Fall Calculator</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Gravity and motion tool</p>
            <h1>Free Fall Calculator</h1>
            <p>
              Calculate falling distance, final velocity, time,
              or gravitational acceleration using standard
              free-fall equations.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Free fall calculator"
      >
        <Container>
          <FreeFallCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Physics formula</p>
              <h2 id="formula-heading">
                How free-fall calculations work
              </h2>
              <p>
                Free fall describes vertical motion when gravity
                is the only significant force acting on an object.
                Near Earth, gravitational acceleration is commonly
                approximated as 9.81 metres per second squared.
              </p>
              <p>
                For an object released from rest, distance can be
                calculated with h = ½gt² and final velocity with
                v = gt. The correct equation depends on the value
                being solved.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Free-fall distance after three seconds
              </h2>
              <p>
                Suppose an object is released from rest and falls
                for 3 seconds near Earth, where gravitational
                acceleration is 9.81 m/s².
              </p>
              <div className="formula-card">
                <p>h = ½gt²</p>
                <p>
                  h = ½ × 9.81 × 3² = 44.145 m
                </p>
              </div>
              <p>
                The object falls approximately 44.1 metres. Its
                final velocity is v = gt = 9.81 × 3, or about
                29.4 m/s downward.
              </p>
            </section>

            <section aria-labelledby="assumptions-heading">
              <p className="eyebrow">Model limitations</p>
              <h2 id="assumptions-heading">
                Assumptions and limitations
              </h2>
              <p>
                The calculator assumes constant gravitational
                acceleration, negligible air resistance, and
                straight vertical motion. These assumptions work
                well for short falls near Earth’s surface.
              </p>
              <p>
                Results may differ for objects with substantial
                drag, very high-altitude falls, changing gravity,
                powered motion, or situations where another force
                is significant.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <h2 id="related-heading">
                Related gravity calculators
              </h2>
              <p>
                Calculate the local gravitational field with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/acceleration-due-to-gravity-calculator"
                >
                  Acceleration Due to Gravity Calculator
                </Link>
                .
              </p>
              <p>
                Analyze launched objects with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/projectile-motion-calculator"
                >
                  Projectile Motion Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Common questions</p>
              <h2 id="faq-heading">
                Free fall calculator FAQs
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
