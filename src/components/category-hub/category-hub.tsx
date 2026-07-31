import Link from "next/link";

import type { CalculatorDefinition } from "@/content/calculators/registry";

type CategoryHubProps = {
  title: string;
  intro: string;
  topics: readonly string[];
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  calculators: readonly CalculatorDefinition[];
};

export function CategoryHub({
  title,
  intro,
  topics,
  faqs,
  calculators,
}: CategoryHubProps) {
  return (
    <main>
      <section>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>

      <section>
        <h2>Physics Topics</h2>

        <ul>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Physics Calculators</h2>

        <div>
          {calculators.map((calculator) => (
            <article key={calculator.slug}>
              <h3>
                <Link href={calculator.href}>
                  {calculator.name}
                </Link>
              </h3>

              <p>
                {calculator.shortDescription}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>

        {faqs.map((faq) => (
          <article key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
