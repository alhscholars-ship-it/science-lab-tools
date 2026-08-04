import type { Metadata } from "next";

import { CalculatorBreadcrumb } from "@/components/calculator-breadcrumb";
import { CalculatorTrustPanel } from "@/components/calculator-trust";
import { ScientificNotationCalculator } from "@/components/calculators/scientific-notation-calculator";
import { RelatedCalculators } from "@/components/related-calculators";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { createBreadcrumbSchema, createFaqSchema, createWebApplicationSchema, serializeJsonLd } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/url";

const pageTitle = "Scientific Notation Calculator";
const pageDescription =
  "Convert decimals to scientific notation, expand scientific notation, and add, subtract, multiply, or divide values with selectable significant figures.";
const pagePath = "/calculators/scientific-notation-calculator";

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
  { question: "What is normalized scientific notation?", answer: "Normalized scientific notation writes a number as a coefficient with an absolute value from 1 up to, but not including, 10 multiplied by a power of ten." },
  { question: "How do I convert a decimal to scientific notation?", answer: "Move the decimal point until one nonzero digit remains to its left. The number of places moved becomes the exponent; moving left gives a positive exponent and moving right gives a negative exponent." },
  { question: "How do significant figures affect the result?", answer: "The selected precision rounds the displayed coefficient. Choose a precision that reflects the least precise measured input rather than adding unsupported certainty." },
] as const;

const webApplicationSchema = createWebApplicationSchema({ name: pageTitle, description: pageDescription, path: pagePath });
const faqSchema = createFaqSchema(faqItems);
const breadcrumbSchema = createBreadcrumbSchema({ pageName: pageTitle, pagePath, sectionName: "Laboratory Calculators", sectionPath: "/laboratory-calculators" });

export default function ScientificNotationCalculatorPage() {
  return (
    <main>
      {[webApplicationSchema, faqSchema, breadcrumbSchema].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />)}

      <section className="tool-page-hero"><Container>
        <CalculatorBreadcrumb category="Laboratory" title={pageTitle} />
        <div className="tool-page-hero__content"><p className="eyebrow">Science mathematics tool</p><h1>{pageTitle}</h1><p>Convert decimal and scientific notation, or perform arithmetic while keeping results in normalized standard form.</p></div>
      </Container></section>

      <section className="tool-section" aria-label="Scientific notation calculator"><Container><ScientificNotationCalculator /></Container></section>

      <section className="article-section"><Container className="article-layout">
        <article className="article-content">
          <section aria-labelledby="formula-heading">
            <p className="eyebrow">Formula</p><h2 id="formula-heading">Scientific notation format</h2>
            <div className="formula-card"><p>Normalized form <span>N = a × 10ⁿ, where 1 ≤ |a| &lt; 10</span></p></div>
            <p>The coefficient a carries the significant digits and the integer exponent n shows how many powers of ten scale the value. Negative values keep a negative coefficient.</p>
          </section>

          <section aria-labelledby="example-heading">
            <p className="eyebrow">Worked example</p><h2 id="example-heading">Worked decimal conversion example</h2>
            <p>Convert <strong>0.000456</strong> to scientific notation.</p>
            <ol className="calculation-steps"><li>Move the decimal four places right to obtain 4.56.</li><li>Moving right produces a negative exponent.</li><li>Write the result as <strong>4.56 × 10⁻⁴</strong>.</li></ol>
          </section>

          <section aria-labelledby="operations-heading">
            <p className="eyebrow">Calculation guidance</p><h2 id="operations-heading">Operating with powers of ten</h2>
            <ul className="article-list"><li>For multiplication, multiply coefficients and add exponents.</li><li>For division, divide coefficients and subtract exponents.</li><li>For addition or subtraction, first express both values with a common exponent.</li><li>Normalize the coefficient after completing the operation.</li></ul>
          </section>

          <section aria-labelledby="limitations-heading">
            <p className="eyebrow">Assumptions and limitations</p><h2 id="limitations-heading">Precision and numeric limits</h2>
            <ul className="article-list"><li>Results use JavaScript double-precision arithmetic.</li><li>Extremely large or small values outside the supported numeric range are rejected.</li><li>The exponent must be a whole number.</li><li>Displayed coefficients support between 1 and 12 significant figures.</li><li>Precision selection should reflect the uncertainty of measured inputs.</li></ul>
          </section>

          <RelatedCalculators currentSlug="scientific-notation-calculator" heading="Continue your data analysis" />

          <section aria-labelledby="faq-heading"><p className="eyebrow">Questions and answers</p><h2 id="faq-heading">Scientific notation FAQ</h2><div className="faq-list">{faqItems.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
        </article>

        <aside className="article-sidebar"><div className="sidebar-card"><p className="sidebar-card__label">Quick reference</p><h2>Normalization checklist</h2><ul><li>Keep one nonzero digit before the decimal</li><li>Use an integer exponent</li><li>Preserve the sign</li><li>Choose justified significant figures</li><li>Check the decimal form</li></ul></div><CalculatorTrustPanel subject="laboratory" /></aside>
      </Container></section>
    </main>
  );
}
