import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import {
  formulaCategories,
  scienceFormulas,
} from "@/content/formulas/registry";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const categoryDescriptions = {
  physics:
    "Physics formulas for mechanics, motion, forces, energy, electricity, and scientific calculations.",
  chemistry:
    "Chemistry formulas for reactions, solutions, moles, concentration, and laboratory calculations.",
  laboratory:
    "Laboratory formulas for measurements, uncertainty, statistics, and experimental analysis.",
} as const;

export function generateStaticParams() {
  return formulaCategories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const normalized = category.toLowerCase();

  const exists = formulaCategories.some(
    (item) => item.toLowerCase() === normalized,
  );

  if (!exists) {
    return {};
  }

  const title =
    `${category.charAt(0).toUpperCase() + category.slice(1)} Formulas`;

  return {
    title,
    description:
      categoryDescriptions[
        normalized as keyof typeof categoryDescriptions
      ],
    alternates: {
      canonical: `/formulas/category/${normalized}`,
    },
    openGraph: {
      title,
      description:
        categoryDescriptions[
          normalized as keyof typeof categoryDescriptions
        ],
      url: absoluteUrl(`/formulas/category/${normalized}`),
      type: "website",
    },
  };
}

export default async function FormulaCategoryPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const normalized = category.toLowerCase();

  const formulas = scienceFormulas.filter(
    (formula) =>
      formula.category.toLowerCase() === normalized,
  );

  if (!formulas.length) {
    notFound();
  }

  const title =
    `${formulas[0].category} Formulas`;

  const schemas = [
    createCollectionPageSchema({
      name: title,
      description:
        categoryDescriptions[
          normalized as keyof typeof categoryDescriptions
        ],
      path: `/formulas/category/${normalized}`,
      items: formulas.map((formula) => ({
        name: formula.name,
        href: `/formulas/${formula.slug}`,
      })),
    }),

    createBreadcrumbSchema({
      pageName: title,
      pagePath: `/formulas/category/${normalized}`,
      parentName: "Formula Library",
      parentPath: "/formulas",
    }),
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
            <span>{title}</span>
          </nav>

          <p className="eyebrow">
            Formula category
          </p>

          <h1>{title}</h1>

          <p>
            {
              categoryDescriptions[
                normalized as keyof typeof categoryDescriptions
              ]
            }
          </p>

          <p>
            <Link href="/formulas">
              ← Browse all science formulas
            </Link>
          </p>

          <nav aria-label="Other formula categories">
            {formulaCategories
              .filter(
                (item) =>
                  item.toLowerCase() !== normalized,
              )
              .map((item) => (
                <Link
                  key={item}
                  href={`/formulas/category/${item.toLowerCase()}`}
                >
                  {item} formulas →
                </Link>
              ))}
          </nav>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="formula-library-grid">
            {formulas.map((formula) => (
              <article
                className="formula-library-card"
                key={formula.slug}
              >
                <p className="eyebrow">
                  {formula.category}
                </p>

                <h2>{formula.name}</h2>

                <p className="formula-library-card__equation">
                  {formula.equation}
                </p>

                <p>{formula.description}</p>

                <div className="formula-card-links">
                  <Link href={`/formulas/${formula.slug}`}>
                    Learn formula →
                  </Link>

                  <Link href={formula.calculatorHref}>
                    Calculator →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
