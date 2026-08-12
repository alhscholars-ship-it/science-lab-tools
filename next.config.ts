import type { NextConfig } from "next";

import { createCanonicalHostRedirect } from "./src/config/canonical-host";
import { createSecurityHeaders } from "./src/config/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    // Hostinger shared hosting has a 120-process account limit. Keep build
    // fan-out predictable so static generation cannot exhaust the account.
    cpus: 4,
  },
  async redirects() {
    return [createCanonicalHostRedirect()];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecurityHeaders(),
      },
    ];
  },
};

export default nextConfig;
