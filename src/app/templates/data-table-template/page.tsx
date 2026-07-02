import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific Data Table Template";
const pageDescription =
  "Use this printable scientific data table template to record variables, units, repeated trials, averages, qualitative observations, anomalies, and measurement notes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/templates/data-table-template",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/templates/data-table-template"),
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
    question: "What should a scientific data table include?",
    answer:
      "A scientific data table should include a descriptive title, variable names, units, trial columns, measured values, calculated values, and relevant observations.",
  },
  {
    question: "Where should units be written in a data table?",
    answer:
      "Units should normally be included in the column or row headings so they do not need to be repeated in every data cell.",
  },
  {
    question: "Why should repeated trials be recorded separately?",
    answer:
      "Separate trial values reveal variation, make anomalies easier to identify, and allow averages or ranges to be calculated.",
  },
  {
    question: "Should unusual results be removed from the table?",
    answer:
      "No. Unusual results should remain recorded and should be investigated and explained before any justified exclusion.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/templates/data-table-template"),
  mainEntityOfPage: absoluteUrl(
    "/templates/data-table-template",
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

const trialRows = Array.from(
  { length: 10 },
  (_, index) => index + 1,
);

export default function ScientificDataTableTemplatePage() {
  return (
    <main className="template-page">
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
                <Link href="/templates">Templates</Link>
              </li>
              <li aria-current="page">
                Scientific Data Table Template
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Printable data-recording worksheet
            </p>
            <h1>Scientific Data Table Template</h1>
            <p>
              Record measurements and observations consistently
              using clear variables, units, repeated trials,
              calculated values, and anomaly notes.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="instructions-heading">
              <p className="eyebrow">Instructions</p>
              <h2 id="instructions-heading">
                Prepare the table before collecting data
              </h2>

              <ul className="article-list">
                <li>Give the table a descriptive title.</li>
                <li>Identify the independent variable.</li>
                <li>Identify the dependent variable.</li>
                <li>Write units in the headings.</li>
                <li>Record every repeated trial separately.</li>
                <li>Preserve consistent measurement precision.</li>
                <li>Document unusual observations immediately.</li>
              </ul>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="details-heading"
            >
              <p className="eyebrow">Investigation details</p>
              <h2 id="details-heading">
                Data-recording information
              </h2>

              <div className="template-field-grid">
                <div>
                  <strong>Student name</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>

                <div>
                  <strong>Investigation title</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>

                <div>
                  <strong>Independent variable</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>

                <div>
                  <strong>Dependent variable</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="primary-table-heading"
            >
              <p className="eyebrow">Quantitative data</p>
              <h2 id="primary-table-heading">
                Repeated-trials data table
              </h2>

              <div className="scientific-table-wrapper">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        Independent variable
                        <br />
                        (unit: ______)
                      </th>
                      <th scope="col">
                        Trial 1
                        <br />
                        (unit: ______)
                      </th>
                      <th scope="col">
                        Trial 2
                        <br />
                        (unit: ______)
                      </th>
                      <th scope="col">
                        Trial 3
                        <br />
                        (unit: ______)
                      </th>
                      <th scope="col">
                        Mean
                        <br />
                        (unit: ______)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {trialRows.map((row) => (
                      <tr key={row}>
                        <td aria-label={`Row ${row} independent variable`} />
                        <td aria-label={`Row ${row} trial 1`} />
                        <td aria-label={`Row ${row} trial 2`} />
                        <td aria-label={`Row ${row} trial 3`} />
                        <td aria-label={`Row ${row} mean`} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="observation-table-heading"
            >
              <p className="eyebrow">Qualitative evidence</p>
              <h2 id="observation-table-heading">
                Observation record
              </h2>

              <div className="scientific-table-wrapper">
                <table className="scientific-table">
                  <thead>
                    <tr>
                      <th scope="col">Trial or condition</th>
                      <th scope="col">Time</th>
                      <th scope="col">Observation</th>
                      <th scope="col">Possible explanation</th>
                    </tr>
                  </thead>

                  <tbody>
                    {trialRows.slice(0, 8).map((row) => (
                      <tr key={row}>
                        <td aria-label={`Observation row ${row} condition`} />
                        <td aria-label={`Observation row ${row} time`} />
                        <td aria-label={`Observation row ${row} description`} />
                        <td aria-label={`Observation row ${row} explanation`} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="anomaly-heading"
            >
              <p className="eyebrow">Data quality</p>
              <h2 id="anomaly-heading">
                Anomalies and measurement notes
              </h2>

              <p>
                Record unusual values, equipment problems,
                procedural changes, environmental conditions, or
                missing measurements.
              </p>

              <div
                className="template-writing-area"
                        role="group"
                aria-label="Anomalies and measurement notes writing area"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </section>

            <section aria-labelledby="review-heading">
              <p className="eyebrow">Review checklist</p>
              <h2 id="review-heading">
                Check the data table before analysis
              </h2>

              <ul className="article-list">
                <li>The table title describes the investigation.</li>
                <li>All variables are correctly labeled.</li>
                <li>Units appear in the headings.</li>
                <li>Repeated trials are recorded separately.</li>
                <li>Decimal-place precision is consistent.</li>
                <li>Missing data is clearly marked.</li>
                <li>Anomalies remain documented.</li>
                <li>Calculated values can be traced to raw data.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Record and present scientific evidence
              </h2>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/collect-and-record-data"
                >
                  Data Collection Guide
                </Link>
                , present results with the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>
                , and preserve measurement precision using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  Significant Figures Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>
              <h2 id="faq-heading">
                Scientific data table template FAQ
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
                Data table checklist
              </p>
              <h2>Record complete evidence</h2>

              <ol>
                <li>Add a table title</li>
                <li>Label variables</li>
                <li>Include units</li>
                <li>Record each trial</li>
                <li>Calculate the mean</li>
                <li>Note anomalies</li>
                <li>Check precision</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data collection
              </p>
              <h2>Review accurate recording methods</h2>

              <Link
                className="article-inline-link"
                href="/scientific-method/collect-and-record-data"
              >
                Open Data Collection Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
