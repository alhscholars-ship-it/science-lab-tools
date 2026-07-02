import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific Method Worksheet";
const pageDescription =
  "Use this printable scientific method worksheet to record observations, questions, hypotheses, variables, procedures, data, results, and conclusions.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/templates/scientific-method-worksheet",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/templates/scientific-method-worksheet",
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
    question:
      "What steps are included in this scientific method worksheet?",
    answer:
      "The worksheet includes observation, research question, background research, hypothesis, variables, materials, procedure, data collection, analysis, conclusion, and reflection.",
  },
  {
    question: "Can this worksheet be printed?",
    answer:
      "Yes. The page includes structured writing areas designed for classroom, homework, and laboratory printing.",
  },
  {
    question: "What age group can use this worksheet?",
    answer:
      "The structure can be used by middle-school, secondary-school, and introductory science students, with teacher guidance where needed.",
  },
  {
    question:
      "Does a scientific conclusion prove the hypothesis?",
    answer:
      "No. A conclusion explains whether the collected evidence supports, partially supports, or does not support the hypothesis under the tested conditions.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/templates/scientific-method-worksheet",
  ),
  mainEntityOfPage: absoluteUrl(
    "/templates/scientific-method-worksheet",
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

const worksheetSections = [
  {
    number: "01",
    title: "Observation",
    prompt:
      "Describe the event, pattern, problem, or phenomenon that started the investigation.",
    lines: 5,
  },
  {
    number: "02",
    title: "Scientific question",
    prompt:
      "Write a focused, measurable, and testable research question.",
    lines: 4,
  },
  {
    number: "03",
    title: "Background research",
    prompt:
      "Record relevant scientific facts, concepts, definitions, and previous evidence.",
    lines: 7,
  },
  {
    number: "04",
    title: "Hypothesis",
    prompt:
      "Write an if–then prediction and explain the scientific reasoning.",
    lines: 5,
  },
  {
    number: "05",
    title: "Independent variable",
    prompt:
      "Identify the factor that will be deliberately changed.",
    lines: 3,
  },
  {
    number: "06",
    title: "Dependent variable",
    prompt:
      "Identify the response that will be measured or observed.",
    lines: 3,
  },
  {
    number: "07",
    title: "Controlled variables",
    prompt:
      "List the conditions that must remain constant during every trial.",
    lines: 6,
  },
  {
    number: "08",
    title: "Control and experimental groups",
    prompt:
      "Describe the baseline group and the group receiving the tested condition.",
    lines: 5,
  },
  {
    number: "09",
    title: "Materials and equipment",
    prompt:
      "List the materials, instruments, quantities, sizes, and concentrations required.",
    lines: 6,
  },
  {
    number: "10",
    title: "Safety precautions",
    prompt:
      "Identify hazards, protective equipment, and safe working procedures.",
    lines: 5,
  },
  {
    number: "11",
    title: "Experimental procedure",
    prompt:
      "Write numbered steps that another student could follow and repeat.",
    lines: 10,
  },
  {
    number: "12",
    title: "Data collection plan",
    prompt:
      "State what will be measured, which units will be used, and how many trials will be completed.",
    lines: 6,
  },
  {
    number: "13",
    title: "Results and observations",
    prompt:
      "Record numerical measurements, qualitative observations, patterns, and unusual results.",
    lines: 10,
  },
  {
    number: "14",
    title: "Data analysis",
    prompt:
      "Describe averages, trends, comparisons, variation, anomalies, or calculated values.",
    lines: 8,
  },
  {
    number: "15",
    title: "Conclusion",
    prompt:
      "Answer the research question using evidence and state whether the hypothesis was supported.",
    lines: 8,
  },
  {
    number: "16",
    title: "Limitations and improvements",
    prompt:
      "Identify weaknesses and suggest specific changes that would improve the investigation.",
    lines: 7,
  },
  {
    number: "17",
    title: "Further question",
    prompt:
      "Write one new scientific question suggested by the results.",
    lines: 4,
  },
] as const;

export default function ScientificMethodWorksheetPage() {
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
                Scientific Method Worksheet
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Printable investigation worksheet
            </p>
            <h1>Scientific Method Worksheet</h1>
            <p>
              Plan and document a complete scientific investigation
              from the first observation through experimental
              analysis, conclusion, and reflection.
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
                How to use the worksheet
              </h2>

              <ul className="article-list">
                <li>
                  Complete the sections in investigation order.
                </li>
                <li>
                  Use measurable variables and consistent units.
                </li>
                <li>
                  Record evidence during the experiment, not later.
                </li>
                <li>
                  Explain anomalies instead of deleting them.
                </li>
                <li>
                  Base the conclusion on recorded evidence.
                </li>
              </ul>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="student-details-heading"
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
                  <strong>Investigation title</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="worksheet-heading">
              <p className="eyebrow">
                Scientific investigation
              </p>
              <h2 id="worksheet-heading">
                Complete scientific method worksheet
              </h2>

              <div className="report-format-list">
                {worksheetSections.map((section) => (
                  <section
                    className="report-format-card template-print-section"
                    key={section.number}
                    aria-labelledby={`worksheet-section-${section.number}`}
                  >
                    <span className="report-format-card__number">
                      {section.number}
                    </span>

                    <div>
                      <h3
                        id={`worksheet-section-${section.number}`}
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
              <p className="eyebrow">Review checklist</p>
              <h2 id="checklist-heading">
                Check the investigation before submission
              </h2>

              <ul className="article-list">
                <li>The question is measurable and testable.</li>
                <li>The hypothesis includes reasoning.</li>
                <li>Variables are correctly identified.</li>
                <li>Controls and repeated trials are included.</li>
                <li>The procedure is clear and repeatable.</li>
                <li>Measurements include units.</li>
                <li>Graphs and tables are correctly labeled.</li>
                <li>The conclusion cites specific evidence.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Build stronger scientific investigations
              </h2>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/steps-of-the-scientific-method"
                >
                  Steps of the Scientific Method
                </Link>
                , write a focused{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/scientific-question"
                >
                  Scientific Question
                </Link>
                , and plan a fair test with the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/experimental-design"
                >
                  Experimental Design Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>
              <h2 id="faq-heading">
                Scientific method worksheet FAQ
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
                Investigation process
              </p>
              <h2>Follow the scientific method</h2>

              <ol>
                <li>Observe</li>
                <li>Ask a question</li>
                <li>Research</li>
                <li>Form a hypothesis</li>
                <li>Design the experiment</li>
                <li>Collect data</li>
                <li>Analyze results</li>
                <li>Draw a conclusion</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Complete guide
              </p>
              <h2>Review every investigation step</h2>

              <Link
                className="article-inline-link"
                href="/scientific-method"
              >
                Explore Scientific Method Guides
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
