import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const temporaryDirectories: string[] = [];
const scriptPath = path.resolve("scripts/check-internal-links.mjs");

function createFixture(files: Record<string, string>) {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "internal-link-check-"),
  );
  temporaryDirectories.push(directory);

  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(directory, file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }

  return directory;
}

function runCheck(directory: string) {
  return execFileSync(process.execPath, [scriptPath], {
    cwd: path.resolve("."),
    encoding: "utf8",
    env: {
      ...process.env,
      LINK_CHECK_APP_DIR: path.join(directory, "src/app"),
      LINK_CHECK_SOURCE_DIR: path.join(directory, "src"),
    },
    stdio: "pipe",
  });
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("internal link check", () => {
  it("accepts routes with valid incoming links", () => {
    const fixture = createFixture({
      "src/app/page.tsx": 'export default () => <a href="/about">About</a>',
      "src/app/about/page.tsx": "export default () => <main>About</main>",
    });

    expect(runCheck(fixture)).toContain("0 broken, 0 orphaned");
  });

  it("rejects broken internal links", () => {
    const fixture = createFixture({
      "src/app/page.tsx": 'export default () => <a href="/missing">Missing</a>',
    });

    expect(() => runCheck(fixture)).toThrow(/Broken internal navigation references/);
  });

  it("rejects routes without incoming navigation links", () => {
    const fixture = createFixture({
      "src/app/page.tsx": "export default () => <main>Home</main>",
      "src/app/orphan/page.tsx": "export default () => <main>Orphan</main>",
    });

    expect(() => runCheck(fixture)).toThrow(/Orphaned routes/);
  });
});
