import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The requested page could not be found on ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: true,
  },
};

const recoveryLinks = [
  {
    href: "/calculators",
    title: "Science calculators",
    description:
      "Browse physics, chemistry, statistics, and laboratory calculators.",
  },
  {
    href: "/formulas",
    title: "Formula library",
    description:
      "Find essential scientific formulas with explanations and tool links.",
  },
  {
    href: "/templates",
    title: "Lab templates",
    description:
      "Use printable worksheets, data tables, and laboratory report templates.",
  },
] as const;

export default function NotFoundPage() {
  return (
    <main>
      <section className="section" aria-labelledby="not-found-heading">
        <Container>
          <p className="eyebrow">404 error</p>
          <h1 id="not-found-heading">Page not found</h1>
          <p>
            The page you requested does not exist, may have moved, or may use
            an outdated link. Continue with one of the main science resource
            areas below.
          </p>

          <div className="resource-grid" aria-label="Page recovery links">
            {recoveryLinks.map((item) => (
              <article className="resource-card" key={item.href}>
                <h2>
                  <Link href={item.href}>{item.title}</Link>
                </h2>
                <p>{item.description}</p>
                <Link className="resource-card__link" href={item.href}>
                  Open resource
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>

          <p>
            <Link className="button button--primary" href="/">
              Return to homepage
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
