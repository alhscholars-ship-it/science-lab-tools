# ALH Science Hub

ALH Science Hub is a Next.js learning platform for science calculations, formula review, experiment planning, laboratory reporting, and classroom-ready resources.

## Product direction

The application is organized around a learner's workflow rather than a calculator-only experience. Students can move between guided calculations, formula references, scientific-method resources, report guidance, and downloadable templates while keeping the reasoning behind each task visible.

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest
- ESLint
- GitHub Actions quality and accessibility checks

## Local development

Requirements:

- Node.js 24.x
- pnpm 11.x

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The local application is available at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and configure the deployment-specific values. `NEXT_PUBLIC_SITE_URL` must point to the canonical URL of this deployment so metadata, canonical URLs, sitemap output, and structured data reference the correct site.

## Quality gates

Run the full validation suite before production deployment:

```bash
pnpm check
```

The check command covers linting, TypeScript, tests, internal links, production build, rendered SEO validation, and JavaScript performance budgets. Accessibility has a dedicated check and GitHub Actions workflow.

## Deployment

Deploy this repository as its own hosting project. Do not attach the production domain used by another student repository to this project. Configure the canonical domain through `NEXT_PUBLIC_SITE_URL` and keep analytics/search-verification variables deployment-specific.
