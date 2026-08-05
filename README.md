# Science Lab Tools

Science Lab Tools is a fast, accessible collection of science calculators, laboratory report templates, worksheets, formula references, and practical learning resources for students, teachers, and homeschool families.

## What the project provides

- Chemistry, physics, and laboratory calculators with formulas, units, worked steps, and explanations
- Laboratory report guidance and reusable practical-work templates
- Scientific-method resources for hypotheses, variables, observations, and experiments
- Formula references connected to relevant calculators
- Crawlable, server-rendered pages with page-level metadata and structured data
- Responsive, keyboard-accessible interfaces designed for classroom and independent study

## Quality and SEO foundations

The application includes automated checks for:

- TypeScript correctness and ESLint rules
- Unit and regression tests
- Internal links and route integrity
- Metadata, canonical URLs, robots directives, sitemap coverage, and structured data
- Performance budgets and production builds
- Automated accessibility testing with axe and Playwright

The site uses Next.js App Router, React, TypeScript, and Tailwind CSS. It includes XML sitemap and robots generation, Open Graph and Twitter metadata, JSON-LD, Web Vitals reporting, canonical URL handling, and production security headers.

## Local development

### Requirements

- Node.js 24
- pnpm 11

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables

Use `.env.example` as the source of truth. The production site must define `NEXT_PUBLIC_SITE_URL` with the canonical HTTPS origin. Optional verification and analytics variables can be added for Google Search Console, Bing Webmaster Tools, and Google Analytics.

## Validation commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm check:links
pnpm build
pnpm check:seo
pnpm check:performance
pnpm check:a11y
```

Run the complete non-browser quality pipeline with:

```bash
pnpm check
```

## Project structure

```text
src/app/              Routes, metadata endpoints, and page composition
src/components/       Shared layout, UI, calculator, and analytics components
src/content/          Calculator registry, routes, and educational content
src/lib/              Calculation, validation, formatting, and SEO utilities
scripts/               SEO, link, accessibility, and performance checks
public/                Static brand and public assets
```

## Content and product principles

New calculators or resources should solve a clear user problem, provide accurate formulas and units, include explanatory content, link to related resources, and pass the existing quality checks. Avoid thin, duplicate, speculative, or keyword-stuffed pages. Remove code or content only after confirming it is unused and covered by tests or repository-wide references.

## Contributing

Before opening a pull request, run the relevant tests and `pnpm check`. For user-facing pages, verify mobile behavior, keyboard navigation, metadata, structured data, internal links, and scientific accuracy.

## License

This repository is currently marked `UNLICENSED`. No reuse rights are granted unless the repository owner adds an explicit license.