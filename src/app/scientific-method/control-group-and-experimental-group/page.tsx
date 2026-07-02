import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Control Group and Experimental Group";
const pageDescription =
  "Learn the difference between control and experimental groups, why comparison groups matter, and how they strengthen scientific experiments.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/control-group-and-experimental-group",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/control-group-and-experimental-group",
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
    question: "What is a control group?",
    answer:
      "A control group provides a comparison condition and normally does not receive the treatment or independent variable being tested.",
  },
  {
    question: "What is an experimental group?",
    answer:
      "An experimental group receives the treatment, condition, or level of the independent variable being investigated.",
  },
  {
    question: "Does every experiment need a control group?",
    answer:
      "Not every investigation requires a separate control group, but a suitable comparison condition is often essential for interpreting cause and effect.",
  },
  {
    question: "Can an experiment have more than one experimental group?",
    answer:
      "Yes. Multiple experimental groups may receive different treatment levels so the investigator can compare a range of effects.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/control-group-and-experimental-group",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/control-group-and-experimental-group",
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

const designSteps = [
  {
    number: "01",
    title: "Define the treatment",
    description:
      "Identify the condition, substance, procedure, or variable level being tested.",
  },
  {
    number: "02",
    title: "Choose a comparison condition",
    description:
      "Decide what untreated, standard, baseline, or reference condition will provide a meaningful comparison.",
  },
  {
    number: "03",
    title: "Assign the groups",
    description:
      "Place subjects or samples into control and experimental groups using a fair method.",
  },
  {
    number: "04",
    title: "Keep other conditions consistent",
    description:
      "Ensure that groups differ mainly in the treatment being investigated.",
  },
  {
    number: "05",
    title: "Measure both groups equally",
    description:
      "Use the same instruments, timing, units, and procedures for every group.",
  },
  {
    number: "06",
    title: "Compare the outcomes",
    description:
      "Evaluate whether the experimental group differs meaningfully from the control group.",
  },
] as const;

export default function ControlAndExperimentalGroupPage() {
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
                Control and Experimental Groups
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Experimental comparison</p>
            <h1>Control Group and Experimental Group</h1>
            <p>
              Learn how comparison groups help isolate the effect of
              a treatment and strengthen scientific conclusions.
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
                Why experiments use comparison groups
              </h2>

              <p>
                A comparison group helps investigators determine
                whether an observed change is associated with the
                treatment or independent variable being tested.
              </p>

              <p>
                Without a suitable comparison, it may be difficult to
                separate the treatment effect from natural variation,
                environmental changes, measurement differences, or
                other influences.
              </p>
            </section>

            <section aria-labelledby="difference-heading">
              <p className="eyebrow">Group definitions</p>
              <h2 id="difference-heading">
                Control group vs experimental group
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Control group
                  </p>
                  <h3>Provides the baseline</h3>
                  <p>
                    The control group normally does not receive the
                    treatment or receives a standard reference
                    condition.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Experimental group
                  </p>
                  <h3>Receives the treatment</h3>
                  <p>
                    The experimental group receives the condition,
                    treatment, or independent-variable level being
                    tested.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="relationship-heading">
              <p className="eyebrow">Experimental logic</p>
              <h2 id="relationship-heading">
                The groups should differ mainly in one factor
              </h2>

              <div className="formula-card">
                <p>
                  Controlled comparison
                  <span>
                    Experimental group − control group =
                    estimated treatment effect
                  </span>
                </p>
              </div>

              <p>
                This comparison is strongest when important
                conditions are kept consistent and the treatment is
                the main planned difference between groups.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Design process</p>
              <h2 id="steps-heading">
                Six steps for setting up comparison groups
              </h2>

              <div className="report-format-list">
                {designSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`group-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`group-step-${step.number}`}>
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
                Testing fertilizer and plant growth
              </h2>

              <div className="formula-card">
                <p>
                  Research question
                  <span>
                    How does fertilizer treatment affect the weekly
                    height increase of bean plants?
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Control group: plants receiving no fertilizer
                </li>
                <li>
                  Experimental group: plants receiving the fertilizer
                </li>
                <li>
                  Dependent variable: weekly height increase
                </li>
                <li>
                  Controlled variables: species, soil, water, light,
                  pot size, temperature, and investigation duration
                </li>
              </ul>
            </section>

            <section aria-labelledby="chemistry-example-heading">
              <p className="eyebrow">Chemistry example</p>
              <h2 id="chemistry-example-heading">
                Testing a catalyst
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Control condition
                  </p>
                  <h3>Reaction without catalyst</h3>
                  <p>
                    The reaction is performed under the same
                    conditions without adding the catalyst.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Experimental condition
                  </p>
                  <h3>Reaction with catalyst</h3>
                  <p>
                    The same reaction is performed with a defined
                    amount of catalyst.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="positive-negative-heading">
              <p className="eyebrow">Control types</p>
              <h2 id="positive-negative-heading">
                Positive and negative controls
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Negative control
                  </p>
                  <h3>Expected to show no treatment effect</h3>
                  <p>
                    A negative control helps identify background
                    changes, contamination, or effects unrelated to
                    the treatment.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Positive control
                  </p>
                  <h3>Expected to produce a known response</h3>
                  <p>
                    A positive control helps confirm that the method,
                    equipment, or detection system can produce the
                    expected result.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="assignment-heading">
              <p className="eyebrow">Fair assignment</p>
              <h2 id="assignment-heading">
                Reduce bias when forming groups
              </h2>

              <p>
                Groups should be as similar as practical before the
                treatment begins. Random assignment can reduce
                systematic differences between groups.
              </p>

              <ul className="article-list">
                <li>
                  Use comparable subjects, samples, or materials.
                </li>
                <li>
                  Avoid assigning stronger or larger samples to one
                  group intentionally.
                </li>
                <li>
                  Use sufficient replication when possible.
                </li>
                <li>
                  Apply identical measurement procedures.
                </li>
                <li>
                  Record any unavoidable baseline differences.
                </li>
              </ul>
            </section>

            <section aria-labelledby="multiple-groups-heading">
              <p className="eyebrow">Treatment levels</p>
              <h2 id="multiple-groups-heading">
                Experiments may use several experimental groups
              </h2>

              <p>
                Multiple experimental groups can receive different
                treatment levels, concentrations, durations, or
                conditions. This helps reveal whether the response
                changes gradually or reaches an optimum.
              </p>

              <div className="formula-card">
                <p>
                  Example design
                  <span>
                    Control: 0% fertilizer → Group 1: 1% → Group 2:
                    2% → Group 3: 3%
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="not-required-heading">
              <p className="eyebrow">Design limits</p>
              <h2 id="not-required-heading">
                Not every investigation uses a separate control group
              </h2>

              <p>
                Some investigations compare several naturally
                occurring conditions, measure a physical relationship,
                or use each sample as its own baseline.
              </p>

              <p>
                The important requirement is a meaningful comparison
                that allows the research question to be answered.
              </p>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Comparison-group problems to avoid
              </h2>

              <ul className="article-list">
                <li>
                  Changing more than the treatment between groups.
                </li>
                <li>
                  Using different measurement methods for each group.
                </li>
                <li>
                  Selecting groups that differ before treatment.
                </li>
                <li>
                  Using too few samples or trials.
                </li>
                <li>
                  Failing to define the control condition clearly.
                </li>
                <li>
                  Assuming any difference must be caused by the
                  treatment.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Strengthen the experiment design
              </h2>

              <p>
                Identify the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/independent-dependent-controlled-variables"
                >
                  Independent, Dependent, and Controlled Variables
                </Link>
                , review the complete{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/steps-of-the-scientific-method"
                >
                  Steps of the Scientific Method
                </Link>
                , and organize the final report using the{" "}
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
                Control and experimental groups FAQ
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
                Group comparison
              </p>
              <h2>Check the design</h2>
              <ol>
                <li>Define the treatment</li>
                <li>Choose the baseline</li>
                <li>Assign comparable groups</li>
                <li>Keep conditions consistent</li>
                <li>Measure equally</li>
                <li>Compare outcomes</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Compare results
              </p>
              <h2>Calculate measurement difference</h2>
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
