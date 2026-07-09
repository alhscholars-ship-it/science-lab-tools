import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle =
  "Independent and Dependent Variables Worksheet";

const seoTitle =
  "Science Variables Worksheet";

const pageDescription =
  "Use this printable variables worksheet to identify independent, dependent, and controlled variables in scientific investigations and experimental scenarios.";

export const metadata: Metadata = {
  title: seoTitle,
  description: pageDescription,
  alternates: {
    canonical: "/templates/variables-worksheet",
  },
  openGraph: {
    title: `${seoTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/templates/variables-worksheet"),
  },
  twitter: {
    card: "summary_large_image",
    title: `${seoTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems = [
  {
    question: "What is an independent variable?",
    answer:
      "The independent variable is the factor deliberately changed by the investigator.",
  },
  {
    question: "What is a dependent variable?",
    answer:
      "The dependent variable is the factor measured or observed in response to the independent variable.",
  },
  {
    question: "What are controlled variables?",
    answer:
      "Controlled variables are factors kept constant so that the effect of the independent variable can be evaluated fairly.",
  },
  {
    question: "Can an experiment have more than one dependent variable?",
    answer:
      "An investigation may measure more than one response, but each dependent variable should be defined and recorded clearly.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/templates/variables-worksheet"),
  mainEntityOfPage: absoluteUrl(
    "/templates/variables-worksheet",
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

const scenarios = [
  {
    number: "01",
    title: "Plant growth and light",
    scenario:
      "A student places identical plants under different numbers of hours of light each day and measures their height after three weeks.",
  },
  {
    number: "02",
    title: "Water temperature and dissolving time",
    scenario:
      "A student measures how long the same mass of sugar takes to dissolve in water at different temperatures.",
  },
  {
    number: "03",
    title: "Ramp height and travel distance",
    scenario:
      "A toy car is released from different ramp heights, and the distance traveled across the floor is measured.",
  },
  {
    number: "04",
    title: "Fertilizer concentration and leaf number",
    scenario:
      "Plants receive different fertilizer concentrations while water, soil, pot size, and light are kept constant.",
  },
  {
    number: "05",
    title: "Exercise duration and heart rate",
    scenario:
      "A student exercises for different lengths of time and records heart rate immediately afterward.",
  },
  {
    number: "06",
    title: "Surface area and reaction rate",
    scenario:
      "Equal masses of a solid are used in different particle sizes, and the reaction time is measured.",
  },
] as const;

export default function VariablesWorksheetPage() {
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
                Variables Worksheet
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Printable experiment worksheet
            </p>
            <h1>
              Independent and Dependent Variables Worksheet
            </h1>
            <p>
              Practice identifying what is changed, what is measured,
              and what must remain constant in controlled scientific
              investigations.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">Variable review</p>
              <h2 id="overview-heading">
                Independent, dependent, and controlled variables
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Independent variable
                  </p>
                  <h3>What is changed</h3>
                  <p>
                    The factor deliberately changed between
                    experimental conditions.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Dependent variable
                  </p>
                  <h3>What is measured</h3>
                  <p>
                    The response measured or observed during the
                    investigation.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Controlled variables
                  </p>
                  <h3>What is kept constant</h3>
                  <p>
                    Factors maintained consistently to support a fair
                    comparison.
                  </p>
                </article>
              </div>
            </section>

            <section
              aria-labelledby="student-details-heading"
              className="template-print-section"
            >
              <p className="eyebrow">Student information</p>
              <h2 id="student-details-heading">
                Worksheet details
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

            <section aria-labelledby="practice-heading">
              <p className="eyebrow">Practice scenarios</p>
              <h2 id="practice-heading">
                Identify the experimental variables
              </h2>

              <div className="report-format-list">
                {scenarios.map((item) => (
                  <section
                    className="report-format-card template-print-section"
                    key={item.number}
                    aria-labelledby={`scenario-${item.number}`}
                  >
                    <span className="report-format-card__number">
                      {item.number}
                    </span>

                    <div>
                      <h3 id={`scenario-${item.number}`}>
                        {item.title}
                      </h3>

                      <p>{item.scenario}</p>

                      <p>
                        <strong>Independent variable</strong>
                      </p>
                      <div className="template-writing-area">
                        <span />
                        <span />
                      </div>

                      <p>
                        <strong>Dependent variable</strong>
                      </p>
                      <div className="template-writing-area">
                        <span />
                        <span />
                      </div>

                      <p>
                        <strong>Controlled variables</strong>
                      </p>
                      <div className="template-writing-area">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="design-heading">
              <p className="eyebrow">Create your own</p>
              <h2 id="design-heading">
                Design a variable-based investigation
              </h2>

              <div className="report-format-card template-print-section">
                <span className="report-format-card__number">
                  07
                </span>

                <div>
                  <h3>Write an investigation question</h3>

                  <div className="template-writing-area">
                    <span />
                    <span />
                    <span />
                  </div>

                  <p>
                    <strong>Independent variable</strong>
                  </p>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>

                  <p>
                    <strong>Dependent variable</strong>
                  </p>
                  <div className="template-writing-area">
                    <span />
                    <span />
                  </div>

                  <p>
                    <strong>Controlled variables</strong>
                  </p>
                  <div className="template-writing-area">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <p>
                    <strong>How will the result be measured?</strong>
                  </p>
                  <div className="template-writing-area">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="checklist-heading">
              <p className="eyebrow">Final review</p>
              <h2 id="checklist-heading">
                Variables identification checklist
              </h2>

              <ul className="article-list">
                <li>Only one main factor is deliberately changed.</li>
                <li>The measured response is clearly defined.</li>
                <li>Measurement units are identified.</li>
                <li>Important conditions are kept constant.</li>
                <li>The procedure allows a fair comparison.</li>
                <li>The investigation question is testable.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Continue planning the investigation
              </h2>

              <p>
                Review the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/independent-dependent-controlled-variables"
                >
                  Experimental Variables Guide
                </Link>
                , plan the method with the{" "}
                <Link
                  className="article-inline-link"
                  href="/templates/experiment-planning-template"
                >
                  Experiment Planning Template
                </Link>
                , and strengthen comparisons using the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/control-group-and-experimental-group"
                >
                  Control and Experimental Groups Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Experimental variables worksheet FAQ
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
                Quick identification
              </p>
              <h2>Ask three questions</h2>

              <ol>
                <li>What is deliberately changed?</li>
                <li>What is measured?</li>
                <li>What must remain constant?</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Supporting guide
              </p>
              <h2>Review experimental variables</h2>

              <Link
                className="article-inline-link"
                href="/scientific-method/independent-dependent-controlled-variables"
              >
                Open Variables Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
