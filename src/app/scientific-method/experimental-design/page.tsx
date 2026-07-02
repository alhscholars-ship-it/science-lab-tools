import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Design a Scientific Experiment";
const pageDescription =
  "Learn how to design a fair, repeatable scientific experiment using variables, controls, trials, measurements, safety precautions, and clear procedures.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/scientific-method/experimental-design",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/experimental-design",
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
    question: "What makes an experiment fair?",
    answer:
      "A fair experiment changes one main independent variable, measures the dependent variable consistently, and controls other important conditions.",
  },
  {
    question: "Why are repeated trials important?",
    answer:
      "Repeated trials help reveal variation, reduce the effect of unusual results, and improve the reliability of the evidence.",
  },
  {
    question: "What should an experimental procedure include?",
    answer:
      "A procedure should include materials, quantities, equipment, variables, measurements, timing, repeated trials, safety precautions, and a clear sequence of steps.",
  },
  {
    question: "Can an experiment be redesigned after testing?",
    answer:
      "Yes. Scientists often improve procedures, controls, measurements, sample sizes, or variable ranges after evaluating limitations.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/experimental-design",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/experimental-design",
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
    title: "Define the research question",
    description:
      "Write a focused and measurable question that identifies the relationship being tested.",
  },
  {
    number: "02",
    title: "Develop a hypothesis",
    description:
      "Predict the expected outcome and explain the scientific reasoning behind it.",
  },
  {
    number: "03",
    title: "Identify the variables",
    description:
      "Define the independent variable, dependent variable, and important controlled variables.",
  },
  {
    number: "04",
    title: "Choose groups or conditions",
    description:
      "Plan the control condition, experimental groups, treatment levels, or comparison categories.",
  },
  {
    number: "05",
    title: "Select materials and equipment",
    description:
      "Choose suitable tools, measurement instruments, quantities, ranges, and safety equipment.",
  },
  {
    number: "06",
    title: "Write the procedure",
    description:
      "Describe the method in a logical sequence with enough detail for another person to repeat it.",
  },
  {
    number: "07",
    title: "Plan repeated trials",
    description:
      "Decide how many trials, samples, or repeated measurements are needed.",
  },
  {
    number: "08",
    title: "Plan data collection",
    description:
      "Prepare tables, units, measurement intervals, observation criteria, and recording methods.",
  },
  {
    number: "09",
    title: "Review safety and ethics",
    description:
      "Identify hazards, precautions, disposal requirements, and ethical limitations.",
  },
  {
    number: "10",
    title: "Test and refine the design",
    description:
      "Use a pilot trial when appropriate and improve unclear or unreliable parts of the method.",
  },
] as const;

