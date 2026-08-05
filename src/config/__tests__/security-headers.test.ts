import { describe, expect, it } from "vitest";

import { createSecurityHeaders } from "../security-headers";

describe("security headers", () => {
  it("contains one unique value for every required header", () => {
    const headers = createSecurityHeaders();
    const names = headers.map(({ key }) => key);

    expect(new Set(names).size).toBe(names.length);
    expect(
      Object.fromEntries(
        headers.map(({ key, value }) => [key, value]),
      ),
    ).toMatchObject({
      "Strict-Transport-Security": "max-age=31536000",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
      "Origin-Agent-Cluster": "?1",
      "X-DNS-Prefetch-Control": "off",
    });
  });

  it("keeps critical CSP restrictions enabled", () => {
    const csp = createSecurityHeaders().find(
      ({ key }) => key === "Content-Security-Policy",
    )?.value;

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("frame-src 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("script-src-attr 'none'");
    expect(csp).toContain("media-src 'self'");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("disables browser capabilities the application does not use", () => {
    const permissionsPolicy = createSecurityHeaders().find(
      ({ key }) => key === "Permissions-Policy",
    )?.value;

    expect(permissionsPolicy).toContain("camera=()");
    expect(permissionsPolicy).toContain("display-capture=()");
    expect(permissionsPolicy).toContain("geolocation=()");
    expect(permissionsPolicy).toContain("microphone=()");
    expect(permissionsPolicy).toContain("payment=()");
    expect(permissionsPolicy).toContain("publickey-credentials-get=()");
    expect(permissionsPolicy).toContain("usb=()");
  });
});
