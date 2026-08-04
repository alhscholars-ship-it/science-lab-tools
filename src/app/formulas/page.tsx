import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  formulaCategories,
  scienceFormulas,
} from "@/content/formulas/registry";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createFaqSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Science Formula Library";
const pageDescription =
  "Reference essential physics, chemistry, and laboratory formulas, understand every variable, and open a calculator to check your work.";
const pagePath = "/formulas";

const faqs = [
  {
    question: "How should I use a science formula?",
    answer:
      "Identify the known values, convert them to compatible units, substitute them into the equation, and keep extra digits until the final rounding step.",
  },
  {
    question: "Can I rearrange these formulas to solve for another variable?",
    answer:
      "Yes. Apply the same inverse operation to both sides of the equation until the unknown variable is isolated, then check that the resulting units make sense.",
  },
  {
    question: "Why can a calculator result differ from my manual answer?",
    answer:
      "Differences usually come from unit conversion, rounding too early, sign conventions, or using a formula outside its assumptions.",
  },
  {
    question: "Do these formulas replace experimental judgment?",
    answer:
      "No. A formula is a model. Always consider measurement uncertainty, significant figures, experimental conditions, and the assumptions behind the equation.",
  },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl(pagePath),
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  },
  robots: { index: true, follow: true },
};

const schemas = [
  createCollectionPageSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
    items: scienceFormulas.map((formula) => ({
      name: formula.name,
      href: `${pagePath}#${formula.slug}`,
    })),
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema({
    pageName: pageTitle,
    pagePath,
    parentName: "Calculators",
    parentPath: "/calculators",
  }),
];

export default function FormulasPage() {
  return (
    <main>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema),
          }}
        />
      ))}

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/calculators">Calculators</Link></li>
              <li aria-current="page">Formula Library</li>
            </ol>
          </nav>
          <div className="tool-page-hero__content">
            <p className="eyebrow">Quick-reference equations</p>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
          </div>
          <nav className="formula-jump-links" aria-label="Formula categories">
            {formulaCategories.map((category) => (
              <a key={category} href={`#${category.toLowerCase()}`}>
                {category} formulas
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="formula-guidance">
            <div>
              <p className="eyebrow">Use formulas accurately</p>
              <h2>Equation, units, substitution, check</h2>
            </div>
            <p>
              Choose the equation that matches the situation, use one consistent unit
              system, substitute known quantities, and verify that the answer has the
              expected dimensions. Each entry links to a working calculator for a
              faster independent check.
            </p>
            <p className="formula-guidance__links">
              Browse all <Link href="/physics-calculators">physics calculators</Link>,{" "}
              <Link href="/chemistry-calculators">chemistry calculators</Link>, or{" "}
              <Link href="/laboratory-calculators">laboratory calculators</Link>.
            </p>
          </div>

          {formulaCategories.map((category) => {
            const formulas = scienceFormulas.filter(
              (formula) => formula.category === category,
            );

            return (
              <section
                className="directory-category"
                id={category.toLowerCase()}
                key={category}
              >
                <div className="directory-category__heading">
                  <div>
                    <p className="eyebrow">{category} reference</p>
                    <h2>{category} Formulas</h2>
                  </div>
                  <span>{formulas.length} equations</span>
                </div>

                <div className="formula-library-grid">
                  {formulas.map((formula) => (
                    <article
                      className="formula-library-card"
                      id={formula.slug}
                      key={formula.slug}
                    >
                      <h3>{formula.name}</h3>
                      <p className="formula-library-card__equation">
                        {formula.equation}
                      </p>
                      <p>{formula.description}</p>
                      <dl>
                        <dt>Variables</dt>
                        <dd>{formula.variables.join("; ")}</dd>
                      </dl>
                      <Link href={formula.calculatorHref}>
                        Open calculator <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </section>

      <section className="article-section formula-faq-section">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Formula help</p>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
