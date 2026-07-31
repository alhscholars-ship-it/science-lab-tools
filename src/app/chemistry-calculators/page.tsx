import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";
import { chemistryHub } from "@/content/category-hubs/chemistry";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createFaqSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = chemistryHub.title;
const pageDescription = chemistryHub.description;
const pagePath = "/chemistry-calculators";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
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
  robots: {
    index: true,
    follow: true,
  },
};

const chemistryCalculators = calculators.filter(
  (calculator) =>
    calculator.category === chemistryHub.category,
);

const collectionSchema = createCollectionPageSchema({
  name: pageTitle,
  description: pageDescription,
  path: pagePath,
  items: chemistryCalculators.map((calculator) => ({
    name: calculator.name,
    href: calculator.href,
  })),
});

const faqSchema = createFaqSchema(chemistryHub.faqs);

const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath,
});

export default function ChemistryCalculatorsPage() {
  return (
    <main>
      {[
        collectionSchema,
        faqSchema,
        breadcrumbSchema,
      ].map((schema, index) => (
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
              <li>
                <Link href="/calculators">
                  Calculators
                </Link>
              </li>
              <li aria-current="page">
                Chemistry Calculators
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Chemistry calculation resources
            </p>

            <h1>{pageTitle}</h1>

            <p>
              {chemistryHub.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <section className="directory-category">
            <div className="directory-category__heading">
              <div>
                <p className="eyebrow">
                  Chemistry topics
                </p>

                <h2>
                  Explore Chemistry Concepts
                </h2>
              </div>
            </div>

            <div className="directory-grid">
              {chemistryHub.topics.map((topic) => (
                <article
                  className="directory-card"
                  key={topic}
                >
                  <h3>{topic}</h3>
                  <p>
                    Learn and calculate important{" "}
                    {topic.toLowerCase()} concepts.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="directory-category">
            <div className="directory-category__heading">
              <div>
                <p className="eyebrow">
                  Chemistry tools
                </p>

                <h2>
                  Chemistry Calculators
                </h2>
              </div>

              <span>
                {chemistryCalculators.length} calculators
              </span>
            </div>

            <div className="calculator-directory-grid">
              {chemistryCalculators.map((calculator) => (
                <article
                  className="calculator-directory-card"
                  key={calculator.slug}
                >
                  <div className="calculator-directory-card__top">
                    <span>{calculator.category}</span>
                    <span>
                      Available
                    </span>
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
          </section>
        </Container>
      </section>
    </main>
  );
}
