import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { KirchhoffsLawCalculator } from "@/components/calculators/kirchhoffs-law-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Kirchhoff's Law Calculator";

const pageDescription =
  "Calculate an unknown branch current with Kirchhoff's Current Law or an unknown loop voltage with Kirchhoff's Voltage Law.";

const pagePath =
  "/calculators/kirchhoffs-law-calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    type: "website",
    url: absoluteUrl(pagePath),
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

const faqItems = [
  {
    question:
      "What does Kirchhoff's Current Law state?",
    answer:
      "Kirchhoff's Current Law states that the algebraic sum of currents at a junction is zero. Equivalently, the total current entering a junction equals the total current leaving it.",
  },
  {
    question:
      "What does Kirchhoff's Voltage Law state?",
    answer:
      "Kirchhoff's Voltage Law states that the algebraic sum of all voltage rises and voltage drops around a closed circuit loop is zero.",
  },
  {
    question:
      "How should positive and negative signs be entered?",
    answer:
      "For KCL, assign one sign to currents entering a junction and the opposite sign to currents leaving it. For KVL, assign one sign to voltage rises and the opposite sign to voltage drops. The chosen convention must remain consistent.",
  },
  {
    question:
      "Can the calculator solve more than three circuit terms?",
    answer:
      "Yes. The calculator supports between two and six signed current or voltage terms and can calculate any one selected unknown term.",
  },
  {
    question:
      "Does the order of circuit values matter?",
    answer:
      "The arithmetic result depends on the signs and magnitudes rather than the displayed order. However, keeping values in circuit-traversal order makes KVL calculations easier to understand and verify.",
  },
  {
    question:
      "Can Kirchhoff's laws be used with AC circuits?",
    answer:
      "Yes, but AC circuit analysis may require complex impedances and phasor quantities. This calculator currently accepts real signed numerical values and does not perform complex-number calculations.",
  },
] as const;

const webApplicationSchema =
  createWebApplicationSchema({
    name: pageTitle,
    description: pageDescription,
    path: pagePath,
  });

const faqSchema = createFaqSchema(faqItems);

const breadcrumbSchema =
  createBreadcrumbSchema({
    pageName: pageTitle,
    pagePath,
  });

