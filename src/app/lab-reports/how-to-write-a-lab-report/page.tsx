import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Lab Report";
const pageDescription =
  "Learn how to write a scientific lab report step by step, including the title, introduction, hypothesis, methods, results, discussion, conclusion, and references.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/how-to-write-a-lab-report",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/how-to-write-a-lab-report"),
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
    question: "What are the main sections of a lab report?",
    answer:
      "A standard lab report normally includes a title, introduction, hypothesis or objective, materials and methods, results, discussion, conclusion, and references.",
  },
  {
    question: "Should a lab report be written in past tense?",
    answer:
      "Methods and completed experimental actions are normally written in past tense. Established scientific principles may be written in present tense.",
  },
  {
    question: "What is the difference between results and discussion?",
    answer:
      "The results section presents observations, measurements, tables, graphs, and calculations. The discussion section explains what those results mean.",
  },
  {
    question: "Should raw data be included in a lab report?",
    answer:
      "Important raw data should be included in organized tables or appendices when required. The main results section should emphasize data needed to answer the investigation question.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/how-to-write-a-lab-report"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/how-to-write-a-lab-report",
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

export default function HowToWriteALabReportPage() {
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
                How to Write a Lab Report
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Complete student guide</p>
            <h1>How to Write a Lab Report</h1>
            <p>
              Learn how to organize experimental evidence into a
              clear, accurate, and reproducible scientific report.
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
                What is a laboratory report?
              </h2>

              <p>
                A laboratory report is a structured scientific
                document that explains why an investigation was
                performed, how it was completed, what evidence was
                collected, and what conclusions can be supported by
                that evidence.
              </p>

              <p>
                A strong report should allow another reader to
                understand the investigation and, where appropriate,
                repeat the procedure. It should distinguish clearly
                between observations, calculations, interpretation,
                and scientific conclusions.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Report structure</p>
              <h2 id="structure-heading">
                Standard sections of a lab report
              </h2>

              <ol className="calculation-steps">
                <li>Title</li>
                <li>Introduction and scientific background</li>
                <li>Objective, research question, or hypothesis</li>
                <li>Materials and methods</li>
                <li>Results</li>
                <li>Discussion</li>
                <li>Conclusion</li>
                <li>References and appendices when required</li>
              </ol>
            </section>

            <section aria-labelledby="title-heading">
              <p className="eyebrow">Section 1</p>
              <h2 id="title-heading">
                Write a specific report title
              </h2>

              <p>
                The title should identify the main variables,
                material, system, or scientific relationship being
                investigated. Avoid titles that are too general, such
                as “Chemistry Experiment” or “Physics Lab.”
              </p>

              <div className="formula-card">
                <p>
                  Strong title example
                  <span>
                    Effect of Temperature on the Rate of Enzyme
                    Activity
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="introduction-heading">
              <p className="eyebrow">Section 2</p>
              <h2 id="introduction-heading">
                Explain the scientific background
              </h2>

              <p>
                The introduction gives readers the scientific context
                needed to understand the investigation. Include only
                background information that directly supports the
                experiment.
              </p>

              <ul className="article-list">
                <li>Introduce the scientific topic.</li>
                <li>Define important terms and relationships.</li>
                <li>Explain the purpose of the investigation.</li>
                <li>State the research question or objective.</li>
                <li>
                  Present a testable hypothesis when one is required.
                </li>
              </ul>
            </section>

            <section aria-labelledby="hypothesis-heading">
              <p className="eyebrow">Section 3</p>
              <h2 id="hypothesis-heading">
                State a testable hypothesis
              </h2>

              <p>
                A hypothesis predicts how the independent variable
                will affect the dependent variable. It should be
                specific enough to test through measurement or
                observation.
              </p>

              <div className="formula-card">
                <p>
                  Useful structure
                  <span>
                    If [independent variable changes], then [dependent
                    variable will respond], because [scientific
                    reason].
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="methods-heading">
              <p className="eyebrow">Section 4</p>
              <h2 id="methods-heading">
                Document materials and methods
              </h2>

              <p>
                The methods section explains what was used and what
                was done. It should contain enough detail for another
                student or researcher to understand and repeat the
                investigation.
              </p>

              <ul className="article-list">
                <li>Identify important equipment and materials.</li>
                <li>Describe the procedure in logical order.</li>
                <li>Include quantities, units, and conditions.</li>
                <li>
                  Identify controlled, independent, and dependent
                  variables where relevant.
                </li>
                <li>
                  Mention repeated trials and important safety
                  precautions.
                </li>
              </ul>

              <p>
                Do not turn the methods section into a discussion of
                results. Describe the procedure without explaining
                whether the outcome was successful.
              </p>
            </section>

            <section aria-labelledby="results-heading">
              <p className="eyebrow">Section 5</p>
              <h2 id="results-heading">
                Present results clearly
              </h2>

              <p>
                The results section presents the evidence collected
                during the investigation. Include measurements,
                observations, calculated values, tables, and graphs
                needed to answer the research question.
              </p>

              <ul className="article-list">
                <li>Use descriptive table and graph titles.</li>
                <li>Label variables and include measurement units.</li>
                <li>Report calculations consistently.</li>
                <li>Apply appropriate significant figures.</li>
                <li>
                  Describe important patterns without fully
                  interpreting them.
                </li>
              </ul>
            </section>

            <section aria-labelledby="discussion-heading">
              <p className="eyebrow">Section 6</p>
              <h2 id="discussion-heading">
                Interpret the evidence in the discussion
              </h2>

              <p>
                The discussion explains what the results mean. This
                section should connect the evidence to scientific
                principles and evaluate the quality of the
                investigation.
              </p>

              <ul className="article-list">
                <li>Identify important trends and relationships.</li>
                <li>Explain whether the results support the hypothesis.</li>
                <li>Compare observations with scientific expectations.</li>
                <li>Discuss anomalies without hiding them.</li>
                <li>
                  Explain realistic limitations and their likely
                  effects.
                </li>
                <li>Recommend specific improvements.</li>
              </ul>
            </section>

            <section aria-labelledby="conclusion-heading">
              <p className="eyebrow">Section 7</p>
              <h2 id="conclusion-heading">
                Write an evidence-based conclusion
              </h2>

              <p>
                The conclusion directly answers the investigation
                question. It should summarize the principal finding
                and support that finding with relevant evidence.
              </p>

              <p>
                Avoid introducing new data or scientific ideas in the
                conclusion. Keep it focused on what the completed
                investigation demonstrates.
              </p>
            </section>

            <section aria-labelledby="editing-heading">
              <p className="eyebrow">Final review</p>
              <h2 id="editing-heading">
                Edit the report before submission
              </h2>

              <ul className="article-list">
                <li>Check that every section has a clear purpose.</li>
                <li>Verify numbers, units, equations, and labels.</li>
                <li>Separate results from interpretation.</li>
                <li>Use consistent scientific terminology.</li>
                <li>Remove unsupported claims.</li>
                <li>Check grammar, spelling, and citations.</li>
              </ul>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Lab report FAQ</h2>

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
                Report checklist
              </p>
              <h2>Before submission</h2>
              <ul>
                <li>Use a specific scientific title</li>
                <li>State the purpose clearly</li>
                <li>Document a reproducible method</li>
                <li>Present labeled data and units</li>
                <li>Interpret evidence separately</li>
                <li>Answer the research question</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Useful calculator
              </p>
              <h2>Analyze experimental error</h2>
              <p>
                Compare an experimental value with an accepted value.
              </p>
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
