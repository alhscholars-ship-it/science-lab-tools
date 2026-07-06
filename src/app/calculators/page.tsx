import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { calculators } from "@/content/calculators/registry";

const pageTitle = "Science Calculators";
const pageDescription =
  "Free laboratory, chemistry, and physics calculators with formulas, worked examples, units, and step-by-step explanations.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/calculators",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalculatorsPage() {
  return (
    <main>
      <section className="directory-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Calculators</li>
            </ol>
          </nav>

          <div className="directory-hero__content">
            <p className="eyebrow">Interactive science tools</p>
            <h1>Science calculators with clear working steps</h1>
            <p>
              Use reviewed laboratory, chemistry, and physics calculators that
              explain the formula, variables, units, and calculation process.
            </p>
          </div>
        </Container>
      </section>

      <section className="directory-section" aria-labelledby="available-heading">
        <Container>
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Available now</p>
              <h2 id="available-heading">Published calculators</h2>
            </div>

            <p>
              Each published calculator includes validation, tested calculation
              logic, worked examples, and supporting educational guidance.
            </p>
          </div>

          <div className="calculator-directory-grid">
            {calculators.map((calculator) => (
              <article
                className="calculator-directory-card"
                key={calculator.slug}
              >
                <div className="calculator-directory-card__top">
                  <span>{calculator.category}</span>
                  <span className="published-badge">Published</span>
                </div>

                <h2>
                  <Link href={calculator.href}>{calculator.name}</Link>
                </h2>

                <p>{calculator.shortDescription}</p>

                <Link
                  className="calculator-directory-card__link"
                  href={calculator.href}
                >
                  Open calculator
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}
