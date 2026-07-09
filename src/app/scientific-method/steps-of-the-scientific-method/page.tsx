import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Steps of the Scientific Method";
const pageDescription =
  "Explore the steps of the scientific method, from observation and hypothesis to experimentation, data analysis, conclusions, and communicating results.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/steps-of-the-scientific-method",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/steps-of-the-scientific-method",
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
    question: "What are the main steps of the scientific method?",
    answer:
      "The main steps are observation, background research, research question, hypothesis, experiment, data collection, analysis, conclusion, and communication.",
  },
  {
    question: "Does the scientific method always follow one fixed order?",
    answer:
      "The process is structured, but scientists may return to earlier steps, revise a hypothesis, improve a method, or repeat an experiment when new evidence appears.",
  },
  {
    question: "What happens if a hypothesis is not supported?",
    answer:
      "An unsupported hypothesis is still useful because it helps refine the scientific explanation, improve the experiment, or generate a new testable prediction.",
  },
  {
    question: "Why must experiments be repeated?",
    answer:
      "Repeated trials help reveal variation, improve reliability, and reduce the influence of isolated random errors.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/steps-of-the-scientific-method",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/steps-of-the-scientific-method",
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

const methodSteps = [
  {
    number: "01",
    title: "Make an observation",
    description:
      "Identify a pattern, problem, event, or relationship that can be investigated scientifically.",
  },
  {
    number: "02",
    title: "Research the topic",
    description:
      "Review reliable background information, relevant scientific principles, and previous findings.",
  },
  {
    number: "03",
    title: "Ask a testable question",
    description:
      "Write a focused question that identifies what will be changed, measured, or compared.",
  },
  {
    number: "04",
    title: "Develop a hypothesis",
    description:
      "Predict the expected relationship between variables and support the prediction with scientific reasoning.",
  },
  {
    number: "05",
    title: "Design the experiment",
    description:
      "Plan variables, controls, materials, measurements, repeated trials, and safety precautions.",
  },
  {
    number: "06",
    title: "Collect data",
    description:
      "Record quantitative measurements and qualitative observations accurately and consistently.",
  },
  {
    number: "07",
    title: "Analyze the results",
    description:
      "Use tables, graphs, calculations, averages, patterns, and anomalies to evaluate the evidence.",
  },
  {
    number: "08",
    title: "Draw a conclusion",
    description:
      "Answer the research question and decide whether the evidence supports the hypothesis.",
  },
  {
    number: "09",
    title: "Communicate and improve",
    description:
      "Report the findings, identify limitations, and refine the investigation when additional testing is needed.",
  },
] as const;

export default function ScientificMethodStepsPage() {
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
                Steps of the Scientific Method
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Core investigation guide</p>
            <h1>Steps of the Scientific Method</h1>
            <p>
              Follow a structured process for turning observations
              into testable questions, experiments, evidence, and
              supported conclusions.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Overview</p>
              <h2 id="overview-heading">
                What is the scientific method?
              </h2>

              <p>
                The scientific method is a structured approach to
                investigating questions using observations,
                controlled testing, measurements, analysis, and
                evidence-based conclusions.
              </p>

              <p>
                It is not simply a rigid checklist. Scientists often
                revise earlier steps, repeat trials, improve methods,
                and develop new questions as evidence becomes
                available.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Complete process</p>
              <h2 id="steps-heading">
                Nine steps of the scientific method
              </h2>

              <div className="report-format-list">
                {methodSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`method-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`method-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="observation-heading">
              <p className="eyebrow">Observation</p>
              <h2 id="observation-heading">
                Begin with something measurable
              </h2>

              <p>
                A useful scientific observation identifies something
                that can be described, compared, measured, or tested.
                It may come from laboratory work, field study,
                previous research, or an unexpected result.
              </p>

              <div className="formula-card">
                <p>
                  Observation example
                  <span>
                    Sugar appears to dissolve faster in warm water
                    than in cold water.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="question-heading">
              <p className="eyebrow">Research question</p>
              <h2 id="question-heading">
                Turn the observation into a testable question
              </h2>

              <p>
                The question should identify the experimental system
                and the variables being investigated. Avoid questions
                that are too broad, subjective, or impossible to
                measure.
              </p>

              <div className="formula-card">
                <p>
                  Testable question
                  <span>
                    How does water temperature affect the time required
                    for a fixed mass of sugar to dissolve?
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="hypothesis-heading">
              <p className="eyebrow">Hypothesis</p>
              <h2 id="hypothesis-heading">
                Make a scientific prediction
              </h2>

              <p>
                A hypothesis predicts the expected relationship
                between the independent and dependent variables and
                explains the scientific reasoning behind that
                prediction.
              </p>

              <div className="formula-card">
                <p>
                  Hypothesis structure
                  <span>
                    If [independent variable changes], then [dependent
                    variable will change], because [scientific reason].
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="experiment-heading">
              <p className="eyebrow">Experiment</p>
              <h2 id="experiment-heading">
                Design a fair and repeatable test
              </h2>

              <ul className="article-list">
                <li>
                  Change one independent variable deliberately.
                </li>
                <li>
                  Measure the dependent variable consistently.
                </li>
                <li>
                  Keep important controlled variables constant.
                </li>
                <li>
                  Include a control group when appropriate.
                </li>
                <li>
                  Perform repeated trials.
                </li>
                <li>
                  Use suitable measurement instruments and units.
                </li>
                <li>
                  Address relevant safety risks.
                </li>
              </ul>
            </section>

            <section aria-labelledby="data-heading">
              <p className="eyebrow">Evidence</p>
              <h2 id="data-heading">
                Collect quantitative and qualitative data
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Quantitative data
                  </p>
                  <h3>Numerical measurements</h3>
                  <p>
                    Time, mass, temperature, volume, distance, and
                    concentration are examples of quantitative data.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Qualitative data
                  </p>
                  <h3>Descriptive observations</h3>
                  <p>
                    Color change, gas formation, texture, appearance,
                    and behavior are examples of qualitative data.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="analysis-heading">
              <p className="eyebrow">Analysis</p>
              <h2 id="analysis-heading">
                Evaluate patterns and variation
              </h2>

              <p>
                Organize data into tables and graphs, calculate useful
                values, compare repeated trials, identify anomalies,
                and determine whether the evidence shows a consistent
                relationship.
              </p>

              <ul className="article-list">
                <li>Calculate averages when appropriate.</li>
                <li>Compare experimental and accepted values.</li>
                <li>Use consistent units and significant figures.</li>
                <li>Identify trends, differences, and anomalies.</li>
                <li>Consider measurement uncertainty.</li>
              </ul>
            </section>

            <section aria-labelledby="conclusion-heading">
              <p className="eyebrow">Conclusion</p>
              <h2 id="conclusion-heading">
                Answer the question using evidence
              </h2>

              <p>
                The conclusion should state the main finding, cite
                relevant evidence, and explain whether the hypothesis
                was supported, partially supported, or not supported.
              </p>

              <p>
                Scientists do not normally claim that one experiment
                proves a hypothesis. Conclusions are limited to the
                evidence and conditions tested.
              </p>
            </section>

            <section aria-labelledby="cycle-heading">
              <p className="eyebrow">Scientific cycle</p>
              <h2 id="cycle-heading">
                Repeat, revise, and investigate further
              </h2>

              <p>
                Results may lead to a revised hypothesis, improved
                procedure, additional trials, or a new research
                question. This repeated process is a normal and
                valuable part of science.
              </p>

              <div className="formula-card">
                <p>
                  Investigation cycle
                  <span>
                    Observe → question → test → analyze → conclude →
                    revise
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Scientific-method problems to avoid
              </h2>

              <ul className="article-list">
                <li>Using a question that cannot be tested.</li>
                <li>Changing multiple variables at the same time.</li>
                <li>Performing only one trial.</li>
                <li>Recording measurements without units.</li>
                <li>Ignoring anomalous results.</li>
                <li>Claiming the hypothesis was proven.</li>
                <li>Drawing conclusions not supported by the data.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Document and analyze the investigation
              </h2>

              <p>
                Organize the complete investigation using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-template"
                >
                  Lab Report Template
                </Link>
                , and evaluate experimental accuracy with the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/percent-error-calculator"
                >
                  Percent Error Calculator
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Scientific method FAQ
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
                Scientific method checklist
              </p>
              <h2>Complete investigation</h2>
              <ol>
                <li>Observation</li>
                <li>Background research</li>
                <li>Research question</li>
                <li>Hypothesis</li>
                <li>Experiment</li>
                <li>Data collection</li>
                <li>Analysis</li>
                <li>Conclusion</li>
                <li>Communication</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Investigation report
              </p>
              <h2>Write the complete report</h2>
              <Link
                className="article-inline-link"
                href="/lab-reports/how-to-write-a-lab-report"
              >
                Read Lab Report Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
