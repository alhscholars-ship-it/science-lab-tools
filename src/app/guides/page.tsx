import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  guideCategories,
  scienceGuides,
} from "@/content/guides/registry";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Science Guides";
const pageDescription =
  "Explore science learning guides covering physics, chemistry, formulas, calculations, and laboratory concepts.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/guides"),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
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
  url: absoluteUrl("/guides"),
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: scienceGuides.length,
    itemListElement: scienceGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(guide.href),
    })),
  },
};

export default function GuidesPage() {
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

      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            {" / "}
            <span>Guides</span>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Science learning resources
            </p>

            <h1>Science Guides</h1>

            <p>
              Learn science concepts with explanations,
              formulas, examples, and connections to
              interactive calculators.
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          {guideCategories.map((category) => {
            const guides = scienceGuides.filter(
              (guide) => guide.category === category,
            );

            return (
              <section
                key={category}
                className="directory-category"
              >
                <div className="directory-category__heading">
                  <h2>{category}</h2>
                  <span>{guides.length} guides</span>
                </div>

                <div className="directory-grid">
                  {guides.map((guide) => (
                    <article
                      key={guide.slug}
                      className="directory-card"
                    >
                      <h3>
                        {guide.title}
                      </h3>

                      <p>
                        {guide.shortDescription}
                      </p>

                      <Link href={guide.href}>
                        Read guide →
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </section>
    </main>
  );
}
