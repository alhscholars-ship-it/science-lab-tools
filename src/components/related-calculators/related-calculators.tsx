import Link from "next/link";

import {
  calculators,
  type CalculatorDefinition,
} from "@/content/calculators/registry";

type RelatedCalculatorsProps = {
  currentSlug: string;
  limit?: number;
  heading?: string;
};

const ignoredTokens = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "calculate",
  "calculator",
  "calculators",
  "for",
  "formula",
  "from",
  "in",
  "into",
  "law",
  "of",
  "or",
  "the",
  "to",
  "using",
  "with",
]);

function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .replace(/ies$/, "y")
    .replace(/s$/, "");
}

function tokenize(value: string): string[] {
  return value
    .split(/\s+/)
    .map(normalizeToken)
    .filter(
      (token) =>
        token.length >= 2 &&
        !ignoredTokens.has(token),
    );
}

function buildWeightedTokens(
  calculator: CalculatorDefinition,
): Map<string, number> {
  const weights = new Map<string, number>();

  const addTokens = (
    value: string,
    weight: number,
  ) => {
    for (const token of tokenize(value)) {
      weights.set(
        token,
        Math.max(weights.get(token) ?? 0, weight),
      );
    }
  };

  addTokens(calculator.name, 6);

  for (const keyword of calculator.keywords) {
    addTokens(keyword, 4);
  }

  addTokens(calculator.shortDescription, 2);

  return weights;
}

function scoreCalculatorRelationship(
  current: CalculatorDefinition,
  candidate: CalculatorDefinition,
): number {
  if (
    current.slug === candidate.slug ||
    current.category !== candidate.category
  ) {
    return Number.NEGATIVE_INFINITY;
  }

  const currentTokens = buildWeightedTokens(current);
  const candidateTokens = buildWeightedTokens(candidate);

  let score = 10;

  for (const [token, currentWeight] of currentTokens) {
    const candidateWeight = candidateTokens.get(token);

    if (candidateWeight) {
      score += currentWeight * candidateWeight;
    }
  }

  const currentName = current.name.toLowerCase();
  const candidateName = candidate.name.toLowerCase();

  for (const keyword of current.keywords) {
    const normalizedKeyword = keyword
      .toLowerCase()
      .replace(/\s+calculator$/, "")
      .trim();

    if (
      normalizedKeyword.length >= 4 &&
      candidateName.includes(normalizedKeyword)
    ) {
      score += 18;
    }
  }

  for (const keyword of candidate.keywords) {
    const normalizedKeyword = keyword
      .toLowerCase()
      .replace(/\s+calculator$/, "")
      .trim();

    if (
      normalizedKeyword.length >= 4 &&
      currentName.includes(normalizedKeyword)
    ) {
      score += 18;
    }
  }

  return score;
}

export function getRelatedCalculators(
  currentSlug: string,
  limit = 4,
): readonly CalculatorDefinition[] {
  const currentCalculator = calculators.find(
    (calculator) => calculator.slug === currentSlug,
  );

  if (!currentCalculator || limit <= 0) {
    return [];
  }

  return calculators
    .map((calculator, registryIndex) => ({
      calculator,
      registryIndex,
      score: scoreCalculatorRelationship(
        currentCalculator,
        calculator,
      ),
    }))
    .filter(
      ({ score }) =>
        Number.isFinite(score),
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.registryIndex - b.registryIndex,
    )
    .slice(0, limit)
    .map(({ calculator }) => calculator);
}

export function RelatedCalculators({
  currentSlug,
  limit = 4,
  heading = "Explore related calculators",
}: RelatedCalculatorsProps) {
  const relatedCalculators = getRelatedCalculators(
    currentSlug,
    limit,
  );

  if (!relatedCalculators.length) {
    return null;
  }

  return (
    <section
      className="related-calculators"
      aria-labelledby={`${currentSlug}-related-calculators-heading`}
    >
      <p className="eyebrow">Related calculators</p>

      <h2 id={`${currentSlug}-related-calculators-heading`}>
        {heading}
      </h2>

      <div className="related-calculators__grid">
        {relatedCalculators.map((calculator) => (
          <article
            className="related-calculators__card"
            key={calculator.slug}
          >
            <span>{calculator.category}</span>

            <h3>
              <Link href={calculator.href}>
                {calculator.name}
              </Link>
            </h3>

            <p>{calculator.shortDescription}</p>

            <Link
              className="related-calculators__link"
              href={calculator.href}
            >
              Open calculator
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
