import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { scienceGuides } from "@/content/guides/registry";
import { scienceFormulas } from "@/content/formulas/registry";
import { absoluteUrl } from "@/lib/seo/url";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return scienceGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;

  const guide = scienceGuides.find(
    (item) => item.slug === slug,
  );

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.shortDescription,
    alternates: {
      canonical: guide.href,
    },
    openGraph: {
      title: guide.title,
      description: guide.shortDescription,
      type: "article",
      url: absoluteUrl(guide.href),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.shortDescription,
    },
  };
}

export default async function GuidePage({
  params,
}: GuidePageProps) {
  const { slug } = await params;

  const guide = scienceGuides.find(
    (item) => item.slug === slug,
  );

  if (!guide) {
    notFound();
  }

  return (
    <main>
      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            {" / "}
            <Link href="/guides">
              Guides
            </Link>
            {" / "}
            <span>{guide.title}</span>
          </nav>

          <p className="eyebrow">
            {guide.category} Guide
          </p>

          <h1>{guide.title}</h1>

          <p>
            {guide.shortDescription}
          </p>
        </Container>
      </section>

      <section className="article-section">
        <Container>
          <article className="article-content">
            <p>
              {guide.intro}
            </p>

            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>
                  {section.heading}
                </h2>

                <p>
                  {section.content}
                </p>
              </section>
            ))}

            <section>
              <h2>
                Frequently Asked Questions
              </h2>

              {guide.faq.map((item) => (
                <div key={item.question}>
                  <h3>
                    {item.question}
                  </h3>

                  <p>
                    {item.answer}
                  </p>
                </div>
              ))}
            </section>

            {guide.relatedFormulas &&
              guide.relatedFormulas.length > 0 && (
                <section>
                  <h2>
                    Related Formulas
                  </h2>

                  <div className="formula-card-grid">
                    {guide.relatedFormulas.map((slug) => {
                      const formula =
                        scienceFormulas.find(
                          (item) => item.slug === slug,
                        );

                      if (!formula) return null;

                      return (
                        <div
                          className="formula-card"
                          key={slug}
                        >
                          <h3>
                            {formula.name}
                          </h3>

                          <p>
                            {formula.equation}
                          </p>

                          <p>
                            {formula.description}
                          </p>

                          <Link href={`/formulas/${slug}`}>
                            Learn formula →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

            {guide.relatedCalculators &&
              guide.relatedCalculators.length > 0 && (
                <section>
                  <h2>
                    Related Calculators
                  </h2>

                  <ul>
                    {guide.relatedCalculators.map((href) => (
                      <li key={href}>
                        <Link href={href}>
                          Use calculator →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
          </article>
        </Container>
      </section>
    </main>
  );
}
