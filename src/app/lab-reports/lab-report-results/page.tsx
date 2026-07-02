import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Lab Report Results Section";
const pageDescription =
  "Learn how to write a lab report results section using organized observations, measurements, tables, graphs, calculations, units, and significant figures.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/lab-report-results",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/lab-report-results"),
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
    question: "What belongs in a lab report results section?",
    answer:
      "The results section should include relevant measurements, observations, tables, graphs, calculated values, units, and concise descriptions of important patterns.",
  },
  {
    question: "Should results be explained in this section?",
    answer:
      "The results section may identify patterns, but detailed scientific explanation and interpretation normally belong in the discussion section.",
  },
  {
    question: "Should raw data be included?",
    answer:
      "Important raw measurements should be presented in organized tables. Large data sets may be placed in an appendix when assignment requirements allow.",
  },
  {
    question: "How should tables and graphs be labeled?",
    answer:
      "Each table and graph should have a descriptive number or title, clearly labeled variables, and the correct measurement units.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/lab-report-results"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/lab-report-results",
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

export default function LabReportResultsPage() {
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
                Lab Report Results
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Report section guide</p>
            <h1>How to Write a Lab Report Results Section</h1>
            <p>
              Present experimental evidence clearly using organized
              measurements, observations, calculations, tables, and
              graphs.
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
                What does the results section do?
              </h2>

              <p>
                The results section presents the evidence produced by
                the investigation. It records what was measured,
                observed, and calculated without turning the section
                into a full scientific interpretation.
              </p>

              <p>
                Readers should be able to identify the major findings,
                examine the supporting data, and understand how the
                reported values were organized.
              </p>
            </section>

            <section aria-labelledby="include-heading">
              <p className="eyebrow">Core content</p>
              <h2 id="include-heading">
                What to include in the results section
              </h2>

              <ol className="calculation-steps">
                <li>Relevant raw measurements</li>
                <li>Qualitative observations</li>
                <li>Processed and calculated values</li>
                <li>Clearly labeled data tables</li>
                <li>Appropriate graphs and figures</li>
                <li>Measurement units</li>
                <li>Concise descriptions of major patterns</li>
              </ol>
            </section>

            <section aria-labelledby="observations-heading">
              <p className="eyebrow">Observations</p>
              <h2 id="observations-heading">
                Separate qualitative and quantitative evidence
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Quantitative data
                  </p>
                  <h3>Measured numerical values</h3>
                  <ul>
                    <li>Mass</li>
                    <li>Temperature</li>
                    <li>Time</li>
                    <li>Volume</li>
                    <li>Concentration</li>
                  </ul>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Qualitative data
                  </p>
                  <h3>Descriptive observations</h3>
                  <ul>
                    <li>Color change</li>
                    <li>Gas formation</li>
                    <li>Precipitate formation</li>
                    <li>Odor when safely observed</li>
                    <li>Texture or appearance</li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="tables-heading">
              <p className="eyebrow">Data tables</p>
              <h2 id="tables-heading">
                Organize measurements into clear tables
              </h2>

              <ul className="article-list">
                <li>Give each table a descriptive title.</li>
                <li>Place variables in clearly labeled columns.</li>
                <li>Include units in column headings.</li>
                <li>Use consistent decimal places.</li>
                <li>Keep repeated trials in a logical order.</li>
                <li>Include averages when they are relevant.</li>
              </ul>

              <div className="formula-card">
                <p>
                  Example heading
                  <span>
                    Table 1. Reaction Time at Different Temperatures
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="graphs-heading">
              <p className="eyebrow">Graphs</p>
              <h2 id="graphs-heading">
                Choose a graph that matches the data
              </h2>

              <p>
                Graphs should make relationships and trends easier to
                identify. The independent variable normally appears
                on the horizontal axis, while the dependent variable
                appears on the vertical axis.
              </p>

              <ul className="article-list">
                <li>Use a descriptive graph title.</li>
                <li>Label both axes with variable names and units.</li>
                <li>Select a scale that uses the graph area effectively.</li>
                <li>Plot points accurately.</li>
                <li>Add a line or curve of best fit when appropriate.</li>
                <li>Include a legend when multiple data series appear.</li>
              </ul>
            </section>

            <section aria-labelledby="calculations-heading">
              <p className="eyebrow">Calculations</p>
              <h2 id="calculations-heading">
                Report processed values transparently
              </h2>

              <p>
                Calculated values may include averages, percentage
                error, percentage difference, density, molarity, or
                other quantities required by the investigation.
              </p>

              <p>
                Show at least one representative calculation when the
                method is not obvious. Include the formula,
                substituted values, and final unit.
              </p>

              <div className="formula-card">
                <p>
                  Calculation format
                  <span>
                    Formula → substituted values → calculated result
                    with unit
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="precision-heading">
              <p className="eyebrow">Precision</p>
              <h2 id="precision-heading">
                Use consistent significant figures and units
              </h2>

              <ul className="article-list">
                <li>
                  Preserve appropriate precision from the measuring
                  instrument.
                </li>
                <li>
                  Avoid reporting more decimal places than the data
                  support.
                </li>
                <li>
                  Use the same unit consistently within a table.
                </li>
                <li>
                  Convert mixed units before comparing values.
                </li>
                <li>
                  Round final answers rather than intermediate values
                  whenever practical.
                </li>
              </ul>
            </section>

            <section aria-labelledby="description-heading">
              <p className="eyebrow">Written summary</p>
              <h2 id="description-heading">
                Describe important patterns briefly
              </h2>

              <p>
                After presenting tables or graphs, identify the most
                important trend, maximum, minimum, comparison, or
                unexpected result. Refer to the relevant table or
                figure.
              </p>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Appropriate result statement
                  </p>
                  <h3>Describe the pattern</h3>
                  <p>
                    Reaction time decreased as solution temperature
                    increased from 20°C to 50°C.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Discussion statement
                  </p>
                  <h3>Save interpretation for later</h3>
                  <p>
                    The reaction became faster because particles
                    collided more frequently.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Results-section problems to avoid
              </h2>

              <ul className="article-list">
                <li>Presenting unlabeled tables or graphs.</li>
                <li>Leaving measurement units out.</li>
                <li>Repeating every table value in paragraph form.</li>
                <li>Mixing results with detailed interpretation.</li>
                <li>Reporting excessive decimal places.</li>
                <li>Ignoring anomalous measurements.</li>
                <li>Including irrelevant raw data.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Continue the report workflow
              </h2>

              <p>
                Review how evidence was collected in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/materials-and-methods"
                >
                  Materials and Methods guide
                </Link>
                , or review the complete report sequence in the{" "}
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
                Lab report results FAQ
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
                Results checklist
              </p>
              <h2>Before writing discussion</h2>
              <ul>
                <li>Present relevant measurements</li>
                <li>Include qualitative observations</li>
                <li>Label tables and graphs</li>
                <li>Show units consistently</li>
                <li>Report calculated values</li>
                <li>Describe major patterns</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data-analysis tools
              </p>
              <h2>Calculate experimental comparisons</h2>
              <p>
                <Link
                  className="article-inline-link"
                  href="/calculators/percent-error-calculator"
                >
                  Percent Error Calculator
                </Link>
              </p>
              <p>
                <Link
                  className="article-inline-link"
                  href="/calculators/percent-difference-calculator"
                >
                  Percent Difference Calculator
                </Link>
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
