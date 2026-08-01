import type { Metadata } from "next";
import Link from "next/link";

import { RelatedLearning } from "@/components/related-learning";

import { Container } from "@/components/ui/container";
import { calculators } from "@/content/calculators/registry";
import { laboratoryHub } from "@/content/category-hubs/laboratory";
import { createCollectionPageSchema, createBreadcrumbSchema, serializeJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: laboratoryHub.title,
  description: laboratoryHub.description,
  alternates: {
    canonical: "/laboratory-calculators",
  },
};

export default function LaboratoryCalculatorsPage() {
  const laboratoryCalculators = calculators.filter(
    (calculator) =>
      calculator.category === laboratoryHub.category,
  );

  const collectionSchema = createCollectionPageSchema({
    name: laboratoryHub.title,
    description: laboratoryHub.description,
    path: "/laboratory-calculators",
    items: laboratoryCalculators,
  });

  const breadcrumbSchema = createBreadcrumbSchema({
    pageName: laboratoryHub.title,
    pagePath: "/laboratory-calculators",
  });

  return (
    <main>
      {[collectionSchema, breadcrumbSchema].map((schema, index) => (
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
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">
                Laboratory Calculators
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Scientific calculation tools
            </p>

            <h1>{laboratoryHub.title}</h1>

            <p>
              {laboratoryHub.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <h2>Laboratory Calculator Tools</h2>

          <div className="directory-grid">
            {laboratoryCalculators.map((calculator) => (
              <article
                className="directory-card"
                key={calculator.slug}
              >
                <div className="directory-card__topline">
                  <span>{calculator.category}</span>
                  <span>Available</span>
                </div>

                <h3>
                  <Link href={calculator.href}>
                    {calculator.name}
                  </Link>
                </h3>

                <p>
                  {calculator.shortDescription}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <RelatedLearning />
    </main>
  );
}
