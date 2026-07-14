import type { Metadata } from "next";
import Link from "next/link";

import { FreeFallCalculator } from "@/components/calculators/free-fall-calculator";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
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

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath,
});

export default function FreeFallCalculatorPage() {
  return (
    <main>
      {[
        webApplicationSchema,
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
          </article>
        </Container>
        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
