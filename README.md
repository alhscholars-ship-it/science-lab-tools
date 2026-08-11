# ALH Science Hub

ALH Science Hub is a Next.js learning platform for science calculations, formula review, experiment planning, laboratory reporting, and classroom-ready resources.

Production domain: `https://alh.sciencecalchub.org`

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

Copy `.env.example` to `.env.local` and configure deployment-specific values.

The ALH production deployment must use:

```bash
NEXT_PUBLIC_SITE_URL=https://alh.sciencecalchub.org
```

This value drives metadata, canonical URLs, sitemap output, and structured data, so it must not be set to the root `sciencecalchub.org` deployment.

Keep `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` deployment-specific as well.

Use the origin only: no path, query string, fragment, or credentials. Production builds fail fast (`NODE_ENV=production` with no usable origin) rather than silently publishing `localhost` canonical, sitemap, Open Graph, or structured-data URLs.

## Quality gates

Run the full validation suite before production deployment:

```bash
pnpm check
```

The check command covers linting, TypeScript, tests, internal links, production build, rendered SEO validation, and JavaScript performance budgets. Accessibility has a dedicated check and GitHub Actions workflow.

## Deployment ownership

The production mapping is intentionally split between two independent projects:

- `https://sciencecalchub.org` → `deeplevelpro-cpu/science-lab-tools`
- `https://alh.sciencecalchub.org` → `alhscholars-ship-it/science-lab-tools`

Deploy this repository as its own hosting project. Do not attach `sciencecalchub.org` as an alternate production domain for this repository, and do not reuse the other project's analytics or search-verification values.
