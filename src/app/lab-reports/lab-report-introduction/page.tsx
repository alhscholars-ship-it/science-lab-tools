import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Lab Report Introduction";
const pageDescription =
  "Learn how to write a lab report introduction with scientific background, a clear objective, variables, a research question, and a testable hypothesis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-introduction",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-introduction"),
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
    question: "What should a lab report introduction include?",
    answer:
      "It should include relevant scientific background, the investigation objective, research question, variables, and a testable hypothesis when required.",
  },
  {
    question: "How long should a lab report introduction be?",
    answer:
      "It should be long enough to explain the necessary scientific context without including unrelated theory or detailed procedural steps.",
  },
  {
    question: "Should the procedure appear in the introduction?",
    answer:
      "Only a brief overview may be included. Detailed equipment and procedural steps belong in the materials and methods section.",
  },
  {
    question: "Where should the hypothesis appear?",
    answer:
      "The hypothesis normally appears near the end of the introduction after the scientific background and research question.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-introduction"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-introduction",
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

export default function LabReportIntroductionPage() {
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
                Lab Report Introduction
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Report section guide</p>
            <h1>How to Write a Lab Report Introduction</h1>
            <p>
              Build a focused introduction that explains the science,
              defines the investigation, and leads to a testable
              hypothesis.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section>
              <p className="eyebrow">Purpose</p>
              <h2>What does a lab report introduction do?</h2>

              <p>
                The introduction gives readers the scientific context
                needed to understand the investigation. It explains
                the relevant principles, identifies the problem, and
                states what the experiment was designed to determine.
              </p>

              <p>
                A strong introduction moves from general scientific
                background to the specific research question. It
                should not repeat the complete procedure.
              </p>
            </section>

            <section>
              <p className="eyebrow">Recommended structure</p>
              <h2>Five parts of a strong introduction</h2>

              <ol className="calculation-steps">
                <li>Introduce the scientific topic.</li>
                <li>Explain relevant scientific principles.</li>
                <li>State the investigation objective.</li>
                <li>Identify the research question and variables.</li>
                <li>Present a testable hypothesis.</li>
              </ol>
            </section>

            <section>
              <p className="eyebrow">Scientific background</p>
              <h2>Include only relevant scientific theory</h2>

              <p>
                Define important concepts, relationships, equations,
                or mechanisms that directly support the investigation.
                Remove information that does not help the reader
                understand the experiment.
              </p>

              <ul className="article-list">
                <li>Define the main scientific concept.</li>
                <li>Explain how the variables are related.</li>
                <li>Include relevant equations when necessary.</li>
                <li>Cite scientific information from other sources.</li>
              </ul>
            </section>

            <section>
              <p className="eyebrow">Objective</p>
              <h2>State what the investigation will determine</h2>

              <div className="formula-card">
                <p>
                  Objective example
                  <span>
                    To determine how solution temperature affects the
                    rate of a chemical reaction.
                  </span>
                </p>
              </div>
            </section>

            <section>
              <p className="eyebrow">Research question</p>
              <h2>Write a focused and measurable question</h2>

              <p>
                The question should identify the experimental system,
                the independent variable, and the dependent variable.
              </p>

              <div className="formula-card">
                <p>
                  Example question
                  <span>
                    How does solution temperature affect reaction time?
                  </span>
                </p>
              </div>
            </section>

            <section>
              <p className="eyebrow">Variables</p>
              <h2>Identify what changes and what is measured</h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Independent variable
                  </p>
                  <h3>What is deliberately changed</h3>
                  <p>
                    The factor selected and controlled by the
                    investigator.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Dependent variable
                  </p>
                  <h3>What is measured</h3>
                  <p>
                    The response recorded during the investigation.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <p className="eyebrow">Hypothesis</p>
              <h2>Make a testable scientific prediction</h2>

              <div className="formula-card">
                <p>
                  Hypothesis structure
                  <span>
                    If [independent variable changes], then [dependent
                    variable will change], because [scientific reason].
                  </span>
                </p>
              </div>

              <p>
                The hypothesis does not need to be correct. It must be
                specific enough to evaluate using experimental
                evidence.
              </p>
            </section>

            <section>
              <p className="eyebrow">Common mistakes</p>
              <h2>Introduction problems to avoid</h2>

              <ul className="article-list">
                <li>Including unrelated scientific theory.</li>
                <li>Repeating the full procedure.</li>
                <li>Leaving the objective unclear.</li>
                <li>Writing a hypothesis that cannot be tested.</li>
                <li>Confusing independent and dependent variables.</li>
                <li>Using scientific claims without citations.</li>
              </ul>
            </section>

            <section>
              <p className="eyebrow">Related guides</p>
              <h2>Continue building the report</h2>

              <p>
                Review the complete section order in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-format"
                >
                  Lab Report Format guide
                </Link>
                , or follow the complete workflow in{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/how-to-write-a-lab-report"
                >
                  How to Write a Lab Report
                </Link>
                .
              </p>
            </section>

            <section>
              <p className="eyebrow">Questions and answers</p>
              <h2>Lab report introduction FAQ</h2>

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
                Introduction checklist
              </p>
              <h2>Before writing methods</h2>
              <ul>
                <li>Explain relevant science</li>
                <li>State the objective</li>
                <li>Write the research question</li>
                <li>Identify variables</li>
                <li>Present a testable hypothesis</li>
                <li>Cite scientific sources</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Related calculator
              </p>
              <h2>Analyze experimental accuracy</h2>
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
