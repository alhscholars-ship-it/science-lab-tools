import type { Metadata } from "next";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { ScientificUnitConverter } from "@/components/calculators/scientific-unit-converter";
import { RelatedCalculators } from "@/components/related-calculators";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebApplicationSchema,
  serializeJsonLd,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific Unit Converter";
const pageDescription =
  "Convert length, mass, temperature, volume, pressure, and energy units with a free scientific unit converter, exact factors, and worked examples.";
const pagePath = "/calculators/scientific-unit-converter";

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
    question: "Which scientific units can I convert?",
    answer: "The converter supports common SI, metric, imperial, and US customary units for length, mass, temperature, volume, pressure, and energy.",
  },
  {
    question: "How are temperature conversions calculated?",
    answer: "Temperature uses scale-specific offsets as well as ratios. Celsius is converted to kelvin by adding 273.15, while Fahrenheit also requires a five-ninths scale factor.",
  },
  {
    question: "Are the conversion factors exact?",
    answer: "Defined SI relationships such as 1 inch equals 0.0254 meter are treated as exact. Displayed results are limited to twelve significant digits for readability.",
  },
] as const;

const webApplicationSchema = createWebApplicationSchema({ name: pageTitle, description: pageDescription, path: pagePath });
const faqSchema = createFaqSchema(faqItems);
const breadcrumbSchema = createBreadcrumbSchema({
  pageName: pageTitle,
  pagePath,
  sectionName: "Laboratory Calculators",
  sectionPath: "/laboratory-calculators",
});

export default function ScientificUnitConverterPage() {
  return (
    <main>
      {[webApplicationSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      ))}

      <section className="tool-page-hero">
        <Container>
          <CalculatorBreadcrumb category="Laboratory" title={pageTitle} />
          <div className="tool-page-hero__content">
            <p className="eyebrow">Laboratory measurement tool</p>
            <h1>{pageTitle}</h1>
            <p>Convert common physics, chemistry, and laboratory measurements between SI, metric, and customary units.</p>
          </div>
        </Container>
      </section>

      <section className="tool-section" aria-label="Scientific unit converter">
        <Container><ScientificUnitConverter /></Container>
      </section>

      <section className="article-section">
        <Container className="article-layout">
          <article className="article-content">
            <section aria-labelledby="formula-heading">
              <p className="eyebrow">Conversion formula</p>
              <h2 id="formula-heading">How unit conversion works</h2>
              <div className="formula-card">
                <p>Linear conversion relationship <span>target value = source value × conversion factor</span></p>
              </div>
              <p>The converter first expresses a measurement in its category&apos;s SI base unit, then converts that base value into the selected target unit. Temperature is handled separately because Celsius and Fahrenheit include offsets.</p>
            </section>

            <section aria-labelledby="example-heading">
              <p className="eyebrow">Worked example</p>
              <h2 id="example-heading">Worked length conversion example</h2>
              <p>Convert <strong>2.5 meters</strong> to centimeters.</p>
              <ol className="calculation-steps">
                <li>Use the relationship 1 meter = 100 centimeters.</li>
                <li>Multiply: 2.5 × 100.</li>
                <li>Report the result: <strong>250 cm</strong>.</li>
              </ol>
            </section>

            <section aria-labelledby="units-heading">
              <p className="eyebrow">Supported measurements</p>
              <h2 id="units-heading">Science conversion categories</h2>
              <ul className="article-list">
                <li><strong>Length:</strong> meters, metric prefixes, inches, feet, yards, and miles.</li>
                <li><strong>Mass:</strong> kilograms, grams, metric prefixes, tonnes, ounces, and pounds.</li>
                <li><strong>Temperature:</strong> kelvin, Celsius, and Fahrenheit.</li>
                <li><strong>Volume:</strong> cubic meters, liters, milliliters, microliters, and US liquid units.</li>
                <li><strong>Pressure and energy:</strong> common laboratory, mechanical, electrical, and thermal units.</li>
              </ul>
            </section>

            <section aria-labelledby="limitations-heading">
              <p className="eyebrow">Assumptions and limitations</p>
              <h2 id="limitations-heading">Use converted values responsibly</h2>
              <ul className="article-list">
                <li>Conversion does not increase the precision of the original measurement.</li>
                <li>Round the final value to suitable significant figures for your experiment.</li>
                <li>US liquid units are not interchangeable with similarly named imperial units.</li>
                <li>Temperature values below absolute zero are mathematically converted but physically invalid.</li>
                <li>Always confirm the unit convention required by your laboratory method.</li>
              </ul>
            </section>

            <RelatedCalculators currentSlug="scientific-unit-converter" heading="Continue your measurement work" />

            <section aria-labelledby="faq-heading">
              <p className="eyebrow">Questions and answers</p>
              <h2 id="faq-heading">Scientific unit conversion FAQ</h2>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
                ))}
              </div>
            </section>
          </article>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <p className="sidebar-card__label">Conversion checklist</p>
              <h2>Before reporting a value</h2>
              <ul>
                <li>Confirm the measurement type</li>
                <li>Choose source and target units</li>
                <li>Keep the original precision</li>
                <li>Include the target-unit symbol</li>
                <li>Check significant figures</li>
              </ul>
            </div>
            <CalculatorTrustPanel subject="laboratory" />
          </aside>
        </Container>
      </section>
    </main>
  );
}
