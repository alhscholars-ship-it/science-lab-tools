import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Tables and Graphs in Lab Reports";
const pageDescription =
  "Learn how to create, label, format, and describe scientific tables and graphs clearly in laboratory reports.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports/tables-and-graphs",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl("/lab-reports/tables-and-graphs"),
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
    question: "What should a scientific data table include?",
    answer:
      "A scientific table should include a descriptive title, clearly labeled variables, measurement units, organized observations, and consistent numerical precision.",
  },
  {
    question: "Which variable goes on each graph axis?",
    answer:
      "The independent variable usually appears on the horizontal x-axis, while the dependent variable usually appears on the vertical y-axis.",
  },
  {
    question: "Should a lab report include both a table and a graph?",
    answer:
      "A table presents exact values, while a graph reveals patterns and relationships. Both may be useful when they provide different analytical value.",
  },
  {
    question: "Should tables and graphs repeat the same information?",
    answer:
      "They may use the same data, but the written report should not repeat every value. The paragraph should identify only the most important trends or comparisons.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/lab-reports/tables-and-graphs"),
  mainEntityOfPage: absoluteUrl(
    "/lab-reports/tables-and-graphs",
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

export default function TablesAndGraphsPage() {
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
              <li aria-current="page">Tables and Graphs</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Data presentation guide</p>
            <h1>Tables and Graphs in Lab Reports</h1>
            <p>
              Organize experimental data clearly and select visual
              formats that reveal scientific patterns accurately.
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
                Why are tables and graphs important?
              </h2>

              <p>
                Tables organize exact measurements, while graphs make
                relationships, trends, comparisons, and anomalies
                easier to identify.
              </p>

              <p>
                Effective data presentation allows readers to inspect
                the evidence without searching through unstructured
                measurements or lengthy paragraphs.
              </p>
            </section>

            <section aria-labelledby="table-heading">
              <p className="eyebrow">Scientific tables</p>
              <h2 id="table-heading">
                Components of a clear data table
              </h2>

              <ol className="calculation-steps">
                <li>A sequential table number</li>
                <li>A descriptive title</li>
                <li>Clearly identified variables</li>
                <li>Measurement units in headings</li>
                <li>Logically arranged observations</li>
                <li>Consistent decimal places</li>
                <li>Notes for necessary qualifications</li>
              </ol>
            </section>

            <section aria-labelledby="title-heading">
              <p className="eyebrow">Table titles</p>
              <h2 id="title-heading">
                Describe the variables and investigation
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Weak title
                  </p>
                  <h3>Results</h3>
                  <p>
                    This does not explain what measurements appear in
                    the table.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">
                    Strong title
                  </p>
                  <h3>
                    Reaction Time at Different Solution Temperatures
                  </h3>
                  <p>
                    This identifies the variables and experimental
                    relationship.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="headings-heading">
              <p className="eyebrow">Column headings</p>
              <h2 id="headings-heading">
                Put units in headings, not every cell
              </h2>

              <p>
                State each variable and its unit in the corresponding
                row or column heading. This keeps the table readable
                and ensures the unit applies consistently to all
                values.
              </p>

              <div className="formula-card">
                <p>
                  Recommended heading
                  <span>Temperature (°C)</span>
                </p>
              </div>

              <p>
                Avoid mixing units within one column. Convert values to
                a common unit before presenting or comparing them.
              </p>
            </section>

            <section aria-labelledby="precision-heading">
              <p className="eyebrow">Numerical consistency</p>
              <h2 id="precision-heading">
                Use consistent precision
              </h2>

              <ul className="article-list">
                <li>
                  Use consistent decimal places for measurements from
                  the same instrument.
                </li>
                <li>
                  Preserve meaningful trailing zeros.
                </li>
                <li>
                  Apply appropriate significant figures.
                </li>
                <li>
                  Align values so they are easy to compare.
                </li>
                <li>
                  Distinguish missing values from measured zeros.
                </li>
              </ul>
            </section>

            <section aria-labelledby="graph-choice-heading">
              <p className="eyebrow">Graph selection</p>
              <h2 id="graph-choice-heading">
                Choose a graph that matches the variables
              </h2>

              <div className="report-format-list">
                <section className="report-format-card">
                  <span className="report-format-card__number">01</span>
                  <div>
                    <h3>Scatter or line graph</h3>
                    <p>
                      Use for relationships between continuous
                      numerical variables.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">02</span>
                  <div>
                    <h3>Bar graph</h3>
                    <p>
                      Use to compare separate categories or treatment
                      groups.
                    </p>
                  </div>
                </section>

                <section className="report-format-card">
                  <span className="report-format-card__number">03</span>
                  <div>
                    <h3>Histogram</h3>
                    <p>
                      Use to display the frequency distribution of
                      continuous measurements.
                    </p>
                  </div>
                </section>
              </div>
            </section>

            <section aria-labelledby="axes-heading">
              <p className="eyebrow">Graph axes</p>
              <h2 id="axes-heading">
                Position variables correctly
              </h2>

              <div className="comparison-grid">
                <div className="comparison-card">
                  <p className="comparison-card__label">X-axis</p>
                  <h3>Independent variable</h3>
                  <p>
                    The deliberately changed or selected variable
                    normally appears on the horizontal axis.
                  </p>
                </div>

                <div className="comparison-card">
                  <p className="comparison-card__label">Y-axis</p>
                  <h3>Dependent variable</h3>
                  <p>
                    The measured response normally appears on the
                    vertical axis.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="graph-format-heading">
              <p className="eyebrow">Graph formatting</p>
              <h2 id="graph-format-heading">
                Label every graph completely
              </h2>

              <ul className="article-list">
                <li>Give the graph a descriptive title.</li>
                <li>Label both axes with variables and units.</li>
                <li>Use a clear and evenly spaced scale.</li>
                <li>Plot points accurately.</li>
                <li>
                  Include a legend when multiple data series appear.
                </li>
                <li>
                  Add error bars when uncertainty data are available.
                </li>
                <li>
                  Number the figure for reference in the report.
                </li>
              </ul>
            </section>

            <section aria-labelledby="best-fit-heading">
              <p className="eyebrow">Trend analysis</p>
              <h2 id="best-fit-heading">
                Use a suitable line or curve of best fit
              </h2>

              <p>
                A best-fit line or curve represents the overall
                relationship in the data. It should reflect the trend
                rather than connect every point mechanically.
              </p>

              <p>
                Do not force a line through the origin unless theory,
                experimental design, or assignment requirements
                justify that choice.
              </p>
            </section>

            <section aria-labelledby="captions-heading">
              <p className="eyebrow">Captions and references</p>
              <h2 id="captions-heading">
                Refer to tables and figures in the text
              </h2>

              <p>
                Number tables and figures separately and refer to them
                by number when describing important patterns.
              </p>

              <div className="formula-card">
                <p>
                  Example reference
                  <span>
                    As shown in Figure 1, reaction time decreased as
                    solution temperature increased.
                  </span>
                </p>
              </div>
            </section>

            <section aria-labelledby="description-heading">
              <p className="eyebrow">Written analysis</p>
              <h2 id="description-heading">
                Describe patterns without repeating every value
              </h2>

              <p>
                The text should identify the principal trend,
                comparison, maximum, minimum, or anomaly. Readers can
                obtain exact values directly from the table or graph.
              </p>

              <ul className="article-list">
                <li>Identify the direction of the relationship.</li>
                <li>Reference selected evidence.</li>
                <li>Describe unusual data points.</li>
                <li>Avoid listing every observation again.</li>
                <li>Reserve detailed explanation for the discussion.</li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Data-presentation problems to avoid
              </h2>

              <ul className="article-list">
                <li>Missing titles or units.</li>
                <li>Placing variables on the wrong axes.</li>
                <li>Using an inappropriate graph type.</li>
                <li>Applying inconsistent numerical precision.</li>
                <li>Using misleading axis scales.</li>
                <li>Connecting every point without justification.</li>
                <li>Repeating all table values in paragraph form.</li>
              </ul>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related guides</p>
              <h2 id="related-heading">
                Present experimental evidence professionally
              </h2>

              <p>
                Review how data belong in the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/lab-report-results"
                >
                  Lab Report Results guide
                </Link>
                , and apply appropriate precision using the{" "}
                <Link
                  className="article-inline-link"
                  href="/lab-reports/significant-figures-in-lab-reports"
                >
                  Significant Figures guide
                </Link>
                .
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">
                Tables and graphs FAQ
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
                Presentation checklist
              </p>
              <h2>Before submitting results</h2>
              <ul>
                <li>Number tables and figures</li>
                <li>Write descriptive titles</li>
                <li>Label variables and units</li>
                <li>Use consistent precision</li>
                <li>Select appropriate graph types</li>
                <li>Reference visuals in the text</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Data calculation
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
