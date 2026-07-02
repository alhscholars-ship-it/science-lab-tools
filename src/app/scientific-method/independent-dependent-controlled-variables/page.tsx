import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle =
  "Independent, Dependent, and Controlled Variables";
const pageDescription =
  "Learn how to identify independent, dependent, and controlled variables in scientific experiments using clear definitions, examples, and practical checks.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/independent-dependent-controlled-variables",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/independent-dependent-controlled-variables",
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
    question: "What is an independent variable?",
    answer:
      "The independent variable is the factor deliberately changed, selected, or compared by the investigator.",
  },
  {
    question: "What is a dependent variable?",
    answer:
      "The dependent variable is the measured or observed response that may change because of the independent variable.",
  },
  {
    question: "What are controlled variables?",
    answer:
      "Controlled variables are important conditions kept consistent so they do not create alternative explanations for the results.",
  },
  {
    question: "Can an experiment have more than one dependent variable?",
    answer:
      "Yes, an investigation may measure several responses, but each dependent variable should be clearly defined and measured consistently.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/independent-dependent-controlled-variables",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/independent-dependent-controlled-variables",
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

const identificationSteps = [
  {
    number: "01",
    title: "Read the scientific question",
    description:
      "Identify the relationship or effect the investigation is designed to test.",
  },
  {
    number: "02",
    title: "Find what is changed",
    description:
      "The deliberately changed, selected, or compared factor is the independent variable.",
  },
  {
    number: "03",
    title: "Find what is measured",
    description:
      "The recorded response or outcome is the dependent variable.",
  },
  {
    number: "04",
    title: "List other influential conditions",
    description:
      "Identify factors that could affect the dependent variable if they changed.",
  },
  {
    number: "05",
    title: "Decide how controls will remain consistent",
    description:
      "Specify how each important controlled variable will be kept constant or managed.",
  },
] as const;

export default function VariablesPage() {
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
                Experimental Variables
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Experiment design</p>
            <h1>
              Independent, Dependent, and Controlled Variables
            </h1>
            <p>
              Learn how to identify what is changed, what is
              measured, and what must remain constant in a fair
              scientific investigation.
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
                Why variables matter in experiments
              </h2>

              <p>
                Variables define the structure of an experiment.
                They help investigators test one main relationship
                while reducing the influence of unrelated factors.
              </p>

              <p>
                A well-designed experiment clearly identifies the
                factor being changed, the response being measured,
                and the conditions that must remain consistent.
              </p>
            </section>

            <section aria-labelledby="variable-types-heading">
              <p className="eyebrow">Variable types</p>
              <h2 id="variable-types-heading">
                The three main types of variables
              </h2>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">
                    IV
                  </span>
                  <div>
                    <h3>Independent variable</h3>
                    <p>
                      The factor deliberately changed, selected, or
                      compared by the investigator.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">
                    DV
                  </span>
                  <div>
                    <h3>Dependent variable</h3>
                    <p>
                      The measured or observed response expected to
                      change because of the independent variable.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">
                    CV
                  </span>
                  <div>
                    <h3>Controlled variables</h3>
                    <p>
                      Important conditions kept consistent across
                      treatments, groups, or trials.
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Relationship</p>
              <h2 id="formula-heading">
                Connect the variables to the research question
              </h2>

              <div className="formula-card">
                <p>
                  Question structure
                  <span>
                    How does [independent variable] affect
                    [dependent variable] when [controlled variables]
                    are kept constant?
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Identification process</p>
              <h2 id="steps-heading">
                Five steps for identifying variables
              </h2>

              <div className="report-format-list">
                {identificationSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`variable-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`variable-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="plant-example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="plant-example-heading">
                Light duration and plant growth
              </h2>

              <div className="formula-card">
                <p>
                  Scientific question
                  <span>
                    How does daily light duration affect the height
                    increase of bean plants over three weeks?
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Independent variable: daily light duration
                </li>
                <li>
                  Dependent variable: increase in plant height
                </li>
                <li>
                  Controlled variables: plant species, starting size,
                  soil type, water volume, pot size, temperature, and
                  investigation duration
                </li>
              </ul>
            </section>

            <section aria-labelledby="chemistry-example-heading">
              <p className="eyebrow">Chemistry example</p>
              <h2 id="chemistry-example-heading">
                Concentration and reaction rate
              </h2>

              <div className="formula-card">
                <p>
                  Scientific question
                  <span>
                    How does reactant concentration affect the time
                    required for a reaction to finish?
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Independent variable: reactant concentration
                </li>
                <li>
                  Dependent variable: reaction completion time
                </li>
                <li>
                  Controlled variables: reactant volume, temperature,
                  apparatus, mixing method, and endpoint definition
                </li>
              </ul>
            </section>

            <section aria-labelledby="fair-test-heading">
              <p className="eyebrow">Fair testing</p>
              <h2 id="fair-test-heading">
                Why controlled variables are essential
              </h2>

              <p>
                If an important controlled variable changes, it may
                provide another explanation for the result. This
                makes it harder to determine whether the independent
                variable caused the observed effect.
              </p>

              <p>
                Controlled variables do not always remain perfectly
                constant, but investigators should manage them as
                consistently as practical and document important
                limitations.
              </p>
            </section>

            <section aria-labelledby="confounding-heading">
              <p className="eyebrow">Confounding factors</p>
              <h2 id="confounding-heading">
                Uncontrolled variables can weaken conclusions
              </h2>

              <p>
                A confounding variable changes alongside the
                independent variable and may also influence the
                dependent variable. This creates uncertainty about
                the real cause of the result.
              </p>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Weak design
                  </p>
                  <h3>Light and temperature both change</h3>
                  <p>
                    Plant groups receive different light durations
                    and different temperatures, so either factor may
                    affect growth.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Improved design
                  </p>
                  <h3>Only light duration changes</h3>
                  <p>
                    Temperature and other important conditions remain
                    consistent across all groups.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="measurement-heading">
              <p className="eyebrow">Measurement quality</p>
              <h2 id="measurement-heading">
                Define the dependent variable precisely
              </h2>

              <p>
                Avoid vague outcomes such as growth, success, or
                effectiveness unless they are defined using a clear
                measurement.
              </p>

              <ul className="article-list">
                <li>
                  Weak: measure plant growth
                </li>
                <li>
                  Better: measure height in centimeters every seven
                  days
                </li>
                <li>
                  Weak: measure reaction speed
                </li>
                <li>
                  Better: measure reaction completion time in seconds
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Variable-identification problems to avoid
              </h2>

              <ul className="article-list">
                <li>
                  Confusing the measured result with the changed
                  factor.
                </li>
                <li>
                  Changing several independent variables at once.
                </li>
                <li>
                  Listing irrelevant conditions as controlled
                  variables.
                </li>
                <li>
                  Failing to explain how controls will be maintained.
                </li>
                <li>
                  Using a dependent variable that cannot be measured
                  consistently.
                </li>
                <li>
                  Ignoring environmental or procedural differences
                  between groups.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Connect variables to the full investigation
              </h2>

              <p>
                Begin with a focused{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/scientific-question"
                >
                  Scientific Question
                </Link>
                , develop a testable{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/how-to-write-a-hypothesis"
                >
                  Hypothesis
                </Link>
                , and review the complete{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/steps-of-the-scientific-method"
                >
                  Steps of the Scientific Method
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Experimental variables FAQ
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
                Variable checklist
              </p>
              <h2>Identify the experiment structure</h2>
              <ol>
                <li>What is changed?</li>
                <li>What is measured?</li>
                <li>What must remain constant?</li>
                <li>How will each variable be managed?</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Record the experiment
              </p>
              <h2>Organize methods and results</h2>
              <Link
                className="article-inline-link"
                href="/lab-reports/lab-report-template"
              >
                Open Lab Report Template
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
