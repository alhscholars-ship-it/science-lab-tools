# Hostinger deployment safety

Science Calc Hub runs as a Next.js standalone server on Hostinger Business
Shared Hosting. The hosting account has a hard Max Processes (NPROC) limit of
120 shared by every site on the account.

## Production deployment command

Hostinger should perform only these production steps:

1. Install the locked dependencies with `pnpm install --frozen-lockfile`.
2. Allow required dependency postinstall scripts to finish.
3. Run one production build with `pnpm build`.
4. Start one server with `pnpm start` after the build completes.

Do not configure Hostinger to run `pnpm check`, lint, type-checking, tests, SEO
audits, performance audits, accessibility audits, or multiple builds. Those
checks run in GitHub Actions before merge.

## Concurrency limit

`next.config.ts` sets the supported Next.js `experimental.cpus` option to 4.
The previous Hostinger build used 63 workers while producing approximately 138
routes. Four workers leave headroom below the account-wide 120-process limit
for the existing Next.js and WordPress sites.

The production `build` script runs one
`UV_THREADPOOL_SIZE=1 next build --webpack` command. Next.js 16 defaults to the
Rust-based Turbopack builder, whose native thread pools remained close to the
Hostinger NPROC ceiling even after page workers were limited. Webpack mode
avoids that uncontrolled native pool, while Node's documented
`UV_THREADPOOL_SIZE` setting prevents each build worker from reserving the
default four-thread libuv pool. GitHub's route, SEO, performance, and
accessibility checks protect output parity.

Run `pnpm verify:hostinger` before changing build scripts, the worker limit, or
the package-manager version.

## Static-generation audit

- The App Router currently contains 133 `page.tsx` files.
- There are no dynamic route segments and no `generateStaticParams`
  implementations, so no parameter list is multiplying route generation.
- There is no explicit ISR `revalidate` configuration or build-time remote data
  fetching to fan out.
- The sitemap, canonical metadata, redirects, and all indexable routes remain
  unchanged by the concurrency limit.
- Do not convert these pages to runtime rendering or ISR merely to reduce worker
  usage. Revisit rendering modes only when a page has genuinely dynamic data.

The GitHub Quality workflow runs the same single production build through
`pnpm build:measure`. That CI-only wrapper reports the peak descendant process
and thread counts while preserving the generated `.next` output for SEO and
performance checks. Hostinger continues to run the minimal `pnpm build` script.

## One deployment at a time

- Connect only one Hostinger website/repository deployment to this GitHub
  repository. Confirm that `sciencecalchub.org`, if present in the same
  Hostinger account, is not independently deploying this repository.
- Never start another deployment while a build is running for any site on the
  shared account.
- Wait for dependency installation and every build worker to exit before
  redeploying.
- A GitHub Actions success does not mean a Hostinger build has finished; check
  the Hostinger deployment status separately.

Verify active build processes over SSH:

```sh
pgrep -u "$USER" -af 'next build|pnpm|npm|corepack|jest-worker'
```

No output means no matching build is currently running.

## Safe deployment runbook

1. Confirm GitHub Quality and Accessibility checks are green.
2. Confirm no other Hostinger deployment is queued or running.
3. Run the SSH `pgrep` command above and require no output.
4. Merge one approved pull request into `main`.
5. Observe the single Hostinger deployment through build completion.
6. Confirm the new deployment is marked **Current**.
7. Check the homepage and a representative calculator for HTTP 200 responses.
8. Confirm the previous server exited and only one current standalone server
   remains.

## Startup and shutdown behavior

`scripts/start-standalone.mjs` starts exactly one child process: the generated
`.next/standalone/server.js`. It contains no restart loop. SIGTERM and SIGINT
are forwarded to that child, and the wrapper waits for the child to exit. This
prevents an old server from remaining orphaned after a redeployment.

## Rollback

1. Stop new deployments and wait for all active build commands to finish.
2. In Hostinger, select the last known-good completed deployment and redeploy it
   once, or revert the deployment-safety commit in GitHub and merge that single
   revert.
3. Do not run concurrent rollback and forward deployments.
4. Confirm the process list is clear before starting the rollback build.

Rolling back the code restores the previous worker behavior, so prefer keeping
the four-worker limit unless Hostinger support changes the account limits.
