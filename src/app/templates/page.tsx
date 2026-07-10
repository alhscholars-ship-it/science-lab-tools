import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  templateCategories,
  templateResources,
} from "@/content/templates/registry";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Science Templates and Worksheets";
const pageDescription =
  "Browse printable science templates and worksheets for lab reports, scientific-method planning, data tables, graphing, variables, and classroom investigations.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/templates"),
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
  url: absoluteUrl("/templates"),
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Thing",
    name: "Science templates and worksheets",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: templateResources.length,
    itemListElement: templateResources.map(
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
      name: "Science Templates and Worksheets",
      item: absoluteUrl("/templates"),
    },
  ],
};

export default function TemplatesPage() {
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
              <li aria-current="page">Templates</li>
            </ol>
          </nav>

          <div className="directory-hero__content">
            <p className="eyebrow">
              Printable science resources
            </p>
            <h1>Science Templates and Worksheets</h1>
            <p>
              Use structured resources for laboratory reports,
              experiment planning, scientific-method activities,
              data recording, graphing, and classroom practice.
            </p>
          </div>

          <div className="directory-stats">
            <div>
              <strong>{templateResources.length}</strong>
              <span>Total resources</span>
            </div>

            <div>
              <strong>{templateResources.length}</strong>
              <span>Available</span>
            </div>

            <div>
              <strong>{templateCategories.length}</strong>
              <span>Resource areas</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Resource library</p>
              <h2>Published science templates</h2>
            </div>

            <p>
              Each published resource is reviewed for usability,
              educational value, print layout, accessibility, and
              clear classroom application.
            </p>
          </div>

          <div className="directory-category-list">
            {templateCategories.map((category) => {
              const resources = templateResources.filter(
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
                  aria-labelledby={`template-${categoryId}`}
                >
                  <div className="directory-category__heading">
                    <div>
                      <p className="eyebrow">
                        Printable resources
                      </p>
                      <h2
                        id={`template-${categoryId}`}
                      >
                        {category}
                      </h2>
                    </div>

                    <span>
                      {resources.length}{" "}
                      {resources.length === 1
                        ? "resource"
                        : "resources"}
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
                          Open resource
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
              <h2>Prepare before using the worksheets</h2>
            </div>
          </div>

          <div className="comparison-grid">
            <article className="comparison-card">
              <p className="comparison-card__label">
                Scientific investigation
              </p>
              <h3>Plan and analyze experiments</h3>
              <p>
                Learn how to write hypotheses, identify variables,
                design experiments, collect data, and evaluate
                evidence.
              </p>

              <Link
                className="article-inline-link"
                href="/scientific-method"
              >
                Explore Scientific Method Guides
              </Link>
            </article>

            <article className="comparison-card">
              <p className="comparison-card__label">
                Laboratory reporting
              </p>
              <h3>Write complete science reports</h3>
              <p>
                Review report structure, methods, results,
                discussion, conclusions, tables, graphs, and
                significant figures.
              </p>

              <Link
                className="article-inline-link"
                href="/lab-reports"
              >
                Explore Lab Report Guides
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}