export default function KirchhoffsLawCalculatorPage() {
  return (
    <main>
      {[
        webApplicationSchema,
        faqSchema,
        breadcrumbSchema,
      ].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema),
          }}
        />
      ))}

      <section className="tool-page-hero">
        <Container>
          <nav
            className="breadcrumbs"
            aria-label="Breadcrumb"
          >
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/calculators">
                  Calculators
                </Link>
              </li>

              <li aria-current="page">
                Kirchhoff&apos;s Law Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Circuit laws and network analysis
            </p>

            <h1>Kirchhoff&apos;s Law Calculator</h1>

            <p>
              Calculate an unknown branch current using
              Kirchhoff&apos;s Current Law or an unknown
              loop voltage using Kirchhoff&apos;s Voltage
              Law.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Kirchhoff's law calculator"
      >
        <Container>
          <KirchhoffsLawCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Fundamental circuit analysis
              </p>

              <h2 id="overview-heading">
                What are Kirchhoff&apos;s laws?
              </h2>

              <p>
                Kirchhoff&apos;s laws are two fundamental
                rules used to analyze electrical circuits.
                They describe how electric current behaves
                at a junction and how voltage behaves around
                a closed loop.
              </p>

              <p>
                Kirchhoff&apos;s Current Law is based on
                conservation of electric charge.
                Kirchhoff&apos;s Voltage Law is based on
                conservation of energy.
              </p>

              <p>
                Together, the two laws make it possible to
                create simultaneous equations for circuits
                containing several branches, nodes, voltage
                sources, and resistive elements.
              </p>
            </section>

            <section aria-labelledby="kcl-heading">
              <p className="eyebrow">
                Junction-current relationship
              </p>

              <h2 id="kcl-heading">
                Kirchhoff&apos;s Current Law formula
              </h2>

              <p>
                Kirchhoff&apos;s Current Law, commonly
                abbreviated as KCL, states that the
                algebraic sum of all currents meeting at a
                circuit junction is zero.
              </p>

              <div className="formula-card">
                <p>
                  Current-law equation
                  <span>ΣI = 0</span>
                </p>

                <p>
                  Equivalent statement
                  <span>
                    Total current entering = total current
                    leaving
                  </span>
                </p>
              </div>

              <p>
                One consistent sign convention is to treat
                currents entering the junction as positive
                and currents leaving the junction as
                negative. The reverse convention is also
                valid when applied consistently.
              </p>
            </section>

            <section aria-labelledby="kvl-heading">
              <p className="eyebrow">
                Closed-loop relationship
              </p>

              <h2 id="kvl-heading">
                Kirchhoff&apos;s Voltage Law formula
              </h2>

              <p>
                Kirchhoff&apos;s Voltage Law, commonly
                abbreviated as KVL, states that the
                algebraic sum of all voltage changes around
                a complete closed loop is zero.
              </p>

              <div className="formula-card">
                <p>
                  Voltage-law equation
                  <span>ΣV = 0</span>
                </p>

                <p>
                  Equivalent statement
                  <span>
                    Total voltage rises = total voltage
                    drops
                  </span>
                </p>
              </div>

              <p>
                A common convention treats voltage rises as
                positive and voltage drops as negative.
                Reversing every sign also produces a valid
                equation.
              </p>
            </section>

            <section aria-labelledby="calculator-heading">
              <p className="eyebrow">
                Automatic unknown-term calculation
              </p>

              <h2 id="calculator-heading">
                How the Kirchhoff&apos;s law calculator
                works
              </h2>

              <p>
                Select either KCL or KVL, choose which term
                is unknown, and enter all remaining signed
                values. The calculator adds the known terms
                and changes the sign of their total.
              </p>

              <div className="formula-card">
                <p>
                  Unknown signed value
                  <span>x = −Σ known values</span>
                </p>
              </div>

              <p>
                The resulting unknown causes the complete
                algebraic sum to equal zero, satisfying the
                selected Kirchhoff law.
              </p>

              <p>
                The result panel also displays the formula,
                numerical substitution, known-value sum,
                and final verification.
              </p>
            </section>

            <section aria-labelledby="kcl-example-heading">
              <p className="eyebrow">
                Worked junction example
              </p>

              <h2 id="kcl-example-heading">
                Kirchhoff&apos;s Current Law example
              </h2>

              <p>
                Suppose a junction has a signed current of
                <strong> 5 A</strong>, another signed
                current of <strong>−2 A</strong>, and one
                unknown branch current.
              </p>

              <div className="formula-card">
                <p>
                  Starting equation
                  <span>5 + (−2) + I3 = 0</span>
                </p>

                <p>
                  Rearranged equation
                  <span>I3 = −(5 − 2)</span>
                </p>

                <p>
                  Result
                  <span>I3 = −3 A</span>
                </p>
              </div>

              <p>
                The negative result indicates that the
                unknown current flows in the direction
                represented by the negative sign convention.
              </p>
            </section>

            <section aria-labelledby="kvl-example-heading">
              <p className="eyebrow">
                Worked loop example
              </p>

              <h2 id="kvl-example-heading">
                Kirchhoff&apos;s Voltage Law example
              </h2>

              <p>
                Consider a loop containing a
                <strong> 12 V</strong> rise, a
                <strong> −4 V</strong> drop, a
                <strong> −3 V</strong> drop, and one
                unknown voltage.
              </p>

              <div className="formula-card">
                <p>
                  Starting equation
                  <span>
                    12 + (−4) + (−3) + V4 = 0
                  </span>
                </p>

                <p>
                  Rearranged equation
                  <span>V4 = −(12 − 4 − 3)</span>
                </p>

                <p>
                  Result
                  <span>V4 = −5 V</span>
                </p>
              </div>

              <p>
                The unknown is a voltage drop of 5 volts
                under the selected sign convention.
              </p>
            </section>

            <section aria-labelledby="sign-heading">
              <p className="eyebrow">
                Direction and polarity
              </p>

              <h2 id="sign-heading">
                How to choose current and voltage signs
              </h2>

              <p>
                Correct signs are essential because
                Kirchhoff equations are algebraic rather
                than simple unsigned totals.
              </p>

              <ul className="article-list">
                <li>
                  For KCL, define currents entering a node
                  as positive and currents leaving as
                  negative, or use the reverse convention.
                </li>

                <li>
                  For KVL, choose a direction in which to
                  move around the circuit loop.
                </li>

                <li>
                  Record a voltage rise when moving from
                  lower potential to higher potential.
                </li>

                <li>
                  Record a voltage drop when moving from
                  higher potential to lower potential.
                </li>

                <li>
                  Never change the sign convention halfway
                  through the equation.
                </li>
              </ul>
            </section>

            <section aria-labelledby="node-heading">
              <p className="eyebrow">
                Circuit terminology
              </p>

              <h2 id="node-heading">
                Nodes, branches, and loops
              </h2>

              <ul className="article-list">
                <li>
                  A <strong>node</strong> is a connection
                  point shared by two or more circuit
                  elements.
                </li>

                <li>
                  A <strong>branch</strong> is a path
                  between two nodes containing one or more
                  circuit elements.
                </li>

                <li>
                  A <strong>loop</strong> is any closed
                  path through a circuit.
                </li>

                <li>
                  A <strong>mesh</strong> is a loop that
                  does not contain another loop inside it.
                </li>
              </ul>

              <p>
                KCL is normally applied at nodes, while KVL
                is normally applied around loops or meshes.
              </p>
            </section>

            <section aria-labelledby="equations-heading">
              <p className="eyebrow">
                Larger circuit systems
              </p>

              <h2 id="equations-heading">
                Using Kirchhoff&apos;s laws for multiple
                unknowns
              </h2>

              <p>
                A circuit containing several unknown
                currents or voltages normally requires more
                than one independent equation. KCL equations
                are written for selected nodes, and KVL
                equations are written for selected loops.
              </p>

              <p>
                Ohm&apos;s law relationships such as
                <strong> V = IR</strong> are then substituted
                into the Kirchhoff equations. The resulting
                simultaneous equations can be solved using
                algebra, elimination, substitution, or
                matrix methods.
              </p>

              <p>
                This calculator solves one unknown signed
                term at a time. It does not currently solve
                a full system containing several unknown
                branch currents or loop voltages.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Practical uses
              </p>

              <h2 id="applications-heading">
                Where Kirchhoff&apos;s laws are used
              </h2>

              <ul className="article-list">
                <li>
                  DC resistor-network analysis.
                </li>

                <li>
                  Parallel branch-current calculations.
                </li>

                <li>
                  Multi-loop circuit analysis.
                </li>

                <li>
                  Laboratory circuit verification.
                </li>

                <li>
                  Electronics troubleshooting.
                </li>

                <li>
                  Mesh-current and nodal-voltage methods.
                </li>

                <li>
                  Power-system and network modeling.
                </li>
              </ul>
            </section>

            <section aria-labelledby="mistakes-heading">
              <p className="eyebrow">
                Calculation accuracy
              </p>

              <h2 id="mistakes-heading">
                Common Kirchhoff calculation mistakes
              </h2>

              <ul className="article-list">
                <li>
                  Treating all currents or voltages as
                  positive values.
                </li>

                <li>
                  Changing the assumed current direction
                  during a calculation.
                </li>

                <li>
                  Reversing battery or component polarity.
                </li>

                <li>
                  Omitting one branch current from a node
                  equation.
                </li>

                <li>
                  Omitting one voltage rise or drop from a
                  loop equation.
                </li>

                <li>
                  Mixing amperes and milliamperes without
                  conversion.
                </li>

                <li>
                  Mixing volts and millivolts without
                  conversion.
                </li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Tool scope
              </p>

              <h2 id="limitations-heading">
                Calculator assumptions and limitations
              </h2>

              <p>
                This calculator applies the algebraic
                zero-sum form of Kirchhoff&apos;s Current
                Law and Kirchhoff&apos;s Voltage Law. It
                supports real, finite, signed numerical
                values.
              </p>

              <p>
                It does not automatically construct a
                circuit model, detect independent nodes or
                loops, calculate resistance-based voltage
                drops, or solve simultaneous systems with
                several unknowns.
              </p>

              <p>
                AC circuits may require complex impedance,
                phase angle, and phasor calculations, which
                are outside this calculator&apos;s current
                scope.
              </p>
            </section>

            <section aria-labelledby="related-heading">
              <p className="eyebrow">
                Related electrical tools
              </p>

              <h2 id="related-heading">
                Continue analyzing the circuit
              </h2>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ohms-law-calculator"
                >
                  Ohm&apos;s Law Calculator
                </Link>{" "}
                to calculate voltage, current, resistance,
                or electrical power.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/current-divider-calculator"
                >
                  Current Divider Calculator
                </Link>{" "}
                to calculate current distribution between
                two parallel resistor branches.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/voltage-divider-calculator"
                >
                  Voltage Divider Calculator
                </Link>{" "}
                to calculate voltage distribution across
                two series resistors.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/series-parallel-resistance-calculator"
                >
                  Series and Parallel Resistance
                  Calculator
                </Link>{" "}
                to calculate equivalent resistance in
                resistor networks.
              </p>

              <p>
                Use the{" "}
                <Link
                  className="article-inline-link"
                  href="/calculators/ac-impedance-calculator"
                >
                  AC Impedance Calculator
                </Link>{" "}
                for circuits containing resistance,
                inductive reactance, or capacitive
                reactance.
              </p>
            </section>

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Kirchhoff&apos;s law calculator FAQ
              </h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                    </summary>

                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="article-sidebar__card">
              <p className="eyebrow">
                Quick reference
              </p>

              <h2>Kirchhoff&apos;s law rules</h2>

              <ul className="article-list">
                <li>
                  KCL: the signed current sum at a node
                  equals zero.
                </li>

                <li>
                  KVL: the signed voltage sum around a
                  closed loop equals zero.
                </li>

                <li>
                  Assign directions and polarities before
                  writing equations.
                </li>

                <li>
                  Use one sign convention consistently.
                </li>

                <li>
                  Convert all values to compatible units.
                </li>
              </ul>
            </div>
          </aside>
        </Container>

        <Container>
          <CalculatorTrustPanel subject="physics" />
        </Container>
      </section>
    </main>
  );
}
