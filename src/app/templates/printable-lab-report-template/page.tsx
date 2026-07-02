import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Printable Lab Report Template";
const pageDescription =
  "Use this printable lab report template to record a scientific question, hypothesis, variables, materials, procedure, data, results, discussion, and conclusion.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/templates/printable-lab-report-template",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/templates/printable-lab-report-template",
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
    question: "What sections are included in this lab report template?",
    answer:
      "The template includes the title, research question, background, hypothesis, variables, materials, safety, procedure, data, observations, results, discussion, conclusion, and improvements.",
  },
  {
    question: "Can this template be printed?",
    answer:
      "Yes. The layout is structured for classroom, homework, and laboratory use and can be printed from the browser.",
  },
  {
    question: "Can students type directly into this template?",
    answer:
      "The page is primarily designed as a printable worksheet, but students can also copy the section structure into a digital document.",
  },
  {
    question: "Should every section be completed?",
    answer:
      "Complete the sections required by the teacher or investigation. Some simple experiments may not require every optional section.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/templates/printable-lab-report-template",
  ),
  mainEntityOfPage: absoluteUrl(
    "/templates/printable-lab-report-template",
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

const templateSections = [
  {
    number: "01",
    title: "Experiment title",
    prompt:
      "Write a clear title that identifies the main variables or purpose of the investigation.",
    lines: 2,
  },
  {
    number: "02",
    title: "Research question",
    prompt:
      "Write the focused, measurable, and testable question investigated.",
    lines: 3,
  },
  {
    number: "03",
    title: "Scientific background",
    prompt:
      "Summarize the scientific concepts needed to understand the investigation.",
    lines: 6,
  },
  {
    number: "04",
    title: "Hypothesis",
    prompt:
      "Write a testable prediction and include scientific reasoning.",
    lines: 4,
  },
  {
    number: "05",
    title: "Variables",
    prompt:
      "Identify the independent variable, dependent variable, and controlled variables.",
    lines: 6,
  },
  {
    number: "06",
    title: "Materials and equipment",
    prompt:
      "List all equipment, materials, quantities, sizes, and concentrations.",
    lines: 6,
  },
  {
    number: "07",
    title: "Safety precautions",
    prompt:
      "Record hazards, protective equipment, and safe working procedures.",
    lines: 5,
  },
  {
    number: "08",
    title: "Method",
    prompt:
      "Write a numbered procedure detailed enough for another person to repeat.",
    lines: 10,
  },
  {
    number: "09",
    title: "Raw data table",
    prompt:
      "Create a table with clear headings, units, trials, measurements, and observations.",
    lines: 10,
  },
  {
    number: "10",
    title: "Qualitative observations",
    prompt:
      "Record color, texture, appearance, behavior, gas production, or other descriptive evidence.",
    lines: 6,
  },
  {
    number: "11",
    title: "Processed results",
    prompt:
      "Show averages, differences, rates, percentages, or other relevant calculations.",
    lines: 8,
  },
  {
    number: "12",
    title: "Graph",
    prompt:
      "Draw or attach a suitable graph with a title, labeled axes, units, and an appropriate scale.",
    lines: 12,
  },
  {
    number: "13",
    title: "Discussion",
    prompt:
      "Interpret patterns, compare trials, explain anomalies, and connect findings to scientific concepts.",
    lines: 10,
  },
  {
    number: "14",
    title: "Conclusion",
    prompt:
      "Answer the research question, cite evidence, and state whether the hypothesis was supported.",
    lines: 8,
  },
  {
    number: "15",
    title: "Limitations and improvements",
    prompt:
      "Identify important weaknesses and suggest specific improvements.",
    lines: 8,
  },
] as const;

export default function PrintableLabReportTemplatePage() {
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
                Printable Lab Report Template
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Printable science worksheet</p>
            <h1>Printable Lab Report Template</h1>
            <p>
              Organize a complete scientific investigation using a
              structured worksheet for planning, evidence recording,
              analysis, and conclusion writing.
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
                How to use this printable template
              </h2>

              <ul className="article-list">
                <li>
                  Print the page or copy the section structure into a
                  document.
                </li>
                <li>
                  Complete each required section during the
                  investigation.
                </li>
                <li>
                  Record measurements immediately and include units.
                </li>
                <li>
                  Attach additional tables or graphs when required.
                </li>
                <li>
                  Review the final report for clarity and accuracy.
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="student-details-heading"
              className="template-print-section"
            >
              <p className="eyebrow">Student information</p>
              <h2 id="student-details-heading">
                Investigation details
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
                  <strong>Teacher</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="template-heading">
              <p className="eyebrow">Lab report worksheet</p>
              <h2 id="template-heading">
                Complete laboratory report template
              </h2>

              <div className="report-format-list">
                {templateSections.map((section) => (
                  <section
                    className="report-format-card template-print-section"
                    key={section.number}
                    aria-labelledby={`template-section-${section.number}`}
                  >
                    <span className="report-format-card__number">
                      {section.number}
                    </span>

                    <div>
                      <h3
                        id={`template-section-${section.number}`}
                      >
                        {section.title}
                      </h3>

                      <p>{section.prompt}</p>

                      <div
                        className="template-writing-area"
                        role="group"
                        aria-label={`${section.title} writing area`}
                      >
                        {Array.from({
                          length: section.lines,
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
                Lab report submission checklist
              </h2>

              <ul className="article-list">
                <li>The research question is clear and testable.</li>
                <li>The hypothesis includes scientific reasoning.</li>
                <li>Variables and controls are identified.</li>
                <li>The procedure can be repeated.</li>
                <li>Tables and graphs include labels and units.</li>
                <li>Results are analyzed rather than only listed.</li>
                <li>The conclusion uses numerical evidence.</li>
                <li>Limitations and improvements are specific.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Complete the report with supporting guides
              </h2>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/how-to-write-a-lab-report"
                >
                  How to Write a Lab Report Guide
                </Link>
                , check the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-format"
                >
                  Lab Report Format
                </Link>
                , and prepare evidence using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Printable lab report template FAQ
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
                Report sections
              </p>
              <h2>Complete investigation record</h2>

              <ol>
                <li>Question</li>
                <li>Background</li>
                <li>Hypothesis</li>
                <li>Variables</li>
                <li>Materials</li>
                <li>Method</li>
                <li>Data</li>
                <li>Results</li>
                <li>Discussion</li>
                <li>Conclusion</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Writing guidance
              </p>
              <h2>Review the complete report structure</h2>

              <Link
                className="article-inline-link"
                href="/lab-reports/lab-report-template"
              >
                Open Lab Report Template Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
