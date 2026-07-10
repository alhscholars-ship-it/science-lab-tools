import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  scientificMethodCategories,
  scientificMethodResources,
} from "@/content/scientific-method/registry";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific Method Guides";
const pageDescription =
  "Learn the scientific method through practical guides covering questions, hypotheses, variables, experimental design, data collection, analysis, and conclusions.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/scientific-method",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/scientific-method"),
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

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/scientific-method"),
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Thing",
    name: "Scientific method",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: scientificMethodResources.length,
    itemListElement: scientificMethodResources.map(
      (resource, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: resource.title,
        url: absoluteUrl(resource.href),
      }),
    ),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Scientific Method Guides",
      item: absoluteUrl("/scientific-method"),
    },
  ],
};

export default function ScientificMethodPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <section className="directory-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Scientific Method</li>
            </ol>
          </nav>

          <div className="directory-hero__content">
            <p className="eyebrow">Scientific investigation</p>
            <h1>Scientific Method Guides</h1>
            <p>
              Build stronger investigations by learning how to ask
              testable questions, identify variables, design fair
              experiments, collect evidence, and draw supported
              conclusions.
            </p>
          </div>

          <div className="directory-stats">
            <div>
              <strong>{scientificMethodResources.length}</strong>
              <span>Total guides</span>
            </div>
            <div>
              <strong>{scientificMethodResources.length}</strong>
              <span>Available</span>
            </div>
            <div>
              <strong>{scientificMethodCategories.length}</strong>
              <span>Learning areas</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Learning roadmap</p>
              <h2>Scientific method resource library</h2>
            </div>
            <p>
              Resources are organized around the complete scientific
              investigation process, from the first observation to
              evidence-based conclusions.
            </p>
          </div>

          <div className="directory-category-list">
            {scientificMethodCategories.map((category) => {
              const resources =
                scientificMethodResources.filter(
                  (resource) =>
                    resource.category === category,
                );

              const categoryId = category
                .toLowerCase()
                .replaceAll(" ", "-");

              return (
                <section
                  className="directory-category"
                  key={category}
                  aria-labelledby={`scientific-${categoryId}`}
                >
                  <div className="directory-category__heading">
                    <div>
                      <p className="eyebrow">
                        Scientific method resources
                      </p>
                      <h2
                        id={`scientific-${categoryId}`}
                      >
                        {category}
                      </h2>
                    </div>

                    <span>
                      {resources.length}{" "}
                      {resources.length === 1
                        ? "guide"
                        : "guides"}
                    </span>
                  </div>

                  <div className="resource-grid">
                    {resources.map((resource) => (
                      <article
                        className="resource-card"
                        key={resource.slug}
                      >
                        <div className="resource-card__topline">
                          <span>{resource.category}</span>
                          <span className="resource-status resource-status--published">
                            Published
                          </span>
                        </div>

                        <h3>
                          <Link href={resource.href}>
                            {resource.title}
                          </Link>
                        </h3>

                        <p>{resource.shortDescription}</p>

                        <Link
                          className="resource-card__link"
                          href={resource.href}
                        >
                          Read guide
                          <span aria-hidden="true">→</span>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Related learning</p>
              <h2>Continue with laboratory reporting</h2>
            </div>
          </div>

          <div className="comparison-grid">
            <article className="comparison-card">
              <p className="comparison-card__label">
                Report writing
              </p>
              <h3>Document a complete investigation</h3>
              <p>
                Learn how to organize methods, results, discussion,
                conclusions, tables, graphs, and references.
              </p>
              <Link
                className="article-inline-link"
                href="/lab-reports"
              >
                Explore Lab Report Guides
              </Link>
            </article>

            <article className="comparison-card">
              <p className="comparison-card__label">
                Data calculations
              </p>
              <h3>Analyze experimental measurements</h3>
              <p>
                Use tested scientific calculators for percent error,
                percent difference, density, molarity, dilution, and
                specific heat.
              </p>
              <Link
                className="article-inline-link"
                href="/calculators"
              >
                Explore Science Calculators
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}
