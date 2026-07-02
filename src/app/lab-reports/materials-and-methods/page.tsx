import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Materials and Methods in a Lab Report";
const pageDescription =
  "Learn how to write the materials and methods section of a lab report, including equipment, variables, measurements, procedure, repeated trials, and safety details.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/materials-and-methods",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/materials-and-methods"),
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
    question: "What belongs in the materials and methods section?",
    answer:
      "It should identify important materials and equipment and explain the experimental procedure, measurements, variables, conditions, repeated trials, and relevant safety precautions.",
  },
  {
    question: "Should the methods section be written in past tense?",
    answer:
      "Completed experimental actions are normally written in past tense because the section describes what was done.",
  },
  {
    question: "How detailed should the procedure be?",
    answer:
      "It should contain enough relevant detail for another person to understand and reproduce the investigation without including unnecessary routine information.",
  },
  {
    question: "Should results be included in the methods section?",
    answer:
      "No. The methods section explains how evidence was collected. Observations, measurements, and calculated outcomes belong in the results section.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/materials-and-methods"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/materials-and-methods",
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

export default function MaterialsAndMethodsPage() {
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
                Materials and Methods
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Report section guide</p>
            <h1>Materials and Methods in a Lab Report</h1>
            <p>
              Document equipment, variables, measurements, and
              procedures clearly enough for the investigation to be
              understood and repeated.
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
                What does the methods section explain?
              </h2>

              <p>
                The materials and methods section explains how the
                investigation was performed and how evidence was
                collected. Its main purpose is reproducibility.
              </p>

              <p>
                Another student or researcher should be able to
                understand the experimental design, identify the
                important variables, and repeat the procedure under
                comparable conditions.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Recommended structure</p>
              <h2 id="structure-heading">
                What to include in materials and methods
              </h2>

              <ol className="calculation-steps">
                <li>Important materials and equipment</li>
                <li>Independent, dependent, and controlled variables</li>
                <li>Experimental conditions and quantities</li>
                <li>Procedure in logical order</li>
                <li>Measurement and recording methods</li>
                <li>Repeated trials and sample size</li>
                <li>Relevant safety precautions</li>
              </ol>
            </section>

            <section aria-labelledby="materials-heading">
              <p className="eyebrow">Materials</p>
              <h2 id="materials-heading">
                Identify important equipment and substances
              </h2>

              <p>
                Include equipment and materials that affect how the
                experiment is performed or interpreted. Record useful
                specifications such as capacity, concentration,
                precision, or model when they matter.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Useful detail
                  </p>
                  <h3>Specific description</h3>
                  <p>
                    50 mL graduated cylinder with 1 mL divisions.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Too general
                  </p>
                  <h3>Unclear description</h3>
                  <p>Measuring equipment.</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="variables-heading">
              <p className="eyebrow">Experimental design</p>
              <h2 id="variables-heading">
                Explain how variables were managed
              </h2>

              <ul className="article-list">
                <li>
                  State how the independent variable was changed.
                </li>
                <li>
                  Explain how the dependent variable was measured.
                </li>
                <li>
                  Identify important controlled variables.
                </li>
                <li>
                  Describe how controlled conditions were maintained.
                </li>
                <li>
                  Include a control group or control treatment when
                  relevant.
                </li>
              </ul>
            </section>

            <section aria-labelledby="procedure-heading">
              <p className="eyebrow">Procedure</p>
              <h2 id="procedure-heading">
                Describe the process in logical order
              </h2>

              <p>
                Write the procedure in the sequence it was performed.
                Include quantities, times, temperatures, distances,
                concentrations, and other conditions needed to
                reproduce the investigation.
              </p>

              <div className="formula-card">
                <p>
                  Clear method sentence
                  <span>
                    The solution was heated to 40°C and maintained at
                    that temperature for five minutes before the
                    reaction was started.
                  </span>
                </p>
              </div>

              <p>
                Avoid vague phrases such as “some solution was heated”
                or “the results were measured.” State exactly what was
                measured and how.
              </p>
            </section>

            <section aria-labelledby="measurements-heading">
              <p className="eyebrow">Data collection</p>
              <h2 id="measurements-heading">
                Explain how measurements were recorded
              </h2>

              <ul className="article-list">
                <li>
                  Identify the instrument used for each measurement.
                </li>
                <li>
                  Include measurement units and relevant precision.
                </li>
                <li>
                  Explain when measurements were taken.
                </li>
                <li>
                  State how qualitative observations were recorded.
                </li>
                <li>
                  Describe any calculation used to process raw data.
                </li>
              </ul>
            </section>

            <section aria-labelledby="trials-heading">
              <p className="eyebrow">Reliability</p>
              <h2 id="trials-heading">
                Document repeated trials
              </h2>

              <p>
                Repeated measurements help reveal variation and reduce
                the influence of isolated errors. State how many
                trials were performed and whether an average or other
                summary value was calculated.
              </p>

              <p>
                Do not claim that repetition removes every source of
                error. Repeated trials mainly improve the reliability
                of measurements affected by random variation.
              </p>
            </section>

            <section aria-labelledby="safety-heading">
              <p className="eyebrow">Safety</p>
              <h2 id="safety-heading">
                Include relevant precautions
              </h2>

              <p>
                Mention precautions that are directly connected to
                hazards in the investigation. Identify the hazard,
                the risk it creates, and the action used to reduce
                that risk.
              </p>

              <div className="formula-card">
                <p>
                  Safety statement example
                  <span>
                    Safety goggles were worn when handling the acid
                    solution to reduce the risk of eye exposure from
                    splashes.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="style-heading">
              <p className="eyebrow">Writing style</p>
              <h2 id="style-heading">
                Use precise and objective language
              </h2>

              <ul className="article-list">
                <li>Describe completed actions in past tense.</li>
                <li>Use consistent scientific terminology.</li>
                <li>Report quantities with units.</li>
                <li>Avoid conversational instructions.</li>
                <li>Remove unnecessary routine actions.</li>
                <li>Do not interpret results in this section.</li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Methods-section problems to avoid
              </h2>

              <ul className="article-list">
                <li>Leaving out quantities or measurement units.</li>
                <li>Using vague equipment descriptions.</li>
                <li>Failing to identify controlled variables.</li>
                <li>Writing steps in the wrong order.</li>
                <li>Omitting repeated trials.</li>
                <li>Including results or conclusions.</li>
                <li>Listing hazards without explaining precautions.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Continue the lab report workflow
              </h2>

              <p>
                Review the scientific context in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-introduction"
                >
                  Lab Report Introduction guide
                </Link>
                , or review the complete section order in the{" "}
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
                Materials and methods FAQ
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
                Methods checklist
              </p>
              <h2>Before writing results</h2>
              <ul>
                <li>Identify important equipment</li>
                <li>Include quantities and units</li>
                <li>Explain variable control</li>
                <li>Describe measurements clearly</li>
                <li>State the number of trials</li>
                <li>Include relevant safety precautions</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Measurement tool
              </p>
              <h2>Calculate sample density</h2>
              <Link
                className="article-inline-link"
                href="/calculators/density-calculator"
              >
                Open Density Calculator
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
