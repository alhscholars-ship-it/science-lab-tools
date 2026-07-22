import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { RelatedCalculators } from "@/components/related-calculators";
import { WheatstoneBridgeCalculator } from "@/components/calculators/wheatstone-bridge-calculator";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Wheatstone Bridge Calculator";

const pageDescription =
  "Calculate unknown resistance, bridge output voltage, or check whether a four-resistor Wheatstone bridge is balanced.";

const pagePath =
  "/calculators/wheatstone-bridge-calculator";

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
      "What formula does the Wheatstone bridge calculator use?",
    answer:
      "For a balanced bridge using this resistor arrangement, the unknown resistance is Rx = R2 × R3 ÷ R1. The calculator also compares R1 ÷ R2 with R3 ÷ Rx to determine balance.",
  },
  {
    question:
      "What does it mean when a Wheatstone bridge is balanced?",
    answer:
      "A Wheatstone bridge is balanced when the resistance ratios in its two arms are equal. Under ideal conditions, the two midpoint voltages are equal and the differential output voltage is zero.",
  },
  {
    question:
      "Can this calculator determine bridge output voltage?",
    answer:
      "Yes. Enter the supply voltage and all four resistance values. The calculator finds each divider midpoint voltage and subtracts the right-side voltage from the left-side voltage.",
  },
  {
    question:
      "Must all resistance values use the same unit?",
    answer:
      "Yes. Enter all four resistances using the same unit, such as ohms, kilo-ohms, or mega-ohms. A calculated unknown resistance will use that same unit.",
  },
  {
    question:
      "Does the calculator include resistor tolerance and measurement error?",
    answer:
      "No. It uses ideal resistance values. Real bridge output can also be affected by resistor tolerance, temperature, supply stability, lead resistance, meter loading, and electrical noise.",
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

export default function WheatstoneBridgeCalculatorPage() {
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
                Wheatstone Bridge Calculator
              </li>
            </ol>
          </nav>

          <div className="tool-page-hero__content">
            <p className="eyebrow">
              Electrical measurement and resistor bridges
            </p>

            <h1>Wheatstone Bridge Calculator</h1>

            <p>
              Calculate an unknown resistance, determine
              differential bridge output voltage, or check
              whether a four-resistor Wheatstone bridge is
              balanced.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="tool-section"
        aria-label="Wheatstone bridge calculator"
      >
        <Container>
          <WheatstoneBridgeCalculator />
        </Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="overview-heading">
              <p className="eyebrow">
                Precision resistance measurement
              </p>

              <h2 id="overview-heading">
                What is a Wheatstone bridge?
              </h2>

              <p>
                A Wheatstone bridge is a four-resistor
                electrical network used to compare
                resistance values with high sensitivity.
                The resistors are arranged as two voltage
                dividers connected across the same supply.
                A detector, meter, or measurement circuit
                compares the voltage at the midpoint of one
                divider with the midpoint of the other.
              </p>

              <p>
                When both midpoint voltages are equal, the
                bridge output is zero and the circuit is
                described as balanced. At balance, the
                resistor ratios are equal, allowing an
                unknown resistance to be calculated from
                three known resistances.
              </p>

              <p>
                Wheatstone bridges are widely used in
                laboratory measurements, resistance
                calibration, strain-gauge systems,
                pressure sensors, load cells, temperature
                sensors, and other circuits where a small
                resistance change must be converted into a
                measurable voltage.
              </p>
            </section>

            <section aria-labelledby="arrangement-heading">
              <p className="eyebrow">
                Four-resistor network
              </p>

              <h2 id="arrangement-heading">
                Wheatstone bridge resistor arrangement
              </h2>

              <p>
                This calculator models R1 and R2 as the
                upper and lower resistors of the left
                voltage-divider arm. R3 and Rx form the
                corresponding upper and lower resistors of
                the right arm.
              </p>

              <ul className="article-list">
                <li>
                  <strong>R1</strong> is the upper-left
                  bridge resistance.
                </li>

                <li>
                  <strong>R2</strong> is the lower-left
                  bridge resistance.
                </li>

                <li>
                  <strong>R3</strong> is the upper-right
                  bridge resistance.
                </li>

                <li>
                  <strong>Rx</strong> is the lower-right
                  resistance, which may be unknown.
                </li>

                <li>
                  <strong>Vs</strong> is the voltage
                  supplied across the complete bridge.
                </li>

                <li>
                  <strong>Vout</strong> is the difference
                  between the left and right midpoint
                  voltages.
                </li>
              </ul>

              <p>
                Different textbooks may label or rotate the
                bridge arms differently. The balance
                equation must always match the physical
                resistor arrangement being used. The
                labels on this page correspond directly to
                the calculator inputs and formulas shown
                below.
              </p>
            </section>

            <section aria-labelledby="balance-heading">
              <p className="eyebrow">
                Null-balance condition
              </p>

              <h2 id="balance-heading">
                Wheatstone bridge balance equation
              </h2>

              <p>
                The bridge is balanced when the ratio of
                the two resistors in the left arm equals
                the ratio of the two resistors in the
                right arm.
              </p>

              <div className="formula-card">
                <p>
                  Balance condition
                  <span>R1 ÷ R2 = R3 ÷ Rx</span>
                </p>

                <p>
                  Equivalent product form
                  <span>R1 × Rx = R2 × R3</span>
                </p>
              </div>

              <p>
                At this condition, both midpoint voltages
                are equal. An ideal voltmeter connected
                between the midpoints reads zero volts,
                and no current flows through an ideal
                detector branch.
              </p>
            </section>

            <section aria-labelledby="unknown-heading">
              <p className="eyebrow">
                Solve the missing resistance
              </p>

              <h2 id="unknown-heading">
                Unknown resistance formula
              </h2>

              <p>
                Rearranging the balance equation gives the
                unknown lower-right resistance:
              </p>

              <div className="formula-card">
                <p>
                  Unknown resistance
                  <span>Rx = R2 × R3 ÷ R1</span>
                </p>
              </div>

              <p>
                Because this calculation depends on a
                resistance ratio, R1, R2, and R3 may be
                entered in ohms, kilo-ohms, or mega-ohms,
                provided all three values use the same
                unit. The calculated Rx value will use the
                same resistance unit.
              </p>
            </section>

            <section aria-labelledby="unknown-example-heading">
              <p className="eyebrow">
                Worked balance example
              </p>

              <h2 id="unknown-example-heading">
                Calculate an unknown bridge resistance
              </h2>

              <p>
                Suppose a balanced Wheatstone bridge has
                <strong> R1 = 100 Ω</strong>,
                <strong> R2 = 200 Ω</strong>, and
                <strong> R3 = 300 Ω</strong>. Calculate
                Rx.
              </p>

              <ol className="calculation-steps">
                <li>
                  Write the equation:{" "}
                  <strong>
                    Rx = R2 × R3 ÷ R1
                  </strong>
                  .
                </li>

                <li>
                  Substitute the known values:{" "}
                  <strong>
                    Rx = 200 × 300 ÷ 100
                  </strong>
                  .
                </li>

                <li>
                  Multiply R2 by R3:{" "}
                  <strong>
                    200 × 300 = 60,000
                  </strong>
                  .
                </li>

                <li>
                  Divide by R1:{" "}
                  <strong>
                    Rx = 60,000 ÷ 100 = 600 Ω
                  </strong>
                  .
                </li>
              </ol>

              <p>
                The unknown resistance is therefore
                <strong> 600 Ω</strong>. The two ratios are
                100 ÷ 200 = 0.5 and 300 ÷ 600 = 0.5, so
                the bridge is balanced.
              </p>
            </section>

            <section aria-labelledby="output-heading">
              <p className="eyebrow">
                Differential bridge signal
              </p>

              <h2 id="output-heading">
                Wheatstone bridge output-voltage formula
              </h2>

              <p>
                A Wheatstone bridge can also be analyzed as
                two voltage dividers connected to the same
                supply. The left midpoint voltage depends
                on R1 and R2, while the right midpoint
                voltage depends on R3 and Rx.
              </p>

              <div className="formula-card">
                <p>
                  Left midpoint voltage
                  <span>
                    Vleft = Vs × R2 ÷ (R1 + R2)
                  </span>
                </p>

                <p>
                  Right midpoint voltage
                  <span>
                    Vright = Vs × Rx ÷ (R3 + Rx)
                  </span>
                </p>

                <p>
                  Differential output
                  <span>Vout = Vleft − Vright</span>
                </p>
              </div>

              <p>
                Combining the divider equations gives:
              </p>

              <div className="formula-card">
                <p>
                  Bridge output voltage
                  <span>
                    Vout = Vs × [R2 ÷ (R1 + R2) − Rx ÷
                    (R3 + Rx)]
                  </span>
                </p>
              </div>

              <p>
                A positive result means the left midpoint
                voltage is higher than the right midpoint
                voltage. A negative result means the right
                midpoint is higher. A result of zero volts
                indicates an ideal balanced bridge.
              </p>
            </section>

            <section aria-labelledby="output-example-heading">
              <p className="eyebrow">
                Worked voltage example
              </p>

              <h2 id="output-example-heading">
                Calculate an unbalanced bridge output
              </h2>

              <p>
                Consider a bridge supplied by
                <strong> 12 V</strong> with
                <strong> R1 = 100 Ω</strong>,
                <strong> R2 = 300 Ω</strong>,
                <strong> R3 = 200 Ω</strong>, and
                <strong> Rx = 300 Ω</strong>.
              </p>

              <ol className="calculation-steps">
                <li>
                  Calculate the left midpoint voltage:{" "}
                  <strong>
                    Vleft = 12 × 300 ÷ (100 + 300)
                    = 9 V
                  </strong>
                  .
                </li>

                <li>
                  Calculate the right midpoint voltage:{" "}
                  <strong>
                    Vright = 12 × 300 ÷ (200 + 300)
                    = 7.2 V
                  </strong>
                  .
                </li>

                <li>
                  Subtract the right voltage from the left:{" "}
                  <strong>
                    Vout = 9 − 7.2 = 1.8 V
                  </strong>
                  .
                </li>
              </ol>

              <p>
                The bridge output is
                <strong> +1.8 V</strong>. Because the two
                midpoint voltages are different, the bridge
                is unbalanced.
              </p>
            </section>

            <section aria-labelledby="zero-output-heading">
              <p className="eyebrow">
                Balanced voltage condition
              </p>

              <h2 id="zero-output-heading">
                Why does a balanced bridge produce zero
                output?
              </h2>

              <p>
                When the resistance ratios are equal, both
                divider arms produce the same fraction of
                the supply voltage at their midpoint.
                Subtracting two equal voltages gives zero.
              </p>

              <div className="formula-card">
                <p>
                  Equal ratios
                  <span>R1 ÷ R2 = R3 ÷ Rx</span>
                </p>

                <p>
                  Equal midpoint voltages
                  <span>Vleft = Vright</span>
                </p>

                <p>
                  Balanced output
                  <span>Vout = 0 V</span>
                </p>
              </div>

              <p>
                This zero-output condition is also called a
                null condition. Null measurements can be
                highly sensitive because the detector only
                needs to identify whether a small difference
                remains rather than measure the complete
                resistance directly.
              </p>
            </section>

            <section aria-labelledby="sensitivity-heading">
              <p className="eyebrow">
                Detecting small resistance changes
              </p>

              <h2 id="sensitivity-heading">
                Wheatstone bridge sensitivity
              </h2>

              <p>
                A bridge initially adjusted to balance can
                produce a measurable voltage when one
                resistor changes by a very small amount.
                This makes the circuit useful with
                resistive sensors whose resistance varies
                with force, pressure, strain, temperature,
                light, or another physical quantity.
              </p>

              <p>
                Sensitivity depends on the supply voltage,
                nominal resistor values, bridge geometry,
                sensor position, and the input impedance
                and gain of the measurement circuit. A
                larger supply voltage generally produces a
                larger output for the same fractional
                resistance change, but it can also increase
                sensor self-heating and power dissipation.
              </p>

              <p>
                Practical instruments often feed the small
                differential output into an instrumentation
                amplifier. This amplifier provides high
                input impedance, good common-mode rejection,
                and sufficient gain for data acquisition or
                control systems.
              </p>
            </section>

            <section aria-labelledby="configurations-heading">
              <p className="eyebrow">
                Sensor bridge arrangements
              </p>

              <h2 id="configurations-heading">
                Quarter-, half-, and full-bridge circuits
              </h2>

              <p>
                Measurement bridges are often classified by
                the number of active sensing elements in
                the four bridge arms.
              </p>

              <ul className="article-list">
                <li>
                  A <strong>quarter bridge</strong> uses one
                  active sensor and three fixed or
                  completion resistors.
                </li>

                <li>
                  A <strong>half bridge</strong> uses two
                  active elements, often arranged to improve
                  sensitivity or temperature compensation.
                </li>

                <li>
                  A <strong>full bridge</strong> uses four
                  active sensing elements and can provide
                  the largest output and strongest
                  compensation when arranged correctly.
                </li>
              </ul>

              <p>
                The basic calculator on this page treats all
                four values as ideal resistances. It does
                not automatically model strain-gauge
                orientation, gauge factor, mechanical
                strain, or temperature compensation.
              </p>
            </section>

            <section aria-labelledby="applications-heading">
              <p className="eyebrow">
                Laboratory and engineering uses
              </p>

              <h2 id="applications-heading">
                Where Wheatstone bridges are used
              </h2>

              <ul className="article-list">
                <li>
                  Measuring an unknown electrical
                  resistance by comparison.
                </li>

                <li>
                  Strain-gauge load cells and force sensors.
                </li>

                <li>
                  Pressure transducers and diaphragm
                  sensors.
                </li>

                <li>
                  Resistance-temperature detectors and
                  thermistor circuits.
                </li>

                <li>
                  Precision calibration and resistance
                  standards.
                </li>

                <li>
                  Structural testing and material-strain
                  measurement.
                </li>

                <li>
                  Electronic scales and weighing systems.
                </li>

                <li>
                  Educational laboratory experiments on
                  resistance ratios and null measurement.
                </li>
              </ul>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">
                Input consistency
              </p>

              <h2 id="units-heading">
                Resistance and voltage units
              </h2>

              <p>
                Enter every resistance using one consistent
                unit. For example, all four values may be
                entered in ohms or all four may be entered
                in kilo-ohms. Mixing 100 ohms with a value
                entered as 2 but intended to mean 2
                kilo-ohms will produce an incorrect ratio.
              </p>

              <ul className="article-list">
                <li>
                  Ohm inputs produce an unknown resistance
                  in ohms.
                </li>

                <li>
                  Kilo-ohm inputs produce an unknown
                  resistance in kilo-ohms.
                </li>

                <li>
                  Supply voltage should be entered in volts.
                </li>

                <li>
                  Output voltage is reported in volts and
                  may be positive, negative, or zero.
                </li>
              </ul>

              <p>
                Resistance ratios are dimensionless, so the
                balance condition is unaffected by the
                chosen resistance scale as long as the
                values are consistent.
              </p>
            </section>

            <section aria-labelledby="tolerance-heading">
              <p className="eyebrow">
                Real component behavior
              </p>

              <h2 id="tolerance-heading">
                Resistor tolerance and bridge error
              </h2>

              <p>
                Real resistors do not normally equal their
                marked values exactly. A resistor with a
                one-percent tolerance may differ from its
                nominal resistance by as much as one
                percent under specified conditions.
              </p>

              <p>
                Small deviations in any bridge arm can
                create a nonzero output even when the
                nominal resistor values appear balanced.
                Precision bridge circuits therefore use
                accurate matched resistors, trimming
                components, calibration procedures, or
                software correction.
              </p>

              <p>
                Temperature also changes resistance.
                Matched components with similar temperature
                coefficients can reduce drift, while
                physical placement and thermal symmetry can
                improve measurement stability.
              </p>
            </section>

            <section aria-labelledby="measurement-heading">
              <p className="eyebrow">
                Practical measurement factors
              </p>

              <h2 id="measurement-heading">
                Meter loading, lead resistance, and noise
              </h2>

              <p>
                An ideal bridge detector draws no current.
                A real voltmeter or amplifier has finite
                input impedance and can slightly load the
                bridge. High-input-impedance measurement
                equipment minimizes this effect.
              </p>

              <p>
                Lead and contact resistance can become
                important when measuring very low
                resistances. Kelvin or four-wire
                connections are commonly used in precision
                low-resistance measurements to separate
                current-carrying leads from voltage-sensing
                leads.
              </p>

              <p>
                Electrical noise, supply ripple,
                electromagnetic interference, and
                thermoelectric voltages can also affect
                small bridge signals. Shielding, filtering,
                stable excitation, differential
                amplification, and careful grounding help
                preserve measurement accuracy.
              </p>
            </section>

            <section aria-labelledby="procedure-heading">
              <p className="eyebrow">
                Practical laboratory method
              </p>

              <h2 id="procedure-heading">
                How to use a Wheatstone bridge
              </h2>

              <ol className="calculation-steps">
                <li>
                  Connect the four resistors in the bridge
                  arrangement represented by R1, R2, R3,
                  and Rx.
                </li>

                <li>
                  Apply a stable supply voltage across the
                  top and bottom bridge nodes.
                </li>

                <li>
                  Connect a sensitive voltmeter or null
                  detector between the two midpoint nodes.
                </li>

                <li>
                  Adjust a known resistance, when the
                  physical bridge includes an adjustable
                  element, until the detector approaches
                  zero.
                </li>

                <li>
                  Record the three known resistance values
                  at balance.
                </li>

                <li>
                  Calculate the unknown value using{" "}
                  <strong>
                    Rx = R2 × R3 ÷ R1
                  </strong>
                  .
                </li>

                <li>
                  Repeat the measurement when necessary and
                  estimate uncertainty from component
                  tolerances, instrument resolution, and
                  repeatability.
                </li>
              </ol>

              <p>
                Before applying power, verify the resistor
                ratings and expected current. High supply
                voltage or low resistance can cause
                excessive power dissipation and component
                heating.
              </p>
            </section>

            <section aria-labelledby="power-heading">
              <p className="eyebrow">
                Component safety
              </p>

              <h2 id="power-heading">
                Resistance, current, and power dissipation
              </h2>

              <p>
                Each bridge arm forms a series branch across
                the supply. The current in the left arm and
                right arm can be estimated independently.
              </p>

              <div className="formula-card">
                <p>
                  Left-arm current
                  <span>
                    Ileft = Vs ÷ (R1 + R2)
                  </span>
                </p>

                <p>
                  Right-arm current
                  <span>
                    Iright = Vs ÷ (R3 + Rx)
                  </span>
                </p>

                <p>
                  Resistor power
                  <span>P = I² × R</span>
                </p>
              </div>

              <p>
                A resistor&apos;s calculated power should
                remain comfortably below its rated power.
                Temperature rise can change resistance and
                create additional measurement error even
                when the component is not immediately
                damaged.
              </p>
            </section>

            <section aria-labelledby="interpretation-heading">
              <p className="eyebrow">
                Understanding the result
              </p>

              <h2 id="interpretation-heading">
                How to interpret bridge output
              </h2>

              <ul className="article-list">
                <li>
                  <strong>Vout = 0 V:</strong> the ideal
                  bridge is balanced.
                </li>

                <li>
                  <strong>Vout &gt; 0 V:</strong> the left
                  midpoint voltage is higher than the right
                  midpoint voltage.
                </li>

                <li>
                  <strong>Vout &lt; 0 V:</strong> the right
                  midpoint voltage is higher than the left
                  midpoint voltage.
                </li>

                <li>
                  A small nonzero result may represent a
                  real sensor change, component mismatch,
                  measurement offset, temperature drift, or
                  electrical noise.
                </li>
              </ul>

              <p>
                The sign of output depends on which
                midpoint is defined as positive. Reversing
                the meter leads reverses the sign but does
                not change the magnitude of imbalance.
              </p>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">
                Model assumptions
              </p>

              <h2 id="limitations-heading">
                Assumptions and limitations
              </h2>

              <p>
                This calculator models an ideal resistive
                Wheatstone bridge supplied by a steady
                direct voltage. Every resistance must be
                positive and finite.
              </p>

              <p>
                It does not automatically include resistor
                tolerance, temperature coefficient,
                self-heating, detector loading, source
                resistance, lead resistance, contact
                resistance, noise, amplifier offset, or
                calibration uncertainty.
              </p>

              <p>
                Reactive AC bridge circuits containing
                capacitors or inductors require complex
                impedance calculations. Those circuits
                cannot be analyzed correctly by replacing
                impedance with resistance alone.
              </p>
            </section>

            <RelatedCalculators
              currentSlug="wheatstone-bridge-calculator"
              heading="Continue your bridge-circuit analysis"
            />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">
                Common questions
              </p>

              <h2 id="faq-heading">
                Wheatstone bridge calculator FAQ
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

              <h2>Wheatstone bridge rules</h2>

              <ul className="article-list">
                <li>
                  Balance occurs when{" "}
                  <strong>
                    R1 ÷ R2 = R3 ÷ Rx
                  </strong>
                  .
                </li>

                <li>
                  At ideal balance,{" "}
                  <strong>Vout = 0 V</strong>.
                </li>

                <li>
                  Calculate the unknown using{" "}
                  <strong>
                    Rx = R2 × R3 ÷ R1
                  </strong>
                  .
                </li>

                <li>
                  Use positive resistance values and
                  consistent units.
                </li>

                <li>
                  Real measurements are affected by
                  tolerance, temperature, loading, and
                  noise.
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
