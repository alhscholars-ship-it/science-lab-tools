import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Lab Report Discussion";
const pageDescription =
  "Learn how to write a lab report discussion by interpreting results, evaluating the hypothesis, explaining anomalies, assessing uncertainty, and suggesting improvements.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-discussion",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-discussion"),
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
    question: "What belongs in a lab report discussion?",
    answer:
      "The discussion should interpret important results, connect them to scientific principles, evaluate the hypothesis, examine anomalies and uncertainty, and propose realistic improvements.",
  },
  {
    question: "Should data be repeated in the discussion?",
    answer:
      "Use selected values as evidence, but do not repeat every table or graph entry. Focus on the results needed to support the interpretation.",
  },
  {
    question: "How should experimental errors be discussed?",
    answer:
      "Identify a specific limitation, explain how it could affect the measurements or conclusion, and propose a practical improvement that addresses it.",
  },
  {
    question: "What if the hypothesis was not supported?",
    answer:
      "State that the evidence did not support the hypothesis and explain the result scientifically. An unsupported hypothesis does not automatically mean the experiment failed.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-discussion"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-discussion",
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

export default function LabReportDiscussionPage() {
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
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
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
                Lab Report Discussion
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Report section guide</p>
            <h1>How to Write a Lab Report Discussion</h1>
            <p>
              Interpret experimental evidence, connect findings to
              scientific principles, evaluate limitations, and explain
              what the investigation demonstrates.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="purpose-heading">
              <p className="eyebrow">Purpose</p>
              <h2 id="purpose-heading">
                What does the discussion section do?
              </h2>

              <p>
                The discussion explains the scientific meaning of the
                results. It moves beyond reporting measurements and
                evaluates what the evidence shows about the research
                question.
              </p>

              <p>
                A strong discussion connects observed patterns to
                scientific principles, evaluates the hypothesis, and
                examines how uncertainty or limitations may have
                influenced the findings.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Recommended structure</p>
              <h2 id="structure-heading">
                Six parts of a strong discussion
              </h2>

              <ol className="calculation-steps">
                <li>Summarize the main finding</li>
                <li>Interpret important patterns</li>
                <li>Connect results to scientific theory</li>
                <li>Evaluate the hypothesis</li>
                <li>Assess anomalies and limitations</li>
                <li>Recommend realistic improvements</li>
              </ol>
            </section>

            <section aria-labelledby="finding-heading">
              <p className="eyebrow">Main finding</p>
              <h2 id="finding-heading">
                Begin with the most important result
              </h2>

              <p>
                Start by identifying the overall relationship,
                difference, or outcome demonstrated by the data. Use
                selected numerical evidence where it strengthens the
                statement.
              </p>

              <div className="formula-card">
                <p>
                  Evidence-based opening
                  <span>
                    Reaction time decreased from 84 seconds at 20°C to
                    31 seconds at 50°C, showing that reaction rate
                    increased as temperature increased.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="interpret-heading">
              <p className="eyebrow">Interpretation</p>
              <h2 id="interpret-heading">
                Explain why the result occurred
              </h2>

              <p>
                Connect the observed pattern to scientific concepts
                introduced earlier in the report. Explain the
                mechanism or relationship that could reasonably
                account for the evidence.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Results statement
                  </p>
                  <h3>What happened?</h3>
                  <p>
                    Reaction time decreased as temperature increased.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Discussion statement
                  </p>
                  <h3>Why did it happen?</h3>
                  <p>
                    Higher temperature increased particle kinetic
                    energy and the frequency of successful collisions.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="hypothesis-heading">
              <p className="eyebrow">Hypothesis evaluation</p>
              <h2 id="hypothesis-heading">
                Decide whether the evidence supports the prediction
              </h2>

              <p>
                State whether the results supported, partially
                supported, or did not support the hypothesis. Base the
                decision on the evidence rather than simply saying the
                hypothesis was correct or incorrect.
              </p>

              <div className="formula-card">
                <p>
                  Evaluation structure
                  <span>
                    The hypothesis was supported because [specific
                    evidence] showed [predicted relationship].
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="anomalies-heading">
              <p className="eyebrow">Anomalies</p>
              <h2 id="anomalies-heading">
                Address unexpected results
              </h2>

              <p>
                Identify data points that do not follow the main
                pattern. Consider whether an anomaly may reflect
                measurement variation, procedural inconsistency,
                uncontrolled conditions, or a real feature of the
                system.
              </p>

              <ul className="article-list">
                <li>Identify the anomalous value precisely.</li>
                <li>Compare it with the expected pattern.</li>
                <li>Suggest a scientifically plausible cause.</li>
                <li>Avoid deleting a result without justification.</li>
                <li>Explain whether it affects the conclusion.</li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Evaluation</p>
              <h2 id="limitations-heading">
                Explain limitations and their effects
              </h2>

              <p>
                A limitation is not merely something that went wrong.
                It is a feature of the design, equipment, measurement
                process, or sample that restricts the confidence or
                scope of the conclusion.
              </p>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">01</span>
                  <div>
                    <h3>Identify the limitation</h3>
                    <p>
                      Reaction time was measured manually with a
                      stopwatch.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">02</span>
                  <div>
                    <h3>Explain its effect</h3>
                    <p>
                      Human reaction time may have increased variation
                      between repeated measurements.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">03</span>
                  <div>
                    <h3>Propose an improvement</h3>
                    <p>
                      Use an electronic sensor to detect the reaction
                      endpoint automatically.
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="uncertainty-heading">
              <p className="eyebrow">Uncertainty</p>
              <h2 id="uncertainty-heading">
                Consider measurement quality
              </h2>

              <ul className="article-list">
                <li>
                  Compare variation between repeated measurements.
                </li>
                <li>
                  Consider the resolution of measuring instruments.
                </li>
                <li>
                  Distinguish random variation from systematic bias.
                </li>
                <li>
                  Evaluate whether differences are large enough to be
                  meaningful.
                </li>
                <li>
                  Avoid claiming greater certainty than the data
                  support.
                </li>
              </ul>
            </section>

            <section aria-labelledby="improvements-heading">
              <p className="eyebrow">Improvements</p>
              <h2 id="improvements-heading">
                Recommend specific and realistic changes
              </h2>

              <p>
                Each improvement should address an identified
                limitation. Avoid vague recommendations such as “be
                more careful” or “use better equipment.”
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Weak improvement
                  </p>
                  <h3>Too general</h3>
                  <p>Take more accurate measurements.</p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Strong improvement
                  </p>
                  <h3>Specific and connected</h3>
                  <p>
                    Replace the 1 mL graduated cylinder with a 0.1 mL
                    burette to reduce volume-reading uncertainty.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Discussion-section problems to avoid
              </h2>

              <ul className="article-list">
                <li>Repeating the full results section.</li>
                <li>Making explanations without scientific support.</li>
                <li>Calling every unexpected result human error.</li>
                <li>Claiming the hypothesis was proven.</li>
                <li>Listing limitations without explaining effects.</li>
                <li>Suggesting vague improvements.</li>
                <li>Introducing unrelated scientific theory.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Connect results to the discussion
              </h2>

              <p>
                Review how evidence should be presented in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-results"
                >
                  Lab Report Results guide
                </Link>
                , or review the complete report order in the{" "}
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
                Lab report discussion FAQ
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
                Discussion checklist
              </p>
              <h2>Before writing the conclusion</h2>
              <ul>
                <li>State the main finding</li>
                <li>Interpret important patterns</li>
                <li>Connect evidence to scientific theory</li>
                <li>Evaluate the hypothesis</li>
                <li>Address anomalies and limitations</li>
                <li>Recommend specific improvements</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Accuracy analysis
              </p>
              <h2>Compare experimental and accepted values</h2>
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
