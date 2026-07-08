import { ProjectileMotionCalculator } from "@/components/calculators/projectile-motion-calculator";

export const metadata = {
  title: "Projectile Motion Calculator | Science Lab Tools",
  description:
    "Calculate projectile range, maximum height, and flight time using projectile motion formulas.",
  alternates: {
    canonical: "/calculators/projectile-motion-calculator",
  },
};

export default function ProjectileMotionCalculatorPage() {
  return (
    <main>
      <section className="tool-page-hero">
        <div className="container">
          <p className="eyebrow">
            Physics Calculator
          </p>

          <h1>
            Projectile Motion Calculator
          </h1>

          <p>
            Calculate projectile range, maximum height,
            and flight time using initial velocity,
            launch angle, and gravity.
          </p>
        </div>
      </section>

      <section className="article-section">
        <div className="container">
          <ProjectileMotionCalculator />

          <section>
            <h2>
              Projectile Motion Formula
            </h2>

            <p>
              Projectile motion combines horizontal
              and vertical motion under constant gravity.
              The calculator uses standard physics equations
              to calculate range, height, and time.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
