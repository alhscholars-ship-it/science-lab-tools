import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { ScienceTutorBox } from "@/components/ai/science-tutor-box";
import { scienceAITools } from "@/content/ai-tools/registry";
import { absoluteUrl } from "@/lib/seo/url";

type AIToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return scienceAITools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: AIToolPageProps): Promise<Metadata> {
  const { slug } = await params;

  const tool = scienceAITools.find(
    (item) => item.slug === slug,
  );

  if (!tool) {
    return {};
  }

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: tool.href,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: "website",
      url: absoluteUrl(tool.href),
    },
  };
}

export default async function AIToolPage({
  params,
}: AIToolPageProps) {
  const { slug } = await params;

  const tool = scienceAITools.find(
    (item) => item.slug === slug,
  );

  if (!tool) {
    notFound();
  }

  return (
    <main>

      <section className="tool-page-hero">
        <Container>

          <nav className="breadcrumbs">
            <Link href="/">
              Home
            </Link>
            {" / "}
            <Link href="/ai-tools">
              AI Tools
            </Link>
            {" / "}
            <span>
              {tool.name}
            </span>
          </nav>


          <p className="eyebrow">
            {tool.category}
          </p>


          <h1>
            {tool.name}
          </h1>


          <p>
            {tool.description}
          </p>

        </Container>
      </section>


      <section className="article-section">
        <Container>

          <article className="article-content">

            <h2>
              Features
            </h2>

            <ul>
              {tool.features.map((feature) => (
                <li key={feature}>
                  {feature}
                </li>
              ))}
            </ul>


            <section>
              <h2>
                How this AI tool helps
              </h2>

              <p>
                This AI-powered science tool helps students,
                teachers, and researchers understand scientific
                concepts with clear explanations and guided learning.
              </p>
            </section>


            {tool.slug === "ai-science-tutor" && (
              <ScienceTutorBox />
            )}

            <section>
              <h2>
                Start using {tool.name}
              </h2>

              <p>
                The interactive AI experience will be available here.
                Future versions will include problem solving,
                explanations, and personalized learning support.
              </p>
            </section>


          </article>

        </Container>
      </section>

    </main>
  );
}
