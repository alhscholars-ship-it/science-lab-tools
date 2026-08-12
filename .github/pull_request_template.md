## Summary

<!-- Explain what changed and why. Keep this focused on user or engineering value. -->

## Validation

<!-- List the commands and manual checks completed. Remove items that do not apply. -->

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm check:links`
- [ ] `pnpm build`
- [ ] `pnpm check:seo`
- [ ] `pnpm check:performance`
- [ ] `pnpm check:a11y`

## User-facing quality

- [ ] Mobile and desktop layouts were reviewed.
- [ ] Keyboard navigation and visible focus states were reviewed.
- [ ] Loading, empty, validation, and error states were considered.
- [ ] Scientific formulas, units, examples, and claims were checked against reliable sources.

## SEO and content

- [ ] Canonical URLs, titles, descriptions, robots directives, and structured data were reviewed where relevant.
- [ ] New or changed routes are covered by the sitemap and internal-link checks.
- [ ] The change does not introduce thin, duplicate, keyword-stuffed, or unsupported content.
- [ ] Removed or renamed public URLs have an appropriate redirect or documented not-found behavior.

## Security and privacy

- [ ] No secrets, credentials, personal data, or sensitive logs are included.
- [ ] New dependencies and external scripts are necessary and narrowly scoped.
- [ ] Security headers, analytics, storage, and data collection were reviewed where relevant.

## Deployment and rollback

<!-- Describe environment variables, migrations, deployment dependencies, known risks, and how to revert safely. Write "None" when not applicable. -->

None.
