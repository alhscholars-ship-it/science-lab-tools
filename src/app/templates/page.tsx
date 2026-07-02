import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  plannedTemplateResources,
  publishedTemplateResources,
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
              <strong>{publishedTemplateResources.length}</strong>
              <span>Published</span>
            </div>

            <div>
              <strong>{plannedTemplateResources.length}</strong>
              <span>In development</span>
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
              Each resource will be reviewed for usability,
              educational value, print layout, accessibility, and
              search quality before publication.
            </p>
          </div>

          {publishedTemplateResources.length > 0 ? (
            <div className="resource-grid">
              {publishedTemplateResources.map((resource) => (
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
          ) : (
            <div className="empty-state-card">
              <p className="eyebrow">Publishing in progress</p>
              <h2>
                The first printable template is being prepared
              </h2>
              <p>
                The resource architecture and publishing roadmap are
                complete. Templates will be released individually
                after content, print layout, SEO, and quality checks
                pass.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="directory-section directory-section--muted">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Publishing roadmap</p>
              <h2>Templates currently in development</h2>
            </div>

            <p>
              Planned resources cover complete investigations,
              classroom practice, scientific data recording, and
              visual analysis.
            </p>
          </div>

          <div className="resource-grid">
            {plannedTemplateResources.map((resource) => (
              <article
                className="resource-card resource-card--planned"
                key={resource.slug}
              >
                <div className="resource-card__topline">
                  <span>{resource.category}</span>
                  <span className="resource-status">
                    In development
                  </span>
                </div>

                <h3>{resource.title}</h3>
                <p>{resource.shortDescription}</p>

                <span className="resource-card__link resource-card__link--disabled">
                  Resource planned
                </span>
              </article>
            ))}
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
