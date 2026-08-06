import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";

const featuredCalculatorSlugs = [
  "molarity-calculator",
  "density-calculator",
  "force-calculator",
  "projectile-motion-calculator",
] as const;

const featuredCalculators = featuredCalculatorSlugs.map((slug) => {
  const calculator = calculators.find((item) => item.slug === slug);

  if (!calculator) {
    throw new Error(`Featured calculator not found: ${slug}`);
  }

  return calculator;
});

const learningPath = [
  {
    title: "Choose the problem",
    description:
      "Start with a calculation, formula, experiment plan, or report-writing task.",
  },
  {
    title: "Understand the method",
    description:
      "Review variables, units, assumptions, and the scientific reasoning behind each step.",
  },
  {
    title: "Apply with confidence",
    description:
      "Use the result in homework, practical work, revision, or a structured lab report.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="home-heading">
        <Container className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow">A practical science workspace</p>

            <h1 id="home-heading">
              Learn the method, not just the final answer
            </h1>

            <p className="hero__description">
              ALH Science Hub brings calculations, formulas, experiment planning,
              and laboratory writing into one clear learning workflow for
              students and educators.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary" href="/calculators">
                Start a calculation
              </Link>

              <Link className="button button--secondary" href="/scientific-method">
                Plan an experiment
              </Link>
            </div>

            <ul className="hero__highlights" aria-label="Platform benefits">
              <li>Guided scientific steps</li>
              <li>Clear variables and units</li>
              <li>Classroom-ready resources</li>
            </ul>
          </div>

          <aside className="hero-tool-card" aria-label="Featured learning tools">
            <div className="hero-tool-card__header">
              <span>Start here</span>
              <span className="status-badge">Student workspace</span>
            </div>

            <ul>
              {featuredCalculators.map((calculator, index) => (
                <li key={calculator.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Link href={calculator.href}>{calculator.name}</Link>
                </li>
              ))}
            </ul>

            <div className="hero-tool-card__footer">
              <Link href="/calculators">
                Browse all {calculators.length} tools
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section className="trust-section" aria-labelledby="path-heading">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">A clearer learning process</p>
            <h2 id="path-heading">From question to scientific understanding</h2>
            <p>
              Each resource is organized to help learners connect a formula or
              result with the underlying scientific method.
            </p>
          </div>

          <div className="trust-grid">
            {learningPath.map((step, index) => (
              <article className="trust-card" key={step.title}>
                <span className="trust-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="resource-section" aria-labelledby="resource-heading">
        <Container>
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Build your science workflow</p>
              <h2 id="resource-heading">Tools for every stage of practical learning</h2>
            </div>

            <p>
              Move from calculation and revision to experiment design, data
              recording, analysis, and final report preparation.
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
                  Open section
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
            <p className="eyebrow">Designed for real learning</p>
            <h2 id="mission-heading">
              A science platform students can actually work through
            </h2>
          </div>

          <div className="mission-section__content">
            <p>
              Scientific work becomes easier when formulas, units, procedures,
              observations, and conclusions are presented as one connected process.
            </p>
            <p>
              ALH Science Hub is structured to support independent study,
              classroom instruction, homework, and practical laboratory preparation.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
