import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Significant Figures in Lab Reports";
const pageDescription =
  "Learn how to use significant figures, decimal places, measurement precision, scientific notation, and rounding correctly in laboratory reports.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/lab-reports/significant-figures-in-lab-reports",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/lab-reports/significant-figures-in-lab-reports",
    ),
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
    question: "Why are significant figures used in lab reports?",
    answer:
      "Significant figures communicate measurement precision and prevent calculated results from appearing more exact than the experimental data support.",
  },
  {
    question: "Are significant figures and decimal places the same?",
    answer:
      "No. Significant figures count meaningful digits from the first nonzero digit, while decimal places count digits appearing after the decimal point.",
  },
  {
    question: "When should a calculated result be rounded?",
    answer:
      "Keep extra digits during intermediate calculations and round the final reported result according to the least precise relevant measurement.",
  },
  {
    question: "Are exact counted values limited by significant figures?",
    answer:
      "Exact counts and defined conversion factors generally do not limit significant figures because they are not measured values with experimental uncertainty.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/lab-reports/significant-figures-in-lab-reports",
  ),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/significant-figures-in-lab-reports",
  ),
  author: {
    "@type": "Organization",
    name: siteConfig.name,
  },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function SignificantFiguresPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/lab-reports">Lab Reports</Link>
              </li>
              <li aria-current="page">
                Significant Figures
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Data reporting guide</p>
            <h1>Significant Figures in Lab Reports</h1>
            <p>
              Report measurements and calculated results with
              precision that accurately reflects the quality of the
              experimental data.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="meaning-heading">
              <p className="eyebrow">Core concept</p>
              <h2 id="meaning-heading">
                What are significant figures?
              </h2>

              <p>
                Significant figures are the meaningful digits in a
                measured or calculated value. They communicate the
                precision of the measurement and prevent a result from
                appearing more exact than the equipment and method
                justify.
              </p>

              <p>
                For example, a balance reading of 12.40 g contains
                four significant figures. The final zero is meaningful
                because it indicates the precision of the recorded
                measurement.
              </p>
            </section>

            <section aria-labelledby="rules-heading">
              <p className="eyebrow">Identification rules</p>
              <h2 id="rules-heading">
                How to count significant figures
              </h2>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">01</span>
                  <div>
                    <h3>Nonzero digits</h3>
                    <p>
                      Every nonzero digit is significant. The value
                      347 contains three significant figures.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">02</span>
                  <div>
                    <h3>Zeros between nonzero digits</h3>
                    <p>
                      Captive zeros are significant. The value 2.07
                      contains three significant figures.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">03</span>
                  <div>
                    <h3>Leading zeros</h3>
                    <p>
                      Zeros before the first nonzero digit are not
                      significant. The value 0.0045 contains two
                      significant figures.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">04</span>
                  <div>
                    <h3>Trailing decimal zeros</h3>
                    <p>
                      Zeros at the end of a decimal value are
                      significant. The value 6.200 contains four
                      significant figures.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">05</span>
                  <div>
                    <h3>Trailing whole-number zeros</h3>
                    <p>
                      Their meaning may be ambiguous unless scientific
                      notation or a decimal point clarifies precision.
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="decimal-heading">
              <p className="eyebrow">Important distinction</p>
              <h2 id="decimal-heading">
                Significant figures versus decimal places
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Significant figures
                  </p>
                  <h3>Meaningful digits</h3>
                  <p>
                    In 0.00450, the digits 4, 5, and the final zero are
                    significant, giving three significant figures.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Decimal places
                  </p>
                  <h3>Digits after the decimal</h3>
                  <p>
                    The value 0.00450 contains five decimal places,
                    even though it has three significant figures.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="equipment-heading">
              <p className="eyebrow">Measurement precision</p>
              <h2 id="equipment-heading">
                Record all justified instrument digits
              </h2>

              <p>
                A measured value should reflect the resolution of the
                instrument. Do not add unsupported digits, but do not
                remove meaningful zeros that communicate measurement
                precision.
              </p>

              <div className="formula-card">
                <p>
                  Example
                  <span>
                    A digital balance displaying 8.50 g should normally
                    be recorded as 8.50 g, not 8.5 g.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="multiplication-heading">
              <p className="eyebrow">Calculations</p>
              <h2 id="multiplication-heading">
                Multiplication and division rule
              </h2>

              <p>
                For multiplication and division, the final result
                should generally contain the same number of
                significant figures as the measured value with the
                fewest significant figures.
              </p>

              <div className="formula-card">
                <p>
                  Example
                  <span>
                    4.2 × 3.15 = 13.23, reported as 13 because 4.2 has
                    two significant figures.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="addition-heading">
              <p className="eyebrow">Calculations</p>
              <h2 id="addition-heading">
                Addition and subtraction rule
              </h2>

              <p>
                For addition and subtraction, round according to the
                least precise decimal position rather than the fewest
                total significant figures.
              </p>

              <div className="formula-card">
                <p>
                  Example
                  <span>
                    12.11 + 0.3 = 12.41, reported as 12.4 because 0.3
                    is measured to one decimal place.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="rounding-heading">
              <p className="eyebrow">Rounding</p>
              <h2 id="rounding-heading">
                Round final results, not every intermediate step
              </h2>

              <p>
                Keep additional digits during intermediate
                calculations. Repeated early rounding can accumulate
                and produce a less accurate final result.
              </p>

              <ol className="calculation-steps">
                <li>Enter the original measured values.</li>
                <li>Complete intermediate calculations.</li>
                <li>Keep unrounded calculator values.</li>
                <li>Determine the required final precision.</li>
                <li>Round only the reported final result.</li>
              </ol>
            </section>

            <section aria-labelledby="notation-heading">
              <p className="eyebrow">Scientific notation</p>
              <h2 id="notation-heading">
                Use scientific notation to remove ambiguity
              </h2>

              <p>
                Scientific notation makes the number of significant
                figures explicit, especially when a whole number ends
                in zeros.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Ambiguous
                  </p>
                  <h3>1500</h3>
                  <p>
                    The intended precision is unclear without
                    additional context.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Explicit
                  </p>
                  <h3>1.50 × 10³</h3>
                  <p>
                    This notation clearly communicates three
                    significant figures.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="exact-heading">
              <p className="eyebrow">Exact values</p>
              <h2 id="exact-heading">
                Distinguish measurements from exact quantities
              </h2>

              <p>
                Counted objects and defined relationships are usually
                exact. For example, five test tubes is an exact count,
                and a defined conversion such as 1 metre equaling
                100 centimetres does not normally limit the precision
                of a calculation.
              </p>
            </section>

            <section aria-labelledby="report-heading">
              <p className="eyebrow">Lab report application</p>
              <h2 id="report-heading">
                Maintain precision throughout the report
              </h2>

              <ul className="article-list">
                <li>
                  Record raw measurements at instrument precision.
                </li>
                <li>
                  Use consistent decimal places within data columns.
                </li>
                <li>
                  Retain extra digits during calculations.
                </li>
                <li>
                  Round calculated results appropriately.
                </li>
                <li>
                  Include units with every reported measurement.
                </li>
                <li>
                  Use scientific notation for very large or small
                  values.
                </li>
                <li>
                  Avoid mixing differently rounded versions of the
                  same result.
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Significant-figure problems to avoid
              </h2>

              <ul className="article-list">
                <li>Adding digits that the instrument did not measure.</li>
                <li>Removing meaningful trailing zeros.</li>
                <li>Confusing significant figures with decimal places.</li>
                <li>Rounding every intermediate calculation.</li>
                <li>Using inconsistent precision in a table column.</li>
                <li>Reporting calculator output without evaluation.</li>
                <li>Leaving units out of calculated results.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Apply precision to experimental results
              </h2>

              <p>
                Review how measurements and calculations should be
                presented in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-results"
                >
                  Lab Report Results guide
                </Link>
                , or review the full structure in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-format"
                >
                  Lab Report Format guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Significant figures FAQ
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
                Precision checklist
              </p>
              <h2>Before reporting results</h2>
              <ul>
                <li>Check instrument resolution</li>
                <li>Preserve meaningful zeros</li>
                <li>Include measurement units</li>
                <li>Keep intermediate digits</li>
                <li>Round final results correctly</li>
                <li>Use consistent table precision</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Calculation tool
              </p>
              <h2>Calculate percentage error</h2>
              <Link
                className="article-inline-link"
                href="/calculators/percent-error-calculator"
              >
                Open Percent Error Calculator
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
