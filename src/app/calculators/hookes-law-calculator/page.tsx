import type { Metadata } from "next";
import Link from "next/link";

import {
  HookesLawCalculator,
} from "@/components/calculators/hookes-law-calculator";
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

const pageTitle = "Hooke’s Law Calculator";

const pageDescription =
  "Calculate spring force, spring constant, or extension using Hooke’s law F = kx, with SI units, formula guidance, and clear step-by-step results.";

const pagePath =
  "/calculators/hookes-law-calculator";

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
      "What formula does the Hooke’s law calculator use?",
    answer:
      "It uses F = kx, where force equals the spring constant multiplied by extension.",
  },
  {
    question:
      "What is the SI unit of spring constant?",
    answer:
      "The SI unit of spring constant is newtons per meter, written as N/m.",
  },
  {
    question:
      "What is extension in Hooke’s law?",
    answer:
      "Extension is the change in length from the spring’s equilibrium position.",
  },
  {
    question:
      "When does Hooke’s law stop applying?",
    answer:
      "Hooke’s law applies only while the spring remains within its elastic region and its spring constant stays effectively constant.",
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

export default function HookesLawCalculatorPage() {
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
                Hooke&apos;s Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Spring force tool
            </p>

            <h1>Hooke&apos;s Law Calculator</h1>

            <p>
              Solve force, spring constant, or
              extension using F = kx.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Hooke's law calculator"
      >
        <Container>
          <HookesLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Spring deformation
              </p>

              <h2 id="overview-heading">
                What is Hooke&apos;s law?
              </h2>

              <p>
                Hooke&apos;s law describes the
                relationship between the force applied
                to a spring and the spring&apos;s
                extension or compression.
              </p>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Formula</p>

              <h2 id="formula-heading">
                Hooke&apos;s law formula
              </h2>

              <div className="formula-card">
                <p>
                  Spring Force
                  <span>F = kx</span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  <strong>F</strong> is force in
                  newtons.
                </li>
                <li>
                  <strong>k</strong> is spring
                  constant in newtons per meter.
                </li>
                <li>
                  <strong>x</strong> is extension or
                  compression in meters.
                </li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">
                Worked example
              </p>

              <h2 id="example-heading">
                A 200 N/m spring extends 0.3 m
              </h2>

              <ol className="calculation-steps">
                <li>
                  Write the formula:{" "}
                  <strong>F = kx</strong>.
                </li>
                <li>
                  Substitute the values:{" "}
                  <strong>F = 200 × 0.3</strong>.
                </li>
                <li>
                  Calculate the force:{" "}
                  <strong>F = 60 N</strong>.
                </li>
              </ol>
            </section>

            <section aria-labelledby="rearranged-heading">
              <p className="eyebrow">
                Rearranged equations
              </p>

              <h2 id="rearranged-heading">
                Solve for spring constant or extension
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Spring Constant
                  </p>

                  <h3>k = F ÷ x</h3>

                  <p>
                    Divide force by extension.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Extension
                  </p>

                  <h3>x = F ÷ k</h3>

                  <p>
                    Divide force by spring constant.
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
                Use newtons for force, newtons per
                meter for spring constant, and meters
                for extension.
              </p>
            </section>

            <section aria-labelledby="elastic-limit-heading">
              <p className="eyebrow">
                Elastic behavior
              </p>

              <h2 id="elastic-limit-heading">
                The elastic limit
              </h2>

              <p>
                Hooke&apos;s law is valid only while
                the spring returns to its original
                shape after the force is removed.
                Beyond the elastic limit, force and
                extension may no longer be
                proportional.
              </p>
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
                  Spring constant must be greater than
                  zero.
                </li>
                <li>
                  Extension magnitude must be greater
                  than zero.
                </li>
                <li>
                  Force must be greater than zero when
                  solving for another variable.
                </li>
                <li>
                  The spring is assumed to remain
                  within its elastic region.
                </li>
                <li>
                  The calculator does not automatically
                  convert units.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related tools
              </p>

              <h2 id="related-heading">
                Continue analyzing springs
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/elastic-potential-energy-calculator"
                >
                  Elastic Potential Energy Calculator
                </Link>{" "}
                to calculate energy stored in a spring.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/force-calculator"
                >
                  Force Calculator
                </Link>{" "}
                for force, mass, and acceleration.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="hookes-law-calculator"
              heading="Continue your spring and elasticity analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>

              <h2 id="faq-heading">
                Hooke&apos;s law FAQ
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

              <h2>Hooke&apos;s law checklist</h2>

              <ul>
                <li>Convert extension to meters</li>
                <li>Use spring constant in N/m</li>
                <li>Apply F = kx</li>
                <li>Stay within the elastic range</li>
                <li>Report force in newtons</li>
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
