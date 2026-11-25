import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const directories: string[] = [];
const script = path.resolve("scripts/check-internal-links.mjs");

function fixture(link: string, generated: string[], manifest = true) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dynamic-links-"));
  directories.push(root);

  const files: Record<string, string> = {
    "src/app/page.tsx": `export default () => <a href="${link}">Guide</a>`,
    "src/app/guides/[slug]/page.tsx": "export default () => <main>Guide</main>",
  };

  for (const [name, content] of Object.entries(files)) {
    const file = path.join(root, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }

  const manifestPath = path.join(root, "prerender-manifest.json");

  if (manifest) {
    fs.writeFileSync(
      manifestPath,
      JSON.stringify({
        routes: Object.fromEntries(generated.map((route) => [route, {}])),
        dynamicRoutes: { "/guides/[slug]": {} },
      }),
    );
  }

  return { root, manifestPath };
}

function check(root: string, manifestPath: string) {
  return spawnSync(process.execPath, [script], {
    encoding: "utf8",
    env: {
      ...process.env,
      LINK_CHECK_APP_DIR: path.join(root, "src/app"),
      LINK_CHECK_SOURCE_DIR: path.join(root, "src"),
      LINK_CHECK_MANIFEST: manifestPath,
    },
  });
}

afterEach(() => {
  for (const directory of directories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("dynamic internal links", () => {
  it("accepts a generated dynamic URL", () => {
    const { root, manifestPath } = fixture(
      "/guides/molarity-explained",
      ["/guides/molarity-explained"],
    );

    const result = check(root, manifestPath);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("0 broken, 0 orphaned");
  });

  it("rejects a dynamic slug absent from the manifest", () => {
    const { root, manifestPath } = fixture(
      "/guides/nonexistent-guide",
      ["/guides/molarity-explained"],
    );

    const result = check(root, manifestPath);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("Broken internal navigation references");
  });

  it("rejects a missing build manifest", () => {
    const { root, manifestPath } = fixture(
      "/guides/molarity-explained",
      [],
      false,
    );

    const result = check(root, manifestPath);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(
      "Dynamic route validation requires a build manifest",
    );
  });
});
