import Link from "next/link";

type CalculatorCategory =
  | "Physics"
  | "Chemistry"
  | "Laboratory";

type Props = {
  category: CalculatorCategory;
  title: string;
};

const categoryLinks = {
  Physics: "/physics-calculators",
  Chemistry: "/chemistry-calculators",
  Laboratory: "/laboratory-calculators",
} as const;

export function CalculatorBreadcrumb({
  category,
  title,
}: Props) {
  return (
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

        <li>
          <Link href={categoryLinks[category]}>
            {category} Calculators
          </Link>
        </li>

        <li aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
