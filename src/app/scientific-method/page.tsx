import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  plannedScientificMethodResources,
  publishedScientificMethodResources,
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
              <strong>
                {publishedScientificMethodResources.length}
              </strong>
              <span>Published</span>
            </div>
            <div>
              <strong>
                {plannedScientificMethodResources.length}
              </strong>
              <span>In development</span>
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

          {publishedScientificMethodResources.length > 0 ? (
            <div className="resource-grid">
              {publishedScientificMethodResources.map((resource) => (
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
          ) : (
            <div className="empty-state-card">
              <p className="eyebrow">Publishing in progress</p>
              <h2>The first scientific method guide is coming next</h2>
              <p>
                The resource architecture is complete. Guides will be
                published individually after content, SEO, structured
                data, and quality checks are finished.
              </p>
            </div>
          )}
        </Container>
      </section>

      <section className="directory-section directory-section--muted">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Content roadmap</p>
              <h2>Guides currently in development</h2>
            </div>
            <p>
              Each planned resource targets a specific investigation
              skill and will become available after review.
            </p>
          </div>

          <div className="resource-grid">
            {plannedScientificMethodResources.map((resource) => (
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
                  Guide planned
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
