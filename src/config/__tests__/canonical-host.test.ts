import { describe, expect, it } from "vitest";

import { createCanonicalHostRedirect } from "../canonical-host";

describe("canonical host redirect", () => {
  it("permanently redirects every www path to the HTTPS canonical host", () => {
    expect(createCanonicalHostRedirect()).toEqual({
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "www.sciencecalchub.com",
        },
      ],
      destination: "https://sciencecalchub.com/:path*",
      permanent: true,
    });
  });
});
