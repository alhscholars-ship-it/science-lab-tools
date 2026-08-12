# Contributing to Science Lab Tools

Thank you for helping improve Science Lab Tools. Contributions should increase scientific accuracy, accessibility, usability, maintainability, security, or durable search value.

## Before starting

- Search existing issues and pull requests for overlapping work.
- Prefer improving an existing calculator or resource before creating a near-duplicate page.
- Do not add thin, mass-generated, keyword-stuffed, or unsupported content.
- Do not disclose suspected vulnerabilities publicly. Follow `SECURITY.md`.
- Open a scientific correction issue when proposing a formula, unit, worked-example, or calculation change that needs review.

## Local setup

Requirements:

- Node.js 24
- pnpm 11.13.1 or newer within the supported major version

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Use `NEXT_PUBLIC_SITE_URL` only with an appropriate local or canonical origin. Never commit secrets, credentials, private analytics data, or production-only values.

## Development principles

### Scientific changes

Scientific logic must be reviewable independently of the interface.

- State the governing formula and assumptions.
- Keep units explicit and validate dimensional consistency.
- Cover representative, boundary, invalid, and rounding cases.
- Cite reliable textbooks, standards, peer-reviewed material, or recognized institutional sources when changing scientific claims.
- Avoid unsupported claims such as “most accurate,” “expert reviewed,” or “safe for all uses.”
- Do not add medical, hazardous-chemical, or advanced laboratory guidance without qualified review and clear safety boundaries.

### Calculator and interface changes

- Keep calculation logic separate from presentation where practical.
- Preserve keyboard access, visible focus, meaningful labels, and readable error messages.
- Include loading, empty, validation, success, and failure states where relevant.
- Verify mobile and desktop layouts.
- Avoid unnecessary client components, dependencies, third-party scripts, and hydration.

### SEO and content changes

- Use a self-referencing canonical URL for indexable pages.
- Provide unique, accurate titles and descriptions.
- Keep structured data consistent with visible page content.
- Add new public routes to the correct registry, sitemap, internal links, and tests.
- Prevent orphaned pages and duplicate search intent.
- Do not add synthetic freshness dates, hidden text, doorway pages, or repetitive location variants.

### Removing or renaming public resources

Before deleting or renaming a route, calculator, content entry, dependency, or public asset:

1. Search imports, dynamic references, registries, tests, scripts, metadata, and public URLs.
2. Check analytics, backlinks, Search Console data, and indexed status when available.
3. Add the closest legitimate redirect when a replacement exists; otherwise preserve correct not-found behavior.
4. Update navigation, internal links, sitemap coverage, tests, documentation, and search entries.
5. Run the complete validation pipeline.

## Validation

Run the checks relevant to your change. Before requesting review, the full project pipeline should pass unless the pull request clearly documents why a check is not applicable.

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

The non-browser aggregate command is:

```bash
pnpm check
```

For scientific changes, add focused regression tests that demonstrate the previous defect and the corrected result.

## Pull requests

Keep each pull request focused and complete the repository pull-request template.

A review-ready pull request should include:

- A concise explanation of the user or engineering problem
- The chosen implementation and important trade-offs
- Validation commands and manual checks performed
- Scientific sources and derivations where relevant
- SEO, accessibility, security, privacy, deployment, and rollback implications
- Redirect or not-found handling for changed public URLs

Do not mark work ready for review while known required checks are failing.

## Commit hygiene

- Use clear imperative commit messages.
- Do not commit generated secrets, local environment files, test artifacts, browser profiles, or unrelated formatting changes.
- Keep dependency upgrades separate from unrelated feature work when practical.
- Preserve immutable GitHub Action pins and allow Dependabot to propose reviewed updates.

## Reporting problems

Use the structured GitHub issue forms:

- **Bug report** for reproducible application, accessibility, SEO, layout, search, build, or CI defects
- **Scientific correction** for inaccurate formulas, units, examples, explanations, citations, or calculator results

Security issues must follow `SECURITY.md` and must not be posted with exploit details in a public issue.
