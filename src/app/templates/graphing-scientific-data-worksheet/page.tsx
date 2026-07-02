import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Graphing Scientific Data Worksheet";
const pageDescription =
  "Use this printable graphing scientific data worksheet to choose graph types, label axes, include units, select scales, plot measurements, and describe experimental trends.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/templates/graphing-scientific-data-worksheet",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/templates/graphing-scientific-data-worksheet",
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
    question: "When should a line graph be used?",
    answer:
      "A line graph is usually suitable when both variables are numerical and the independent variable changes continuously, such as time, temperature, distance, or concentration.",
  },
  {
    question: "When should a bar graph be used?",
    answer:
      "A bar graph is suitable for comparing separate groups, treatments, categories, materials, or experimental conditions.",
  },
  {
    question: "Which variable belongs on the horizontal axis?",
    answer:
      "The independent variable normally belongs on the horizontal x-axis, while the dependent variable belongs on the vertical y-axis.",
  },
  {
    question: "Why must graph axes include units?",
    answer:
      "Units show what each numerical value represents and allow the graph to be interpreted correctly.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/templates/graphing-scientific-data-worksheet",
  ),
  mainEntityOfPage: absoluteUrl(
    "/templates/graphing-scientific-data-worksheet",
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

const graphingSteps = [
  {
    number: "01",
    title: "Identify the variables",
    prompt:
      "Write the independent variable and dependent variable from the investigation.",
    lines: 4,
  },
  {
    number: "02",
    title: "Choose the graph type",
    prompt:
      "Decide whether a line graph, bar graph, scatter graph, or another graph type is most suitable. Explain the choice.",
    lines: 5,
  },
  {
    number: "03",
    title: "Write a descriptive title",
    prompt:
      "Write a title that identifies the relationship or comparison shown by the graph.",
    lines: 3,
  },
  {
    number: "04",
    title: "Label the horizontal axis",
    prompt:
      "Write the independent variable name and its unit.",
    lines: 3,
  },
  {
    number: "05",
    title: "Label the vertical axis",
    prompt:
      "Write the dependent variable name and its unit.",
    lines: 3,
  },
  {
    number: "06",
    title: "Select an appropriate scale",
    prompt:
      "Choose equal intervals that use the graph area effectively and include the complete data range.",
    lines: 5,
  },
  {
    number: "07",
    title: "Plot the data",
    prompt:
      "Plot each value accurately. Use points, bars, error bars, or a line of best fit when appropriate.",
    lines: 12,
  },
  {
    number: "08",
    title: "Describe the main trend",
    prompt:
      "State whether the dependent variable increases, decreases, remains constant, or shows another pattern.",
    lines: 6,
  },
  {
    number: "09",
    title: "Identify anomalies",
    prompt:
      "Record any data point that differs substantially from the general pattern.",
    lines: 5,
  },
  {
    number: "10",
    title: "Write an evidence-based conclusion",
    prompt:
      "Use values from the graph to answer the research question.",
    lines: 7,
  },
] as const;

export default function GraphingScientificDataWorksheetPage() {
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
                Graphing Scientific Data Worksheet
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Printable data worksheet</p>
            <h1>Graphing Scientific Data Worksheet</h1>
            <p>
              Practice selecting a graph type, labeling variables and
              units, choosing a suitable scale, plotting measurements,
              identifying trends, and writing evidence-based
              conclusions.
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
                How to complete the graphing worksheet
              </h2>

              <ul className="article-list">
                <li>Review the complete data table first.</li>
                <li>Identify the independent and dependent variables.</li>
                <li>Select the graph type that matches the data.</li>
                <li>Include variable names and units on both axes.</li>
                <li>Use equal scale intervals.</li>
                <li>Plot every point or category accurately.</li>
                <li>Describe patterns using numerical evidence.</li>
              </ul>
            </section>

            <section aria-labelledby="graph-types-heading">
              <p className="eyebrow">Graph selection</p>
              <h2 id="graph-types-heading">
                Choose a graph type that matches the data
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Line graph
                  </p>
                  <h3>Continuous numerical data</h3>
                  <p>
                    Use when showing change across time,
                    temperature, concentration, distance, or another
                    continuous independent variable.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Bar graph
                  </p>
                  <h3>Separate groups or categories</h3>
                  <p>
                    Use when comparing materials, treatments,
                    organisms, experimental groups, or categories.
                  </p>
                </article>
              </div>
            </section>

            <section
              aria-labelledby="student-details-heading"
              className="template-print-section"
            >
              <p className="eyebrow">Student information</p>
              <h2 id="student-details-heading">
                Worksheet details
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
                  <strong>Class or group</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>

                <div>
                  <strong>Date</strong>
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
              </div>
            </section>

            <section aria-labelledby="worksheet-heading">
              <p className="eyebrow">Graphing activity</p>
              <h2 id="worksheet-heading">
                Scientific data graphing worksheet
              </h2>

              <div className="report-format-list">
                {graphingSteps.map((step) => (
                  <section
                    className="report-format-card template-print-section"
                    key={step.number}
                    aria-labelledby={`graphing-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`graphing-step-${step.number}`}>
                        {step.title}
                      </h3>

                      <p>{step.prompt}</p>

                      <div
                        className="template-writing-area"
                        role="group"
                        aria-label={`${step.title} writing area`}
                      >
                        {Array.from({
                          length: step.lines,
                        }).map((_, index) => (
                          <span key={index} />
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="checklist-heading">
              <p className="eyebrow">Final review</p>
              <h2 id="checklist-heading">
                Scientific graph checklist
              </h2>

              <ul className="article-list">
                <li>The graph type matches the data.</li>
                <li>The title clearly describes the graph.</li>
                <li>The independent variable is on the x-axis.</li>
                <li>The dependent variable is on the y-axis.</li>
                <li>Both axes include units where required.</li>
                <li>The scale uses equal intervals.</li>
                <li>All points or bars are plotted accurately.</li>
                <li>Trends and anomalies are described.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Prepare and analyze scientific data
              </h2>

              <p>
                Record measurements with the{" "}
                <Link
                  className="article-inline-link"
                  href="/templates/data-table-template"
                >
                  Scientific Data Table Template
                </Link>
                , review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>
                , and interpret patterns using the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/analyze-experimental-results"
                >
                  Experimental Results Analysis Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Scientific graphing worksheet FAQ
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
                Graph checklist
              </p>
              <h2>Build a clear scientific graph</h2>

              <ol>
                <li>Choose graph type</li>
                <li>Write graph title</li>
                <li>Label x-axis</li>
                <li>Label y-axis</li>
                <li>Add units</li>
                <li>Select scale</li>
                <li>Plot values</li>
                <li>Describe trend</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Supporting guide
              </p>
              <h2>Review scientific tables and graphs</h2>

              <Link
                className="article-inline-link"
                href="/lab-reports/tables-and-graphs"
              >
                Open Tables and Graphs Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
