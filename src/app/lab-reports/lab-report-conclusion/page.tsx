import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Lab Report Conclusion";
const pageDescription =
  "Learn how to write a concise lab report conclusion that answers the research question, summarizes key evidence, and evaluates the hypothesis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-conclusion",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-conclusion"),
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
    question: "What should a lab report conclusion include?",
    answer:
      "A conclusion should answer the research question, summarize the main finding, cite important evidence, and state whether the hypothesis was supported.",
  },
  {
    question: "How long should a lab report conclusion be?",
    answer:
      "It should be concise while still presenting the main finding and supporting evidence. Its exact length depends on the investigation and assignment requirements.",
  },
  {
    question: "Should limitations appear in the conclusion?",
    answer:
      "Detailed limitations normally belong in the discussion. A major limitation may be mentioned briefly only when it directly affects confidence in the conclusion.",
  },
  {
    question: "Can new results be added in the conclusion?",
    answer:
      "No. The conclusion should synthesize evidence already presented in the results and discussion rather than introduce new data.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-conclusion"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-conclusion",
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

export default function LabReportConclusionPage() {
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
                Lab Report Conclusion
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Report section guide</p>
            <h1>How to Write a Lab Report Conclusion</h1>
            <p>
              Finish the report with a direct answer, relevant
              evidence, and a clear evaluation of the hypothesis.
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
                What does a lab report conclusion do?
              </h2>

              <p>
                The conclusion states what the investigation
                demonstrated. It answers the research question and
                summarizes the evidence that supports the final
                scientific statement.
              </p>

              <p>
                A conclusion should not repeat the entire report. It
                should select the most important finding and explain
                how that finding relates to the objective or
                hypothesis.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Recommended structure</p>
              <h2 id="structure-heading">
                Four parts of a strong conclusion
              </h2>

              <ol className="calculation-steps">
                <li>Restate the investigation purpose</li>
                <li>Answer the research question directly</li>
                <li>Support the answer with key evidence</li>
                <li>Evaluate the hypothesis</li>
              </ol>
            </section>

            <section aria-labelledby="question-heading">
              <p className="eyebrow">Direct answer</p>
              <h2 id="question-heading">
                Answer the research question
              </h2>

              <p>
                Begin with the main relationship, comparison, or
                outcome established by the investigation. Use clear
                language and avoid vague statements such as “the
                experiment worked.”
              </p>

              <div className="formula-card">
                <p>
                  Direct conclusion statement
                  <span>
                    Increasing solution temperature decreased reaction
                    time and therefore increased the reaction rate.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="evidence-heading">
              <p className="eyebrow">Supporting evidence</p>
              <h2 id="evidence-heading">
                Include the most important result
              </h2>

              <p>
                Support the conclusion with selected numerical or
                observational evidence. Use only the values needed to
                demonstrate the main finding.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Weak conclusion
                  </p>
                  <h3>Unsupported statement</h3>
                  <p>
                    Higher temperature made the reaction faster.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Strong conclusion
                  </p>
                  <h3>Evidence-based statement</h3>
                  <p>
                    Reaction time decreased from 84 seconds at 20°C
                    to 31 seconds at 50°C.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="hypothesis-heading">
              <p className="eyebrow">Hypothesis</p>
              <h2 id="hypothesis-heading">
                State whether the evidence supported the prediction
              </h2>

              <p>
                Explain whether the results supported, partially
                supported, or did not support the hypothesis. Avoid
                saying that the hypothesis was proven because one
                investigation rarely establishes absolute certainty.
              </p>

              <div className="formula-card">
                <p>
                  Hypothesis evaluation
                  <span>
                    The hypothesis was supported because the measured
                    reaction time decreased consistently as
                    temperature increased.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="discussion-heading">
              <p className="eyebrow">Important distinction</p>
              <h2 id="discussion-heading">
                Conclusion versus discussion
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Discussion
                  </p>
                  <h3>Detailed interpretation</h3>
                  <ul>
                    <li>Scientific explanation</li>
                    <li>Anomalies</li>
                    <li>Limitations</li>
                    <li>Uncertainty</li>
                    <li>Improvements</li>
                  </ul>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Conclusion
                  </p>
                  <h3>Final scientific answer</h3>
                  <ul>
                    <li>Main finding</li>
                    <li>Research-question answer</li>
                    <li>Key evidence</li>
                    <li>Hypothesis evaluation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Scope</p>
              <h2 id="limitations-heading">
                Keep limitations brief
              </h2>

              <p>
                Detailed evaluation belongs in the discussion. Mention
                a limitation in the conclusion only when it directly
                changes how confidently the final answer can be stated.
              </p>

              <p>
                For example, a small sample size may mean the observed
                relationship should not be generalized beyond the
                tested conditions.
              </p>
            </section>

            <section aria-labelledby="template-heading">
              <p className="eyebrow">Writing framework</p>
              <h2 id="template-heading">
                Lab report conclusion structure
              </h2>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">01</span>
                  <div>
                    <h3>Purpose</h3>
                    <p>
                      This investigation examined whether...
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">02</span>
                  <div>
                    <h3>Main finding</h3>
                    <p>
                      The results showed that...
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">03</span>
                  <div>
                    <h3>Evidence</h3>
                    <p>
                      This was demonstrated by...
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">04</span>
                  <div>
                    <h3>Hypothesis</h3>
                    <p>
                      Therefore, the hypothesis was...
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Conclusion problems to avoid
              </h2>

              <ul className="article-list">
                <li>Introducing new results.</li>
                <li>Repeating the complete discussion.</li>
                <li>Making claims without evidence.</li>
                <li>Saying that the hypothesis was proven.</li>
                <li>Using vague statements about success.</li>
                <li>Ignoring the research question.</li>
                <li>Adding unrelated scientific information.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Review the evidence before concluding
              </h2>

              <p>
                Review the interpretation and limitations in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-discussion"
                >
                  Lab Report Discussion guide
                </Link>
                , or review the complete report structure in the{" "}
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
                Lab report conclusion FAQ
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
                Conclusion checklist
              </p>
              <h2>Before submitting the report</h2>
              <ul>
                <li>Answer the research question</li>
                <li>State the main finding</li>
                <li>Include relevant evidence</li>
                <li>Evaluate the hypothesis</li>
                <li>Avoid introducing new data</li>
                <li>Keep the conclusion concise</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Evidence check
              </p>
              <h2>Compare measured values</h2>
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
