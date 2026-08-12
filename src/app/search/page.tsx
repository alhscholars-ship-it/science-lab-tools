import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import {
  searchResourceTypes,
  searchSite,
  siteSearchIndex,
  type SearchResourceType,
} from "@/lib/search/site-search";

const pageTitle = `Search ${siteConfig.name}`;
const pageDescription =
  "Search science calculators, laboratory report guides, scientific-method resources, and printable classroom templates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath: "/search",
  parentName: "Science Resources",
  parentPath: "/",
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[]; type?: string | string[] }>;
};

function parseType(value: string | string[] | undefined): SearchResourceType | undefined {
  const candidate = typeof value === "string" ? value : "";

  return searchResourceTypes.find((type) => type === candidate);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const type = parseType(params.type);
  const isFiltering = Boolean(query) || Boolean(type);
  const results = isFiltering ? searchSite(query, { type }) : [];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol><li><Link href="/">Home</Link></li><li aria-current="page">Search</li></ol>
          </nav>
          <div className="tool-page-hero__content">
            <p className="eyebrow">Find a science resource</p>
            <h1>{pageTitle}</h1>
            <p>Search {siteSearchIndex.length} calculators, guides, worksheets, and laboratory resources from one place.</p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          <form className="site-search-form" action="/search" method="get" role="search">
            <label htmlFor="site-search-query">What do you need help with?</label>
            <div>
              <input id="site-search-query" name="q" type="search" defaultValue={query} placeholder="Try molarity, hypothesis, graphing, or percent error" maxLength={100} autoFocus />
              <label className="sr-only" htmlFor="site-search-type">Filter by resource type</label>
              <select id="site-search-type" name="type" defaultValue={type ?? ""}>
                <option value="">All resource types</option>
                {searchResourceTypes.map((resourceType) => (
                  <option key={resourceType} value={resourceType}>
                    {resourceType}
                  </option>
                ))}
              </select>
              <button className="button button--primary" type="submit">Search</button>
            </div>
          </form>

          {isFiltering ? (
            <section className="site-search-results" aria-labelledby="search-results-heading">
              <div className="directory-category__heading">
                <div>
                  <p className="eyebrow">Search results</p>
                  <h2 id="search-results-heading">
                    {query
                      ? `Results for “${query}”${type ? ` in ${type}` : ""}`
                      : `Browsing ${type}`}
                  </h2>
                </div>
                <span>{results.length} {results.length === 1 ? "result" : "results"}</span>
              </div>
              {results.length ? (
                <div className="calculator-directory-grid">
                  {results.map((result) => (
                    <article className="calculator-directory-card" key={result.href}>
                      <div className="calculator-directory-card__top"><span>{result.type}</span><span>{result.category}</span></div>
                      <h3><Link href={result.href}>{result.title}</Link></h3>
                      <p>{result.description}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="site-search-empty">
                  <h3>No matching resources found</h3>
                  <p>
                    {query
                      ? "Try a shorter subject name, a formula, or a task such as “write a hypothesis.”"
                      : "No published resources match that type yet."}
                  </p>
                </div>
              )}
            </section>
          ) : (
            <section className="site-search-start" aria-labelledby="search-start-heading">
              <p className="eyebrow">Browse instead</p>
              <h2 id="search-start-heading">Explore by resource type</h2>
              <div className="directory-grid">
                <article className="directory-card"><h3><Link href="/calculators">Calculators</Link></h3><p>Physics, chemistry, and laboratory calculation tools.</p></article>
                <article className="directory-card"><h3><Link href="/lab-reports">Lab Reports</Link></h3><p>Guidance for every part of a laboratory report.</p></article>
                <article className="directory-card"><h3><Link href="/scientific-method">Scientific Method</Link></h3><p>Plan fair, measurable, and repeatable investigations.</p></article>
                <article className="directory-card"><h3><Link href="/templates">Templates</Link></h3><p>Printable worksheets and data-recording resources.</p></article>
              </div>
            </section>
          )}
        </Container>
      </section>
    </main>
  );
}
