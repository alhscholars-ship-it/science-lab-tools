import Link from "next/link";

const links = [
  {
    title: "Science Calculators",
    href: "/calculators",
    description:
      "Explore physics, chemistry, and laboratory calculators with formulas and explanations.",
  },
  {
    title: "Lab Report Guides",
    href: "/lab-reports",
    description:
      "Learn scientific writing, report structure, methods, results, and conclusions.",
  },
  {
    title: "Scientific Method",
    href: "/scientific-method",
    description:
      "Understand experiments, variables, research questions, and scientific processes.",
  },
  {
    title: "Science Templates",
    href: "/templates",
    description:
      "Use printable templates for experiments, worksheets, and scientific documentation.",
  },
] as const;

export function RelatedLearning() {
  return (
    <section
      className="directory-section"
      aria-labelledby="related-learning-heading"
    >
      <div className="section-heading">
        <p className="eyebrow">Continue learning</p>

        <h2 id="related-learning-heading">
          Related Science Resources
        </h2>
      </div>

      <div className="directory-grid">
        {links.map((link) => (
          <article
            className="directory-card"
            key={link.href}
          >
            <h3>
              <Link href={link.href}>
                {link.title}
              </Link>
            </h3>

            <p>
              {link.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
