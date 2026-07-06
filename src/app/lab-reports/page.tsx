import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  labReportCategories,
  labReportResources,
} from "@/content/lab-reports/registry";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Lab Report Guides";
const pageDescription =
  "Learn how to write scientific lab reports with step-by-step guides covering report structure, methods, results, discussion, conclusions, tables, graphs, and templates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/lab-reports",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl("/lab-reports"),
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

export default function LabReportsPage() {
  return (
    <main>
      <section className="tool-page-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Lab Reports</li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">Scientific writing resources</p>
            <h1>Lab Report Guides</h1>
            <p>
              Build accurate and well-structured scientific reports
              using focused guides for every major report section.
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section">
        <Container>
          {labReportCategories.map((category) => {
            const resources = labReportResources.filter(
              (resource) => resource.category === category,
            );

            return (
              <section
                className="directory-category"
                key={category}
                aria-labelledby={`category-${category
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                <div className="directory-category__heading">
                  <div>
                    <p className="eyebrow">Lab report resources</p>
                    <h2
                      id={`category-${category
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {category}
                    </h2>
                  </div>

                  <span>{resources.length} resources</span>
                </div>

                <div className="directory-grid">
                  {resources.map((resource) => (
                    <article
                      className="directory-card"
                      key={resource.slug}
                    >
                      <div className="directory-card__topline">
                        <span>{resource.category}</span>
                        <span>Available</span>
                      </div>

                      <h3>{resource.title}</h3>
                      <p>{resource.shortDescription}</p>

                      <Link href={resource.href}>
                        Read the guide
                        <span aria-hidden="true"> →</span>
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
