import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { scienceFormulas } from "@/content/formulas/registry";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createFaqSchema,
  createFormulaSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

type FormulaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatCalculatorName(href: string) {
  return href
    .replace("/calculators/", "")
    .replace(/-calculator$/, " Calculator")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatGuideName(href: string) {
  return href
    .replace("/", "")
    .split("/")
    .pop()
    ?.replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Science Guide";
}

export function generateStaticParams() {
  return scienceFormulas.map((formula) => ({
    slug: formula.slug,
  }));
}

export async function generateMetadata({
  params,
}: FormulaPageProps): Promise<Metadata> {
  const { slug } = await params;

  const formula = scienceFormulas.find(
    (item) => item.slug === slug,
  );

  if (!formula) {
    return {};
  }

  const title = `${formula.name} Formula`;
  const description =
    `${formula.description} Learn the equation, variables, examples, ` +
    `applications, and use the calculator to verify results.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/formulas/${formula.slug}`,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/formulas/${formula.slug}`),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FormulaDetailPage({
  params,
}: FormulaPageProps) {
  const { slug } = await params;

  const formula = scienceFormulas.find(
    (item) => item.slug === slug,
  );

  if (!formula) {
    notFound();
  }

  const schemas = [
    createArticleSchema({
      headline: `${formula.name} Formula`,
      description: formula.description,
      path: `/formulas/${formula.slug}`,
    }),

    createBreadcrumbSchema({
      pageName: formula.name,
      pagePath: `/formulas/${formula.slug}`,
      parentName: "Formula Library",
      parentPath: "/formulas",
    }),

    createFormulaSchema({
      name: formula.name,
      description: formula.description,
      equation: formula.equation,
      path: `/formulas/${formula.slug}`,
    }),

    createFaqSchema([
      {
        question: `What is the ${formula.name} formula?`,
        answer: formula.description,
      },
      {
        question: "Where can I use this formula?",
        answer:
          formula.applications?.join(", ") ||
          "This formula can be applied in relevant science calculations.",
      },
    ]),
  ];

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
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            {" / "}
            <Link href="/formulas">Formulas</Link>
            {" / "}
            <Link href={`/formulas/category/${formula.category.toLowerCase()}`}>
              {formula.category} Formulas
            </Link>
            {" / "}
            <span>{formula.name}</span>
          </nav>

          <p className="eyebrow">
            {formula.category} Formula
          </p>

          <h1>{formula.name} Formula</h1>

          <p>{formula.description}</p>

          <p>
            <Link
              className="button button--primary"
              href={formula.calculatorHref}
            >
              Calculate with {formula.name} calculator →
            </Link>
          </p>
        </Container>
      </section>

      <section className="article-section">
        <Container>
          <div className="formula-summary">
            <p className="eyebrow">Formula Summary</p>
            <h2>{formula.name}</h2>
            <p>{formula.description}</p>

            <dl>
              <dt>Category</dt>
              <dd>{formula.category}</dd>

              <dt>Equation</dt>
              <dd>{formula.equation}</dd>

              <dt>Calculator</dt>
              <dd>
                <Link href={formula.calculatorHref}>
                  Use {formula.name} Calculator →
                </Link>
              </dd>
            </dl>
          </div>

          <h2>Equation</h2>
          <p>{formula.equation}</p>

          <h2>Variables</h2>
          <ul>
            {formula.variables.map((variable) => (
              <li key={variable}>{variable}</li>
            ))}
          </ul>

          {formula.units &&
            formula.units.length > 0 && (
              <>
                <h2>Units</h2>
                <ul>
                  {formula.units.map((unit) => (
                    <li key={unit}>{unit}</li>
                  ))}
                </ul>
              </>
            )}

          {formula.whenToUse && (
            <>
              <h2>When To Use This Formula</h2>
              <p>{formula.whenToUse}</p>
            </>
          )}

          {formula.rearranged &&
            formula.rearranged.length > 0 && (
              <>
                <h2>Rearranged Equations</h2>
                <ul>
                  {formula.rearranged.map((equation) => (
                    <li key={equation}>{equation}</li>
                  ))}
                </ul>
              </>
            )}

          <h2>How to Use This Formula</h2>
          <ol>
            <li>Identify the known values from the problem statement.</li>
            <li>Convert all values into compatible units.</li>
            <li>Substitute the values into the equation and calculate the result.</li>
            <li>Check that the final answer has the correct unit and meaning.</li>
          </ol>

          {formula.explanation && (
            <>
              <h2>Explanation</h2>
              <p>{formula.explanation}</p>
            </>
          )}

          {formula.example && (
            <>
              <h2>Worked Example</h2>
              <p>{formula.example}</p>
            </>
          )}

          {formula.commonMistakes &&
            formula.commonMistakes.length > 0 && (
              <>
                <h2>Common Mistakes</h2>
                <ul>
                  {formula.commonMistakes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

          {formula.applications &&
            formula.applications.length > 0 && (
              <>
                <h2>Applications</h2>
                <ul>
                  {formula.applications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}

          {formula.relatedFormulas &&
            formula.relatedFormulas.length > 0 && (
              <>
                <h2>Related Formulas</h2>
                <div className="formula-card-grid">
                  {formula.relatedFormulas.map((slug) => {
                    const relatedFormula = scienceFormulas.find(
                      (item) => item.slug === slug,
                    );

                    if (!relatedFormula) return null;

                    return (
                      <div className="formula-card" key={slug}>
                        <h3>{relatedFormula.name}</h3>
                        <p>{relatedFormula.equation}</p>
                        <p>{relatedFormula.description}</p>
                        <Link href={`/formulas/${slug}`}>
                          Learn formula →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          <section>
            <h2>More {formula.category} Formulas</h2>
            <div className="formula-card-grid">
              {scienceFormulas
                .filter(
                  (item) =>
                    item.category === formula.category &&
                    item.slug !== formula.slug,
                )
                .slice(0, 4)
                .map((item) => (
                  <div className="formula-card" key={item.slug}>
                    <h3>{item.name}</h3>
                    <p>{item.equation}</p>
                    <Link href={`/formulas/${item.slug}`}>
                      View formula →
                    </Link>
                  </div>
                ))}
            </div>
          </section>

          {formula.relatedCalculators &&
            formula.relatedCalculators.length > 0 && (
              <>
                <h2>Related Calculators</h2>
                <ul>
                  {formula.relatedCalculators.map((href) => (
                    <li key={href}>
                      <Link href={href}>
                        {formatCalculatorName(href)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

          {formula.relatedGuides &&
            formula.relatedGuides.length > 0 && (
              <>
                <h2>Related Guides</h2>
                <ul>
                  {formula.relatedGuides.map((href) => (
                    <li key={href}>
                      <Link href={href}>
                        {formatGuideName(href)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

          <Link
            className="button button--primary"
            href={formula.calculatorHref}
          >
            Open {formula.name} Calculator →
          </Link>
        </Container>
      </section>
    </main>
  );
}