export default function ExperimentalDesignPage() {
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
                Experimental Design
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Experiment planning</p>
            <h1>How to Design a Scientific Experiment</h1>
            <p>
              Plan a fair, measurable, repeatable, and safe
              investigation using clear variables, controls,
              procedures, trials, and data-recording methods.
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
                What is experimental design?
              </h2>

              <p>
                Experimental design is the planned structure of a
                scientific investigation. It explains what will be
                changed, what will be measured, what will remain
                constant, and how evidence will be collected.
              </p>

              <p>
                A strong design reduces bias, controls alternative
                explanations, produces usable data, and allows the
                method to be repeated.
              </p>
            </section>

            <section aria-labelledby="quality-heading">
              <p className="eyebrow">Design quality</p>
              <h2 id="quality-heading">
                Characteristics of a strong experiment
              </h2>

              <ul className="article-list">
                <li>
                  The research question is focused and testable.
                </li>
                <li>
                  The independent variable is changed systematically.
                </li>
                <li>
                  The dependent variable is measured consistently.
                </li>
                <li>
                  Important controlled variables are managed.
                </li>
                <li>
                  Suitable control or comparison conditions are used.
                </li>
                <li>
                  The method includes repeated trials.
                </li>
                <li>
                  Measurements use appropriate tools and units.
                </li>
                <li>
                  Safety and ethical requirements are addressed.
                </li>
              </ul>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Complete process</p>
              <h2 id="steps-heading">
                Ten steps for designing an experiment
              </h2>

              <div className="report-format-list">
                {designSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`design-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`design-step-${step.number}`}>
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
                Change one main factor at a time
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Independent variable
                  </p>
                  <h3>The factor changed</h3>
                  <p>
                    Plan a suitable range, level, category, or
                    treatment for the factor being tested.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Dependent variable
                  </p>
                  <h3>The response measured</h3>
                  <p>
                    Define exactly what will be measured, when it will
                    be measured, and which units will be used.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="controls-heading">
              <p className="eyebrow">Controls</p>
              <h2 id="controls-heading">
                Reduce alternative explanations
              </h2>

              <p>
                Controlled variables should remain as consistent as
                practical across groups and trials. A control group or
                reference condition may also provide a meaningful
                baseline.
              </p>

              <div className="formula-card">
                <p>
                  Fair-test principle
                  <span>
                    Change the independent variable → measure the
                    dependent variable → control other influences
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="procedure-heading">
              <p className="eyebrow">Procedure</p>
              <h2 id="procedure-heading">
                Write a method another person can repeat
              </h2>

              <ul className="article-list">
                <li>
                  List important materials and equipment.
                </li>
                <li>
                  Include quantities, concentrations, capacities, and
                  dimensions.
                </li>
                <li>
                  Describe equipment setup and calibration.
                </li>
                <li>
                  Explain how variables will be changed and measured.
                </li>
                <li>
                  Include timing, intervals, and endpoint definitions.
                </li>
                <li>
                  State the number of trials or samples.
                </li>
                <li>
                  Include relevant safety precautions.
                </li>
              </ul>
            </section>

            <section aria-labelledby="repetition-heading">
              <p className="eyebrow">Reliability</p>
              <h2 id="repetition-heading">
                Use repeated trials and suitable sample sizes
              </h2>

              <p>
                Repetition helps reveal natural variation and unusual
                results. It also allows averages and ranges to be
                calculated when appropriate.
              </p>

              <p>
                The number of repetitions depends on the investigation,
                available resources, expected variation, and required
                precision.
              </p>
            </section>

            <section aria-labelledby="measurement-heading">
              <p className="eyebrow">Measurement planning</p>
              <h2 id="measurement-heading">
                Choose suitable instruments and units
              </h2>

              <ul className="article-list">
                <li>
                  Select an instrument with a suitable measurement
                  range.
                </li>
                <li>
                  Use sufficient resolution for the expected changes.
                </li>
                <li>
                  Record units with every measured quantity.
                </li>
                <li>
                  Use the same method across all groups and trials.
                </li>
                <li>
                  Decide how uncertainty and significant figures will
                  be handled.
                </li>
              </ul>
            </section>

            <section aria-labelledby="data-heading">
              <p className="eyebrow">Data collection</p>
              <h2 id="data-heading">
                Prepare the data table before testing
              </h2>

              <p>
                A prepared table reduces missing measurements and
                inconsistent recording. Headings should identify
                variables and units clearly.
              </p>

              <div className="formula-card">
                <p>
                  Recommended table structure
                  <span>
                    Independent variable | Trial 1 | Trial 2 | Trial 3
                    | Mean | Observations
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="safety-heading">
              <p className="eyebrow">Safety and ethics</p>
              <h2 id="safety-heading">
                Identify risks before starting
              </h2>

              <ul className="article-list">
                <li>
                  Identify chemical, biological, electrical, thermal,
                  mechanical, and environmental hazards.
                </li>
                <li>
                  Use suitable personal protective equipment.
                </li>
                <li>
                  Define safe handling and disposal procedures.
                </li>
                <li>
                  Avoid unnecessary harm to organisms.
                </li>
                <li>
                  Follow institutional and laboratory instructions.
                </li>
              </ul>
            </section>

            <section aria-labelledby="pilot-heading">
              <p className="eyebrow">Pilot testing</p>
              <h2 id="pilot-heading">
                Test the method before the full experiment
              </h2>

              <p>
                A pilot trial can reveal unsuitable variable ranges,
                unclear endpoints, equipment problems, missing
                controls, or measurements that are too difficult to
                record accurately.
              </p>

              <p>
                Improvements should be documented before the complete
                investigation begins.
              </p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Designing a dissolving-rate experiment
              </h2>

              <div className="formula-card">
                <p>
                  Research question
                  <span>
                    How does water temperature affect the time required
                    for 10 g of sugar to dissolve?
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Independent variable: water temperature
                </li>
                <li>
                  Dependent variable: dissolving time in seconds
                </li>
                <li>
                  Controlled variables: sugar mass, water volume,
                  container, stirring method, and sugar type
                </li>
                <li>
                  Temperature levels: 20°C, 40°C, 60°C, and 80°C
                </li>
                <li>
                  Trials: at least three trials at each temperature
                </li>
                <li>
                  Safety: handle hot water carefully
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Experimental-design problems to avoid
              </h2>

              <ul className="article-list">
                <li>
                  Changing several variables simultaneously.
                </li>
                <li>
                  Using an unclear dependent-variable measurement.
                </li>
                <li>
                  Performing only one trial.
                </li>
                <li>
                  Using different procedures between groups.
                </li>
                <li>
                  Selecting an unsuitable variable range.
                </li>
                <li>
                  Ignoring safety risks or ethical limitations.
                </li>
                <li>
                  Writing a method that cannot be repeated.
                </li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Build the experiment step by step
              </h2>

              <p>
                Identify the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/independent-dependent-controlled-variables"
                >
                  Experimental Variables
                </Link>
                , establish suitable{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/control-group-and-experimental-group"
                >
                  Control and Experimental Groups
                </Link>
                , and organize the procedure using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/materials-and-methods"
                >
                  Materials and Methods Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Experimental design FAQ
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
                Design checklist
              </p>
              <h2>Plan before testing</h2>
              <ol>
                <li>Research question</li>
                <li>Hypothesis</li>
                <li>Variables</li>
                <li>Controls</li>
                <li>Materials</li>
                <li>Procedure</li>
                <li>Trials</li>
                <li>Data table</li>
                <li>Safety</li>
                <li>Pilot test</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Report preparation
              </p>
              <h2>Write a repeatable method</h2>
              <Link
                className="article-inline-link"
                href="/lab-reports/materials-and-methods"
              >
                Read Materials and Methods Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
