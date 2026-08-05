import type { NextConfig } from "next";

import { createCanonicalHostRedirect } from "./src/config/canonical-host";
import { createSecurityHeaders } from "./src/config/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
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
