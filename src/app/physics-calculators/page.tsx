import type { Metadata } from "next";
import Link from "next/link";

import { RelatedLearning } from "@/components/related-learning";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";
import { physicsHub } from "@/content/category-hubs/physics";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createFaqSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = physicsHub.title;
const pageDescription = physicsHub.description;
const pagePath = "/physics-calculators";

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

const physicsCalculators = calculators.filter(
  (calculator) =>
    calculator.category === physicsHub.category,
);

const collectionSchema = createCollectionPageSchema({
  name: pageTitle,
  description: pageDescription,
  path: pagePath,
  items: physicsCalculators.map((calculator) => ({
    name: calculator.name,
    href: calculator.href,
  })),
});

const faqSchema = createFaqSchema(physicsHub.faqs);

const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath,
});

export default function PhysicsCalculatorsPage() {
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
                Physics Calculators
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Physics calculation resources
            </p>

            <h1>{pageTitle}</h1>

            <p>
              {physicsHub.intro}
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
                  Physics topics
                </p>

                <h2>
                  Explore Physics Concepts
                </h2>
              </div>
            </div>

            <div className="directory-grid">
              {physicsHub.topics.map((topic) => (
                <article
                  className="directory-card"
                  key={topic}
                >
                  <h3>{topic}</h3>
                  <p>
                    Learn and calculate important
                    {` ${topic.toLowerCase()}`} concepts.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="directory-category">
            <div className="directory-category__heading">
              <div>
                <p className="eyebrow">
                  Physics tools
                </p>

                <h2>
                  Physics Calculators
                </h2>
              </div>

              <span>
                {physicsCalculators.length} calculators
              </span>
            </div>

            <div className="calculator-directory-grid">
              {physicsCalculators.map((calculator) => (
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
      <RelatedLearning />
    </main>
  );
}
