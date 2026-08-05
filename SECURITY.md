# Security Policy

## Supported versions

Security fixes are applied to the current production version and the `main` branch. Older commits, forks, and unofficial deployments are not supported.

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public issue, discussion, pull request, or social post.

Use GitHub's private vulnerability reporting flow from the repository's **Security** tab when it is available. Include:

- A clear description of the issue and its impact
- The affected URL, route, component, dependency, or commit
- Reproduction steps or a minimal proof of concept
- Relevant logs, screenshots, or request and response details with secrets removed
- Any known mitigations or conditions required for exploitation

If private vulnerability reporting is unavailable, open a public issue containing only a request for a private reporting channel. Do not include exploit details, credentials, personal data, or sensitive logs in that issue.

## Scope

Reports are particularly useful when they concern:

- Cross-site scripting, injection, request forgery, or unsafe redirects
- Authentication, authorization, session, or secret exposure defects
- Dependency or build-pipeline compromise
- Misconfigured security headers or deployment behavior
- Exposure of personal, analytics, or operational data

Scientific-content corrections, calculator defects without a security impact, accessibility problems, and general bugs should be reported through the normal issue tracker.

## Handling reports

Maintainers will assess reproducibility, severity, affected versions, and practical impact before deciding on remediation and disclosure. Response times are best effort; this project does not currently provide a formal security-service-level agreement or bug bounty.

Please allow maintainers a reasonable opportunity to investigate and release a fix before public disclosure. Good-faith research that avoids privacy violations, service disruption, destructive testing, and data access beyond what is necessary to demonstrate the issue is appreciated.
