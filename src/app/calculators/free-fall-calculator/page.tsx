import { FreeFallCalculator } from "@/components/calculators/free-fall-calculator";

export const metadata = {
  title: "Free Fall Calculator | Science Lab Tools",
  description:
    "Calculate free fall time, final velocity, and falling distance using gravity equations.",
  alternates: {
    canonical: "/calculators/free-fall-calculator",
  },
};

export default function FreeFallCalculatorPage() {
  return (
    <main>
      <section className="tool-page-hero">
        <div className="container">
          <h1>
            Free Fall Calculator
          </h1>

          <p>
            Calculate falling distance, final velocity,
            and fall time using gravity equations.
          </p>
        </div>
      </section>

      <section className="article-section">
        <div className="container">
          <FreeFallCalculator />

          <section>
            <h2>
              Free Fall Formula
            </h2>

            <p>
              Free fall motion uses constant gravitational
              acceleration. The calculator applies
              h = ½gt² and v = gt equations.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
