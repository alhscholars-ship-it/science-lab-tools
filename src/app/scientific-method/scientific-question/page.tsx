import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Scientific Question";
const pageDescription =
  "Learn how to write a focused, measurable, and testable scientific question using clear variables, suitable conditions, and practical examples.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/scientific-method/scientific-question",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/scientific-question",
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
    question: "What makes a scientific question testable?",
    answer:
      "A scientific question is testable when its variables can be changed, measured, observed, or compared using a practical investigation.",
  },
  {
    question: "Should a scientific question include variables?",
    answer:
      "A strong experimental question normally identifies the independent variable and the dependent variable, either directly or through clear wording.",
  },
  {
    question: "Can a scientific question begin with why?",
    answer:
      "It can, but why questions are often too broad for a single experiment. Questions beginning with how does or what is the effect of are usually easier to test.",
  },
  {
    question: "What is the difference between a topic and a scientific question?",
    answer:
      "A topic identifies a general subject, while a scientific question defines a specific relationship or effect that can be investigated.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/scientific-question",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/scientific-question",
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

const questionChecklist = [
  {
    number: "01",
    title: "Choose a focused topic",
    description:
      "Begin with a specific scientific phenomenon, material, organism, process, or measurable relationship.",
  },
  {
    number: "02",
    title: "Identify the independent variable",
    description:
      "Decide what factor will be deliberately changed, selected, or compared.",
  },
  {
    number: "03",
    title: "Identify the dependent variable",
    description:
      "Decide what response, result, or measurement will be recorded.",
  },
  {
    number: "04",
    title: "Define the investigation conditions",
    description:
      "Specify the system, material, organism, duration, range, or environment when this improves precision.",
  },
  {
    number: "05",
    title: "Check that the question is measurable",
    description:
      "Confirm that the result can be observed or measured using available tools, units, and procedures.",
  },
  {
    number: "06",
    title: "Check that the question is practical",
    description:
      "Ensure the investigation can be completed safely, ethically, and within the available time and resources.",
  },
] as const;

export default function ScientificQuestionPage() {
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
                <Link href="/scientific-method">
                  Scientific Method
                </Link>
              </li>
              <li aria-current="page">
                Scientific Question
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Investigation planning
            </p>
            <h1>How to Write a Scientific Question</h1>
            <p>
              Turn a general observation into a focused,
              measurable, and testable question that can guide a
              scientific investigation.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="definition-heading">
              <p className="eyebrow">Definition</p>
              <h2 id="definition-heading">
                What is a scientific question?
              </h2>

              <p>
                A scientific question asks about a measurable,
                observable, or testable relationship. It provides
                direction for the hypothesis, experimental design,
                data collection, and conclusion.
              </p>

              <p>
                A useful question is specific enough to investigate
                under controlled conditions but broad enough to
                produce meaningful evidence.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Question structure</p>
              <h2 id="structure-heading">
                A practical scientific-question formula
              </h2>

              <div className="formula-card">
                <p>
                  Question structure
                  <span>
                    How does [independent variable] affect
                    [dependent variable] under [defined conditions]?
                  </span>
                </p>
              </div>

              <p>
                This structure is useful because it identifies what
                will be changed and what will be measured.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Planning process</p>
              <h2 id="steps-heading">
                Six steps for writing a testable question
              </h2>

              <div className="report-format-list">
                {questionChecklist.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`question-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`question-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="variables-heading">
              <p className="eyebrow">Variables</p>
              <h2 id="variables-heading">
                Identify what changes and what is measured
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Independent variable
                  </p>
                  <h3>The factor changed</h3>
                  <p>
                    This is the condition, treatment, amount, or
                    category deliberately changed or compared.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Dependent variable
                  </p>
                  <h3>The response measured</h3>
                  <p>
                    This is the result or outcome recorded to
                    determine the effect of the independent variable.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Turn a topic into a scientific question
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    General topic
                  </p>
                  <h3>Plant growth</h3>
                  <p>
                    This identifies a subject but does not define a
                    testable relationship.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Testable question
                  </p>
                  <h3>
                    How does light duration affect plant height?
                  </h3>
                  <p>
                    The light duration can be changed and plant
                    height can be measured.
                  </p>
                </article>
              </div>

              <ul className="article-list">
                <li>
                  Independent variable: daily light duration
                </li>
                <li>
                  Dependent variable: plant height
                </li>
                <li>
                  Possible controlled variables: plant species,
                  soil, water, pot size, and temperature
                </li>
              </ul>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="eyebrow">Question examples</p>
              <h2 id="examples-heading">
                Examples of testable scientific questions
              </h2>

              <ul className="article-list">
                <li>
                  How does water temperature affect the time required
                  for sugar to dissolve?
                </li>
                <li>
                  How does ramp height affect the distance traveled by
                  a model car?
                </li>
                <li>
                  How does salt concentration affect the boiling point
                  of water?
                </li>
                <li>
                  How does exercise duration affect heart rate?
                </li>
                <li>
                  How does surface area affect the rate of a chemical
                  reaction?
                </li>
              </ul>
            </section>

            <section aria-labelledby="weak-heading">
              <p className="eyebrow">Question quality</p>
              <h2 id="weak-heading">
                Weak questions and improved versions
              </h2>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">
                    A
                  </span>
                  <div>
                    <h3>Too broad</h3>
                    <p>
                      Weak: What affects plant growth?
                    </p>
                    <p>
                      Improved: How does fertilizer concentration
                      affect the weekly height increase of bean
                      plants?
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">
                    B
                  </span>
                  <div>
                    <h3>Subjective</h3>
                    <p>
                      Weak: Which liquid is best for plants?
                    </p>
                    <p>
                      Improved: How does irrigation liquid affect the
                      number of leaves produced by bean plants over
                      three weeks?
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">
                    C
                  </span>
                  <div>
                    <h3>Not measurable</h3>
                    <p>
                      Weak: Do plants like music?
                    </p>
                    <p>
                      Improved: How does daily music exposure affect
                      the average height of bean plants?
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="criteria-heading">
              <p className="eyebrow">Quality checklist</p>
              <h2 id="criteria-heading">
                Check the question before experimenting
              </h2>

              <ul className="article-list">
                <li>
                  Is the question focused on one main relationship?
                </li>
                <li>
                  Can the independent variable be changed or compared?
                </li>
                <li>
                  Can the dependent variable be measured or observed?
                </li>
                <li>
                  Can important controlled variables be kept constant?
                </li>
                <li>
                  Can the investigation be repeated?
                </li>
                <li>
                  Can it be completed safely and ethically?
                </li>
                <li>
                  Is the wording clear and free from subjective terms?
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Next steps</p>
              <h2 id="related-heading">
                Continue planning the investigation
              </h2>

              <p>
                Review the complete process in{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/steps-of-the-scientific-method"
                >
                  Steps of the Scientific Method
                </Link>
                , then organize the investigation using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-template"
                >
                  Lab Report Template
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Scientific question FAQ
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
                Question checklist
              </p>
              <h2>Make it testable</h2>
              <ol>
                <li>Choose a focused topic</li>
                <li>Identify the changed variable</li>
                <li>Identify the measured variable</li>
                <li>Define useful conditions</li>
                <li>Check measurement feasibility</li>
                <li>Confirm safety and practicality</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data comparison
              </p>
              <h2>Compare two measurements</h2>
              <Link
                className="article-inline-link"
                href="/calculators/percent-difference-calculator"
              >
                Open Percent Difference Calculator
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
