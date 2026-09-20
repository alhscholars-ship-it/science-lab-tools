import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { scienceAITools } from "@/content/ai-tools/registry";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "AI Science Tools";
const pageDescription =
  "Explore AI-powered science tools for learning, solving problems, generating lab reports, and understanding physics and chemistry concepts.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/ai-tools",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/ai-tools"),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl("/ai-tools"),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: scienceAITools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(tool.href),
    })),
  },
};

export default function AIToolsPage() {
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
          <p className="eyebrow">
            Artificial Intelligence for Science
          </p>

          <h1>
            AI Science Tools
          </h1>

          <p>
            Learn science faster with AI-powered tools for
            physics, chemistry, education, and scientific writing.
          </p>
        </Container>
      </section>


      <section className="directory-section">
        <Container>

          <div className="directory-grid">
            {scienceAITools.map((tool) => (
              <article
                key={tool.slug}
                className="directory-card"
              >

                <div className="directory-card__topline">
                  <span>
                    {tool.category}
                  </span>

                  <span>
                    AI Tool
                  </span>
                </div>


                <h2>
                  {tool.name}
                </h2>


                <p>
                  {tool.description}
                </p>


                <ul>
                  {tool.features.map((feature) => (
                    <li key={feature}>
                      {feature}
                    </li>
                  ))}
                </ul>


                <Link href={tool.href}>
                  Open Tool →
                </Link>

              </article>
            ))}
          </div>

        </Container>
      </section>


      <section className="article-section">
        <Container>

          <div className="article-content">

            <h2>
              Why Use AI Science Tools?
            </h2>

            <p>
              AI science tools help students, researchers,
              and educators understand scientific concepts,
              solve problems, and learn through guided
              explanations.
            </p>

            <p>
              These tools combine scientific knowledge,
              calculations, formulas, and learning support
              to make physics, chemistry, mathematics,
              and laboratory concepts easier to understand.
            </p>


            <h2>
              Explore Science Learning Resources
            </h2>

            <ul>
              <li>
                <Link href="/physics-calculators">
                  Physics Calculators
                </Link>
              </li>

              <li>
                <Link href="/chemistry-calculators">
                  Chemistry Calculators
                </Link>
              </li>

              <li>
                <Link href="/formulas">
                  Science Formulas
                </Link>
              </li>

              <li>
                <Link href="/guides">
                  Science Guides
                </Link>
              </li>

              <li>
                <Link href="/lab-reports">
                  Laboratory Report Resources
                </Link>
              </li>
            </ul>

          </div>

        </Container>
      </section>


    </main>
  );
}
