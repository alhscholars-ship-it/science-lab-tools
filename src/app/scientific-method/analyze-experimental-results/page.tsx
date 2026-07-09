import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Analyze Experimental Results";
const pageDescription =
  "Learn how to analyze experimental results by checking trends, units, anomalies, uncertainty, calculations, and whether the evidence supports the hypothesis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/analyze-experimental-results",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/analyze-experimental-results",
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
    question: "What does analyzing experimental results mean?",
    answer:
      "It means organizing, calculating, comparing, and interpreting data to identify patterns, variation, anomalies, and evidence relevant to the research question.",
  },
  {
    question: "Why are averages used in experiments?",
    answer:
      "Averages summarize repeated measurements and reduce the influence of isolated variation, although they should be considered together with the spread of the data.",
  },
  {
    question: "Should anomalous results be deleted?",
    answer:
      "No. Anomalous results should be recorded, investigated, and only excluded when there is a justified and documented reason.",
  },
  {
    question: "How do results relate to the hypothesis?",
    answer:
      "The analyzed evidence is used to decide whether the hypothesis is supported, partially supported, or not supported under the tested conditions.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/analyze-experimental-results",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/analyze-experimental-results",
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

const analysisSteps = [
  {
    number: "01",
    title: "Check the raw data",
    description:
      "Review units, labels, missing values, transcription errors, and unusual observations.",
  },
  {
    number: "02",
    title: "Organize the results",
    description:
      "Arrange measurements in clear tables using consistent headings, units, and precision.",
  },
  {
    number: "03",
    title: "Calculate useful values",
    description:
      "Calculate means, differences, percentages, rates, ranges, or other values relevant to the question.",
  },
  {
    number: "04",
    title: "Create suitable graphs",
    description:
      "Use a graph type that clearly represents the independent and dependent variables.",
  },
  {
    number: "05",
    title: "Identify patterns and trends",
    description:
      "Look for increases, decreases, plateaus, relationships, and differences between groups.",
  },
  {
    number: "06",
    title: "Evaluate variation",
    description:
      "Compare repeated trials, ranges, spread, and consistency between measurements.",
  },
  {
    number: "07",
    title: "Investigate anomalies",
    description:
      "Identify unusual values and consider measurement, procedural, or environmental causes.",
  },
  {
    number: "08",
    title: "Compare with expectations",
    description:
      "Compare results with the hypothesis, control condition, accepted values, or previous evidence.",
  },
  {
    number: "09",
    title: "Assess limitations",
    description:
      "Evaluate uncertainty, sample size, controls, equipment limits, and procedural weaknesses.",
  },
  {
    number: "10",
    title: "Form an evidence-based conclusion",
    description:
      "Answer the research question using the strongest relevant evidence from the results.",
  },
] as const;

export default function AnalyzeExperimentalResultsPage() {
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
                Analyze Experimental Results
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Data interpretation</p>
            <h1>How to Analyze Experimental Results</h1>
            <p>
              Turn raw measurements into meaningful evidence by
              organizing data, calculating useful values, identifying
              patterns, evaluating variation, and drawing supported
              conclusions.
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
                What is experimental data analysis?
              </h2>

              <p>
                Experimental data analysis is the process of
                organizing, calculating, comparing, and interpreting
                evidence collected during an investigation.
              </p>

              <p>
                The goal is not only to describe the numbers, but to
                determine what they show about the research question
                and hypothesis.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Analysis process</p>
              <h2 id="steps-heading">
                Ten steps for analyzing experimental results
              </h2>

              <div className="report-format-list">
                {analysisSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`analysis-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`analysis-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="calculations-heading">
              <p className="eyebrow">Calculations</p>
              <h2 id="calculations-heading">
                Calculate values that answer the question
              </h2>

              <ul className="article-list">
                <li>Mean of repeated trials</li>
                <li>Range between highest and lowest values</li>
                <li>Change between initial and final measurements</li>
                <li>Rate of change over time</li>
                <li>Percent error against an accepted value</li>
                <li>Percent difference between two measurements</li>
              </ul>
            </section>

            <section aria-labelledby="graphs-heading">
              <p className="eyebrow">Visualization</p>
              <h2 id="graphs-heading">
                Use tables and graphs to reveal patterns
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Line graph
                  </p>
                  <h3>Continuous numerical variables</h3>
                  <p>
                    Useful for showing how a measured response changes
                    across time, temperature, concentration, or another
                    continuous variable.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Bar graph
                  </p>
                  <h3>Separate groups or categories</h3>
                  <p>
                    Useful for comparing control and experimental
                    groups, treatments, materials, or categories.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="trend-heading">
              <p className="eyebrow">Patterns</p>
              <h2 id="trend-heading">
                Describe the trend before explaining it
              </h2>

              <p>
                Begin by stating what the data shows. Then explain the
                scientific meaning of the pattern.
              </p>

              <div className="formula-card">
                <p>
                  Strong analysis structure
                  <span>
                    Pattern → evidence → scientific explanation →
                    limitation
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="variation-heading">
              <p className="eyebrow">Reliability</p>
              <h2 id="variation-heading">
                Evaluate variation between repeated trials
              </h2>

              <p>
                Closely grouped repeated measurements suggest greater
                consistency. Widely spread measurements may indicate
                natural variation, measurement uncertainty, or an
                inconsistent procedure.
              </p>

              <ul className="article-list">
                <li>Compare the spread of repeated values.</li>
                <li>Check whether one trial differs strongly.</li>
                <li>Consider instrument resolution.</li>
                <li>Review procedural consistency.</li>
                <li>Assess whether more trials are needed.</li>
              </ul>
            </section>

            <section aria-labelledby="anomaly-heading">
              <p className="eyebrow">Anomalies</p>
              <h2 id="anomaly-heading">
                Investigate unusual results
              </h2>

              <p>
                An anomaly is a value that differs substantially from
                the general pattern. It should be recorded and
                considered rather than removed automatically.
              </p>

              <ul className="article-list">
                <li>Check for transcription errors.</li>
                <li>Review equipment problems.</li>
                <li>Consider uncontrolled variables.</li>
                <li>Check whether the method changed.</li>
                <li>Repeat the measurement when appropriate.</li>
              </ul>
            </section>

            <section aria-labelledby="comparison-heading">
              <p className="eyebrow">Comparison</p>
              <h2 id="comparison-heading">
                Compare evidence with a baseline
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Experimental comparison
                  </p>
                  <h3>Control vs treatment</h3>
                  <p>
                    Compare the experimental group with the control
                    condition to estimate the effect of the treatment.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Accepted comparison
                  </p>
                  <h3>Measured vs accepted value</h3>
                  <p>
                    Use percent error when comparing an experimental
                    result with an accepted or reference value.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Limitations</p>
              <h2 id="limitations-heading">
                Evaluate the strength of the evidence
              </h2>

              <ul className="article-list">
                <li>Small sample size</li>
                <li>Too few repeated trials</li>
                <li>Limited instrument resolution</li>
                <li>Uncontrolled environmental conditions</li>
                <li>Unclear endpoint definitions</li>
                <li>Narrow independent-variable range</li>
                <li>Procedural inconsistency</li>
              </ul>
            </section>

            <section aria-labelledby="conclusion-heading">
              <p className="eyebrow">Conclusion</p>
              <h2 id="conclusion-heading">
                Connect the evidence to the research question
              </h2>

              <p>
                A strong conclusion identifies the main finding,
                cites relevant numerical evidence, states whether the
                hypothesis was supported, and acknowledges important
                limitations.
              </p>

              <div className="formula-card">
                <p>
                  Conclusion structure
                  <span>
                    Answer → key evidence → hypothesis evaluation →
                    limitation → improvement
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Data-analysis problems to avoid
              </h2>

              <ul className="article-list">
                <li>Repeating results without interpreting them.</li>
                <li>Ignoring variation between trials.</li>
                <li>Deleting anomalies without justification.</li>
                <li>Using graphs without labels or units.</li>
                <li>Claiming correlation proves causation.</li>
                <li>Claiming the hypothesis was proven.</li>
                <li>Drawing conclusions beyond the tested conditions.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Analyze and present the evidence
              </h2>

              <p>
                Begin with reliable{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/collect-and-record-data"
                >
                  Data Collection
                </Link>
                , present results using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>
                , and compare values using the{" "}
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
                Experimental results analysis FAQ
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
                Analysis checklist
              </p>
              <h2>Turn data into evidence</h2>
              <ol>
                <li>Check raw data</li>
                <li>Organize tables</li>
                <li>Calculate values</li>
                <li>Create graphs</li>
                <li>Identify trends</li>
                <li>Evaluate variation</li>
                <li>Investigate anomalies</li>
                <li>Compare evidence</li>
                <li>Assess limitations</li>
                <li>Draw a conclusion</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Accuracy analysis
              </p>
              <h2>Compare with an accepted value</h2>
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
