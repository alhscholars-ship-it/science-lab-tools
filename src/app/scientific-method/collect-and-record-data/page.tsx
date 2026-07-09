import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle =
  "How to Collect and Record Scientific Data";
const pageDescription =
  "Learn how to collect and record scientific data accurately using clear units, consistent intervals, organized tables, observations, and repeatable methods.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/collect-and-record-data",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/collect-and-record-data",
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
    question: "What is quantitative data?",
    answer:
      "Quantitative data consists of numerical measurements such as mass, time, temperature, volume, distance, or concentration.",
  },
  {
    question: "What is qualitative data?",
    answer:
      "Qualitative data consists of descriptive observations such as color, texture, odor, appearance, or behavior.",
  },
  {
    question: "Why should units be recorded with measurements?",
    answer:
      "Units define what a number represents and allow measurements to be interpreted, compared, and analyzed correctly.",
  },
  {
    question: "Why are repeated measurements useful?",
    answer:
      "Repeated measurements help reveal variation, identify unusual values, and improve confidence in the recorded evidence.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/collect-and-record-data",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/collect-and-record-data",
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

const collectionSteps = [
  {
    number: "01",
    title: "Define what will be measured",
    description:
      "Identify the dependent variable, observation criteria, measurement intervals, and required units.",
  },
  {
    number: "02",
    title: "Choose suitable instruments",
    description:
      "Use equipment with an appropriate range, resolution, precision, and calibration.",
  },
  {
    number: "03",
    title: "Prepare the data table",
    description:
      "Create headings, units, trial columns, and observation fields before the experiment begins.",
  },
  {
    number: "04",
    title: "Follow a consistent method",
    description:
      "Measure each group or trial using the same timing, instruments, procedures, and definitions.",
  },
  {
    number: "05",
    title: "Record data immediately",
    description:
      "Write measurements and observations directly into the table instead of relying on memory.",
  },
  {
    number: "06",
    title: "Include units and precision",
    description:
      "Record appropriate units and preserve meaningful measurement precision.",
  },
  {
    number: "07",
    title: "Repeat measurements",
    description:
      "Collect enough trials or samples to reveal variation and support reliable analysis.",
  },
  {
    number: "08",
    title: "Document unusual observations",
    description:
      "Record anomalies, equipment problems, procedural changes, and unexpected events.",
  },
] as const;

export default function CollectAndRecordDataPage() {
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
                Collect and Record Data
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Scientific evidence</p>
            <h1>How to Collect and Record Scientific Data</h1>
            <p>
              Gather accurate measurements and observations using
              consistent methods, suitable instruments, clear units,
              organized tables, and repeated trials.
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
                Why accurate data collection matters
              </h2>

              <p>
                Scientific conclusions depend on the quality of the
                evidence collected. Incomplete, inconsistent, or
                poorly recorded data can weaken even a well-designed
                experiment.
              </p>

              <p>
                Good data collection uses clear definitions,
                appropriate instruments, consistent procedures, and
                immediate recording.
              </p>
            </section>

            <section aria-labelledby="data-types-heading">
              <p className="eyebrow">Data types</p>
              <h2 id="data-types-heading">
                Quantitative and qualitative data
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Quantitative data
                  </p>
                  <h3>Numerical measurements</h3>
                  <p>
                    Includes values such as mass, time, temperature,
                    volume, distance, concentration, and rate.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Qualitative data
                  </p>
                  <h3>Descriptive observations</h3>
                  <p>
                    Includes color changes, texture, gas production,
                    appearance, odor, behavior, and visible patterns.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Collection process</p>
              <h2 id="steps-heading">
                Eight steps for collecting scientific data
              </h2>

              <div className="report-format-list">
                {collectionSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`data-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`data-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="instrument-heading">
              <p className="eyebrow">Measurement tools</p>
              <h2 id="instrument-heading">
                Select suitable instruments
              </h2>

              <ul className="article-list">
                <li>
                  Use a balance suitable for the expected mass range.
                </li>
                <li>
                  Use a thermometer with appropriate temperature
                  limits.
                </li>
                <li>
                  Use graduated glassware suitable for the required
                  volume.
                </li>
                <li>
                  Use a stopwatch or timer with adequate resolution.
                </li>
                <li>
                  Check zero settings and calibration where relevant.
                </li>
              </ul>
            </section>

            <section aria-labelledby="table-heading">
              <p className="eyebrow">Data tables</p>
              <h2 id="table-heading">
                Prepare a clear table before experimenting
              </h2>

              <div className="formula-card">
                <p>
                  Example table structure
                  <span>
                    Independent variable | Trial 1 | Trial 2 | Trial 3
                    | Mean | Observations
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Give the table a clear descriptive title.
                </li>
                <li>
                  Include variable names in column headings.
                </li>
                <li>
                  Place units in headings instead of repeating them in
                  every cell.
                </li>
                <li>
                  Keep decimal-place precision consistent where
                  appropriate.
                </li>
                <li>
                  Leave space for notes and unusual observations.
                </li>
              </ul>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Units and precision</p>
              <h2 id="units-heading">
                Record measurements correctly
              </h2>

              <p>
                A number without a unit is often incomplete. Units
                should match the instrument and remain consistent
                throughout the investigation.
              </p>

              <ul className="article-list">
                <li>Mass: grams or kilograms</li>
                <li>Time: seconds or minutes</li>
                <li>Temperature: degrees Celsius or kelvin</li>
                <li>Volume: milliliters or liters</li>
                <li>Length: millimeters, centimeters, or meters</li>
              </ul>
            </section>

            <section aria-labelledby="consistency-heading">
              <p className="eyebrow">Consistency</p>
              <h2 id="consistency-heading">
                Use the same method for every trial
              </h2>

              <p>
                Measurements should be collected under comparable
                conditions. Changing instruments, timing, observers,
                or endpoint definitions can introduce avoidable
                variation.
              </p>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Weak method
                  </p>
                  <h3>Different procedures between trials</h3>
                  <p>
                    Some trials use different timing, instruments, or
                    observation criteria.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Strong method
                  </p>
                  <h3>Standardized measurement procedure</h3>
                  <p>
                    Every trial uses the same tools, timing, units, and
                    endpoint definition.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="repetition-heading">
              <p className="eyebrow">Repeated trials</p>
              <h2 id="repetition-heading">
                Collect enough data to reveal variation
              </h2>

              <p>
                Repeated trials help distinguish consistent patterns
                from isolated unusual results. They also allow
                averages, ranges, and variation to be evaluated.
              </p>

              <p>
                Do not remove an unusual result simply because it does
                not match the others. Record it, investigate possible
                causes, and explain how it was handled.
              </p>
            </section>

            <section aria-labelledby="observations-heading">
              <p className="eyebrow">Observation notes</p>
              <h2 id="observations-heading">
                Record what measurements alone cannot show
              </h2>

              <ul className="article-list">
                <li>Unexpected color changes</li>
                <li>Gas formation or bubbling</li>
                <li>Equipment movement or leakage</li>
                <li>Delayed reactions</li>
                <li>Changes in texture or appearance</li>
                <li>Procedural interruptions</li>
                <li>Environmental changes</li>
              </ul>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Recording dissolving-time data
              </h2>

              <div className="formula-card">
                <p>
                  Investigation
                  <span>
                    Measure how water temperature affects the time
                    required for sugar to dissolve.
                  </span>
                </p>
              </div>

              <ul className="article-list">
                <li>
                  Independent variable: water temperature in °C
                </li>
                <li>
                  Dependent variable: dissolving time in seconds
                </li>
                <li>
                  Trials: three measurements at each temperature
                </li>
                <li>
                  Observations: note incomplete stirring, sugar
                  clumping, or temperature changes
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Data-recording problems to avoid
              </h2>

              <ul className="article-list">
                <li>Recording numbers without units.</li>
                <li>Writing results from memory after the experiment.</li>
                <li>Changing instruments between trials.</li>
                <li>Using inconsistent decimal places without reason.</li>
                <li>Ignoring qualitative observations.</li>
                <li>Removing anomalous values without explanation.</li>
                <li>Leaving empty or unclear table headings.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Connect data collection to experiment design
              </h2>

              <p>
                Plan the investigation using the{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/experimental-design"
                >
                  Experimental Design Guide
                </Link>
                , present evidence using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/tables-and-graphs"
                >
                  Tables and Graphs Guide
                </Link>
                , and preserve suitable precision with the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  Significant Figures Guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Scientific data collection FAQ
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
                Data checklist
              </p>
              <h2>Record reliable evidence</h2>
              <ol>
                <li>Define the measurement</li>
                <li>Choose the instrument</li>
                <li>Prepare the table</li>
                <li>Use consistent procedures</li>
                <li>Record immediately</li>
                <li>Include units</li>
                <li>Repeat trials</li>
                <li>Note anomalies</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Present the evidence
              </p>
              <h2>Create clear tables and graphs</h2>
              <Link
                className="article-inline-link"
                href="/lab-reports/tables-and-graphs"
              >
                Read Tables and Graphs Guide
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
