import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";

const trustPoints = [
  {
    title: "Formula checked",
    description:
      "Calculations are tested against documented scientific formulas and representative examples.",
  },
  {
    title: "Made for learning",
    description:
      "Every tool explains the formula, variables, units, and calculation steps.",
  },
  {
    title: "Teacher friendly",
    description:
      "Resources are designed for lessons, homework, practical work, and independent study.",
  },
] as const;


export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="home-heading">
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow">
              Science tools for students, teachers, and homeschool families
            </p>

            <h1 id="home-heading">
              Accurate laboratory calculations, explained step by step
            </h1>

            <p className="hero__description">
              Use practical science calculators, laboratory report templates,
              worksheets, and learning guides built to make physics and
              chemistry work clearer.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary" href="/calculators">
                Explore calculators
              </Link>

              <Link className="button button--secondary" href="/templates">
                Browse templates
              </Link>
            </div>

            <ul className="hero__highlights" aria-label="Resource benefits">
              <li>No sign-up required</li>
              <li>Clear worked examples</li>
              <li>Student-friendly units</li>
            </ul>
          </div>

          <aside className="hero-tool-card" aria-label="Available science calculators">
            <div className="hero-tool-card__header">
              <span>Popular laboratory tools</span>
              <span className="status-badge">Available now</span>
            </div>

            <ul>
              {calculators.map((calculator, index) => (
                <li key={calculator.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Link href={calculator.href}>
                    {calculator.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="trust-section" aria-labelledby="trust-heading">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Built for reliable learning</p>
            <h2 id="trust-heading">More than an answer box</h2>
            <p>
              Each resource is designed to help users understand the scientific
              reasoning behind the result.
            </p>
          </div>

          <div className="trust-grid">
            {trustPoints.map((point, index) => (
              <article className="trust-card" key={point.title}>
                <span className="trust-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="resource-section" aria-labelledby="resource-heading">
        <Container>
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Explore by task</p>
              <h2 id="resource-heading">Science resources for practical work</h2>
            </div>

            <p>
              Find tools for calculations, experimental planning, laboratory
              reporting, data analysis, and printable classroom activities.
            </p>
          </div>

          <div className="resource-grid">
            {siteConfig.categories.map((category, index) => (
              <article className="resource-card" key={category.href}>
                <span className="resource-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  <Link href={category.href}>{category.name}</Link>
                </h3>

                <p>{category.description}</p>

                <Link className="resource-card__link" href={category.href}>
                  View resources
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="mission-section" aria-labelledby="mission-heading">
        <Container className="mission-section__inner">
          <div>
            <p className="eyebrow">Clear science, practical results</p>
            <h2 id="mission-heading">
              Created to support laboratory confidence
            </h2>
          </div>

          <div className="mission-section__content">
            <p>
              Science calculations become difficult when formulas, units, and
              experimental values are presented without context. Our resources
              connect the calculation to the laboratory task.
            </p>
            <p>
              Students can understand each step, teachers can use consistent
              classroom materials, and homeschool families can approach
              practical science with clearer guidance.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
