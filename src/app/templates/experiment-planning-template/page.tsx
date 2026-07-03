import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Experiment Planning Template";
const pageDescription =
  "Use this printable experiment planning template to define a research question, hypothesis, variables, controls, materials, procedure, measurements, trials, and safety.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/templates/experiment-planning-template",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/templates/experiment-planning-template",
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
      "What should be planned before starting an experiment?",
    answer:
      "Plan the research question, hypothesis, variables, control conditions, materials, procedure, measurements, repeated trials, safety precautions, and data-recording method.",
  },
  {
    question:
      "Why should the data table be prepared before the experiment?",
    answer:
      "Preparing the table in advance ensures that all required measurements, units, trials, and observations are recorded consistently.",
  },
  {
    question:
      "How many repeated trials should an experiment include?",
    answer:
      "The number depends on the investigation, but repeated trials should be sufficient to reveal variation and improve confidence in the results.",
  },
  {
    question:
      "Why are controlled variables important?",
    answer:
      "Controlled variables help ensure that changes in the dependent variable are linked to the independent variable rather than unrelated conditions.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/templates/experiment-planning-template",
  ),
  mainEntityOfPage: absoluteUrl(
    "/templates/experiment-planning-template",
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

const planningSections = [
  {
    number: "01",
    title: "Investigation title",
    prompt:
      "Write a concise title that identifies the purpose or main variables.",
    lines: 3,
  },
  {
    number: "02",
    title: "Observation or problem",
    prompt:
      "Describe the observation, pattern, or problem that led to the investigation.",
    lines: 5,
  },
  {
    number: "03",
    title: "Research question",
    prompt:
      "Write a focused, measurable, and testable scientific question.",
    lines: 4,
  },
  {
    number: "04",
    title: "Hypothesis",
    prompt:
      "Write a prediction and explain the scientific reasoning behind it.",
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
      "List the conditions that must remain constant throughout the investigation.",
    lines: 6,
  },
  {
    number: "08",
    title: "Control condition",
    prompt:
      "Describe the baseline or comparison condition used in the experiment.",
    lines: 4,
  },
  {
    number: "09",
    title: "Materials and equipment",
    prompt:
      "List equipment, materials, quantities, sizes, concentrations, and measuring instruments.",
    lines: 7,
  },
  {
    number: "10",
    title: "Measurement plan",
    prompt:
      "State what will be measured, the units, instrument resolution, timing, and recording intervals.",
    lines: 6,
  },
  {
    number: "11",
    title: "Repeated trials and sample size",
    prompt:
      "State how many trials, samples, or observations will be collected and explain why.",
    lines: 5,
  },
  {
    number: "12",
    title: "Experimental procedure",
    prompt:
      "Write numbered steps detailed enough for another person to repeat accurately.",
    lines: 12,
  },
  {
    number: "13",
    title: "Safety and risk controls",
    prompt:
      "Identify hazards, required protective equipment, safe handling, and disposal procedures.",
    lines: 6,
  },
  {
    number: "14",
    title: "Data table plan",
    prompt:
      "Sketch the table headings, variables, units, trials, averages, and observation columns.",
    lines: 10,
  },
  {
    number: "15",
    title: "Expected graph",
    prompt:
      "State the graph type, x-axis variable, y-axis variable, units, and expected trend.",
    lines: 6,
  },
  {
    number: "16",
    title: "Possible limitations",
    prompt:
      "Predict equipment limits, uncontrolled conditions, procedural weaknesses, or sampling problems.",
    lines: 6,
  },
  {
    number: "17",
    title: "Teacher or peer review",
    prompt:
      "Record feedback and revisions required before the experiment begins.",
    lines: 6,
  },
] as const;

export default function ExperimentPlanningTemplatePage() {
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
                Experiment Planning Template
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Printable experimental design worksheet
            </p>
            <h1>Experiment Planning Template</h1>
            <p>
              Plan a fair, repeatable, and safe scientific experiment
              before collecting measurements or observations.
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
                Complete the plan before experimenting
              </h2>

              <ul className="article-list">
                <li>Define a measurable research question.</li>
                <li>Identify all experimental variables.</li>
                <li>Choose suitable measurement instruments.</li>
                <li>Plan repeated trials and control conditions.</li>
                <li>Prepare tables before collecting data.</li>
                <li>Review safety and limitations.</li>
              </ul>
            </section>

            <section
              className="template-print-section"
              aria-labelledby="student-details-heading"
            >
              <p className="eyebrow">Planning details</p>
              <h2 id="student-details-heading">
                Student and investigation information
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
                  <strong>Teacher or supervisor</strong>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="planning-heading">
              <p className="eyebrow">Experiment plan</p>
              <h2 id="planning-heading">
                Complete experimental planning template
              </h2>

              <div className="report-format-list">
                {planningSections.map((section) => (
                  <section
                    className="report-format-card template-print-section"
                    key={section.number}
                    aria-labelledby={`planning-section-${section.number}`}
                  >
                    <span className="report-format-card__number">
                      {section.number}
                    </span>

                    <div>
                      <h3
                        id={`planning-section-${section.number}`}
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

            <section aria-labelledby="approval-heading">
              <p className="eyebrow">Final approval</p>
              <h2 id="approval-heading">
                Pre-experiment checklist
              </h2>

              <ul className="article-list">
                <li>The question is testable and measurable.</li>
                <li>The hypothesis includes reasoning.</li>
                <li>Variables and controls are correctly defined.</li>
                <li>The procedure is clear and repeatable.</li>
                <li>Measurements include suitable units.</li>
                <li>The sample size and trials are sufficient.</li>
                <li>Safety precautions are documented.</li>
                <li>The data table is ready before testing.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Strengthen the experimental plan
              </h2>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/experimental-design"
                >
                  Experimental Design Guide
                </Link>
                , identify{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/independent-dependent-controlled-variables"
                >
                  Experimental Variables
                </Link>
                , and prepare measurements with the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/collect-and-record-data"
                >
                  Data Collection Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Questions and answers
              </p>
              <h2 id="faq-heading">
                Experiment planning template FAQ
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
                Planning checklist
              </p>
              <h2>Prepare a fair experiment</h2>

              <ol>
                <li>Write the question</li>
                <li>Form the hypothesis</li>
                <li>Identify variables</li>
                <li>Choose controls</li>
                <li>Select equipment</li>
                <li>Plan measurements</li>
                <li>Prepare the procedure</li>
                <li>Review safety</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Experimental design
              </p>
              <h2>Review the complete planning guide</h2>

              <Link
                className="article-inline-link"
                href="/scientific-method/experimental-design"
              >
                Open Experimental Design Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
