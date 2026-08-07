import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { calculators } from "@/content/calculators/registry";

import styles from "./homepage.module.css";

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
    title: "Define the task",
    description:
      "Identify the quantity, formula, experiment, or report section you need to work on.",
  },
  {
    title: "Check the science",
    description:
      "Review variables, units, assumptions, controls, and the method before applying numbers.",
  },
  {
    title: "Work the problem",
    description:
      "Use guided tools and examples to calculate, plan, record, or structure your response.",
  },
  {
    title: "Explain the result",
    description:
      "Connect the outcome back to the scientific reasoning instead of stopping at an answer.",
  },
] as const;

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <Container className={styles.heroGrid}>
          <div>
            <p className={styles.kicker}>ALH Science Workspace</p>
            <h1 id="home-heading">Build the reasoning behind your science work.</h1>
            <p className={styles.heroLead}>
              Move from formula selection to experiment planning and report writing
              in one structured learning environment designed for practical science.
            </p>

            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/calculators">
                Open calculator workspace
              </Link>
              <Link className={styles.secondaryAction} href="/scientific-method">
                Build an experiment plan
              </Link>
            </div>
          </div>

          <aside className={styles.workspaceCard} aria-label="Featured science tools">
            <div className={styles.workspaceHeader}>
              <span>Quick workspace</span>
              <span className={styles.workspaceStatus}>Ready</span>
            </div>

            <ul className={styles.toolList}>
              {featuredCalculators.map((calculator, index) => (
                <li key={calculator.slug}>
                  <span className={styles.toolIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link href={calculator.href}>{calculator.name}</Link>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </li>
              ))}
            </ul>

            <div className={styles.workspaceFooter}>
              <Link href="/calculators">
                <span>Explore all {calculators.length} calculators</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section className={styles.pathSection} aria-labelledby="path-heading">
        <Container>
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.sectionLabel}>Choose your workflow</p>
              <h2 id="path-heading">Start with the task in front of you.</h2>
            </div>
            <p>
              The platform is organized around what a learner needs to do next,
              rather than forcing every problem into a calculator-first experience.
            </p>
          </div>

          <div className={styles.pathGrid}>
            {siteConfig.categories.map((category, index) => (
              <article className={styles.pathCard} key={category.href}>
                <span className={styles.pathNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>
                  <Link href={category.href}>{category.name}</Link>
                </h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.featuredSection} aria-labelledby="featured-heading">
        <Container>
          <div className={styles.featuredHeader}>
            <div>
              <p className={styles.sectionLabel}>Popular starting points</p>
              <h2 id="featured-heading">Work a real problem now.</h2>
            </div>
            <p>
              Jump directly into high-use physics and chemistry tools, then use the
              supporting formula and method resources to understand each result.
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredCalculators.map((calculator) => (
              <article className={styles.featuredCard} key={calculator.slug}>
                <div>
                  <strong>{calculator.name}</strong>
                  <span>Guided calculation with scientific context</span>
                </div>
                <Link
                  className={styles.featuredLink}
                  href={calculator.href}
                  aria-label={`Open ${calculator.name}`}
                >
                  →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.processSection} aria-labelledby="process-heading">
        <Container className={styles.processLayout}>
          <div className={styles.processIntro}>
            <p className={styles.sectionLabel}>Learning process</p>
            <h2 id="process-heading">From prompt to explanation.</h2>
            <p>
              Strong science work is a sequence of decisions. The workspace keeps
              those decisions visible so students can understand what they are doing.
            </p>
          </div>

          <ol className={styles.processList}>
            {learningPath.map((step) => (
              <li key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className={styles.closingSection}>
        <Container>
          <div className={styles.closingCard}>
            <div>
              <h2>Turn the next science question into a clear workflow.</h2>
              <p>
                Start with a calculator, then move into formulas, experiment design,
                templates, and reporting without losing the reasoning behind the work.
              </p>
            </div>
            <Link className={styles.closingAction} href="/calculators">
              Start working
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
