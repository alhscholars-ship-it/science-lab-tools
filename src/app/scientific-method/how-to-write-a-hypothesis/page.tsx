import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "How to Write a Hypothesis";
const pageDescription =
  "Learn how to write a clear, testable scientific hypothesis using independent and dependent variables, scientific reasoning, and practical examples.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical:
      "/scientific-method/how-to-write-a-hypothesis",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "article",
    url: absoluteUrl(
      "/scientific-method/how-to-write-a-hypothesis",
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
    question: "What is a scientific hypothesis?",
    answer:
      "A scientific hypothesis is a testable prediction about the expected relationship between variables, supported by scientific reasoning.",
  },
  {
    question: "Does a hypothesis have to be correct?",
    answer:
      "No. A hypothesis is evaluated using evidence. An unsupported hypothesis can still lead to useful conclusions and improved investigations.",
  },
  {
    question: "Should a hypothesis use an if-then-because format?",
    answer:
      "The if-then-because format is useful because it identifies the independent variable, dependent variable, and scientific reasoning, but other clear formats may also be acceptable.",
  },
  {
    question: "What is the difference between a hypothesis and a prediction?",
    answer:
      "A prediction states what is expected to happen, while a strong hypothesis also explains why that outcome is expected.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  url: absoluteUrl(
    "/scientific-method/how-to-write-a-hypothesis",
  ),
  mainEntityOfPage: absoluteUrl(
    "/scientific-method/how-to-write-a-hypothesis",
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

const hypothesisSteps = [
  {
    number: "01",
    title: "Review the scientific question",
    description:
      "Identify the exact relationship the investigation is designed to test.",
  },
  {
    number: "02",
    title: "Identify the independent variable",
    description:
      "Determine what factor will be deliberately changed, selected, or compared.",
  },
  {
    number: "03",
    title: "Identify the dependent variable",
    description:
      "Determine what response or outcome will be measured.",
  },
  {
    number: "04",
    title: "Predict the expected relationship",
    description:
      "State how the dependent variable is expected to respond when the independent variable changes.",
  },
  {
    number: "05",
    title: "Add scientific reasoning",
    description:
      "Explain the scientific principle, mechanism, or prior evidence supporting the prediction.",
  },
  {
    number: "06",
    title: "Check testability",
    description:
      "Confirm that the prediction can be evaluated using measurements, observations, and a practical experiment.",
  },
] as const;

export default function HypothesisPage() {
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
                How to Write a Hypothesis
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Scientific prediction
            </p>
            <h1>How to Write a Hypothesis</h1>
            <p>
              Build a testable prediction that connects variables
              and explains the expected outcome using scientific
              reasoning.
            </p>
          </div>
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="definition-heading">
              <p className="eyebrow">Definition</p>
              <h2 id="definition-heading">
                What is a scientific hypothesis?
              </h2>

              <p>
                A hypothesis is a testable explanation or prediction
                about the expected relationship between variables.
                It gives the experiment a clear direction and can be
                evaluated using evidence.
              </p>

              <p>
                A hypothesis should not be a random guess. It should
                be based on observations, background research,
                scientific principles, or previous evidence.
              </p>
            </section>

            <section aria-labelledby="structure-heading">
              <p className="eyebrow">Hypothesis structure</p>
              <h2 id="structure-heading">
                Use the if-then-because format
              </h2>

              <div className="formula-card">
                <p>
                  Hypothesis formula
                  <span>
                    If [independent variable changes], then
                    [dependent variable will change], because
                    [scientific reason].
                  </span>
                </p>
              </div>

              <p>
                This structure clearly separates the changed factor,
                the measured response, and the scientific explanation.
              </p>
            </section>

            <section aria-labelledby="steps-heading">
              <p className="eyebrow">Writing process</p>
              <h2 id="steps-heading">
                Six steps for writing a strong hypothesis
              </h2>

              <div className="report-format-list">
                {hypothesisSteps.map((step) => (
                  <section
                    className="report-format-card"
                    key={step.number}
                    aria-labelledby={`hypothesis-step-${step.number}`}
                  >
                    <span className="report-format-card__number">
                      {step.number}
                    </span>

                    <div>
                      <h3 id={`hypothesis-step-${step.number}`}>
                        {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">
                Scientific question to hypothesis
              </h2>

              <div className="comparison-grid">
                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Scientific question
                  </p>
                  <h3>
                    How does water temperature affect sugar
                    dissolving time?
                  </h3>
                  <p>
                    Independent variable: water temperature.
                    Dependent variable: time required to dissolve.
                  </p>
                </article>

                <article className="comparison-card">
                  <p className="comparison-card__label">
                    Hypothesis
                  </p>
                  <h3>
                    If water temperature increases, sugar will
                    dissolve in less time.
                  </h3>
                  <p>
                    This is expected because faster-moving water
                    particles interact more frequently with the
                    sugar.
                  </p>
                </article>
              </div>
            </section>

            <section aria-labelledby="quality-heading">
              <p className="eyebrow">Quality criteria</p>
              <h2 id="quality-heading">
                Characteristics of a strong hypothesis
              </h2>

              <ul className="article-list">
                <li>
                  It directly answers the scientific question.
                </li>
                <li>
                  It identifies the expected relationship between
                  variables.
                </li>
                <li>
                  It can be tested using measurable evidence.
                </li>
                <li>
                  It includes scientific reasoning.
                </li>
                <li>
                  It is specific and clearly worded.
                </li>
                <li>
                  It can be supported or not supported by results.
                </li>
              </ul>
            </section>

            <section aria-labelledby="examples-heading">
              <p className="eyebrow">Examples</p>
              <h2 id="examples-heading">
                Examples of scientific hypotheses
              </h2>

              <ul className="article-list">
                <li>
                  If daily light exposure increases, then plant
                  height will increase because more light supports
                  photosynthesis.
                </li>
                <li>
                  If ramp height increases, then a model car will
                  travel farther because it begins with greater
                  gravitational potential energy.
                </li>
                <li>
                  If reactant concentration increases, then reaction
                  rate will increase because particles collide more
                  frequently.
                </li>
                <li>
                  If exercise duration increases, then heart rate
                  will increase because working muscles require more
                  oxygen.
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">Common mistakes</p>
              <h2 id="mistakes-heading">
                Hypothesis problems to avoid
              </h2>

              <ul className="article-list">
                <li>
                  Writing a statement that cannot be tested.
                </li>
                <li>
                  Leaving out the independent or dependent variable.
                </li>
                <li>
                  Giving a prediction without scientific reasoning.
                </li>
                <li>
                  Using vague terms such as better, worse, or more
                  effective without defining a measurement.
                </li>
                <li>
                  Writing the hypothesis after seeing the final
                  results.
                </li>
                <li>
                  Claiming that the hypothesis must be proven.
                </li>
              </ul>
            </section>

            <section aria-labelledby="supported-heading">
              <p className="eyebrow">Evidence</p>
              <h2 id="supported-heading">
                Supported does not mean proven
              </h2>

              <p>
                Experimental evidence may support, partially support,
                or not support a hypothesis. One investigation rarely
                proves a general scientific explanation.
              </p>

              <p>
                An unsupported hypothesis is not automatically a
                failed experiment. It may reveal an incorrect
                assumption, an uncontrolled variable, a limitation,
                or a new scientific question.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">Related resources</p>
              <h2 id="related-heading">
                Build the complete investigation
              </h2>

              <p>
                Start with a focused{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/scientific-question"
                >
                  Scientific Question
                </Link>
                , review the full{" "}
                <Link
                  className="article-inline-link"
                  href="/scientific-method/steps-of-the-scientific-method"
                >
                  Steps of the Scientific Method
                </Link>
                , and organize the final investigation with the{" "}
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
              <h2 id="faq-heading">Hypothesis FAQ</h2>

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
                Hypothesis checklist
              </p>
              <h2>Include three parts</h2>
              <ol>
                <li>Independent variable</li>
                <li>Dependent variable</li>
                <li>Scientific reasoning</li>
              </ol>
            </div>

            <div className="sidebar-card">
              <p className="sidebar-card__label">
                Experimental accuracy
              </p>
              <h2>Compare measured and accepted values</h2>
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
