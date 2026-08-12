import { spawn } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const temporaryDirectories: string[] = [];
const wrapperPath = path.resolve("scripts/start-standalone.mjs");

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

async function waitForFile(filePath: string) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      return await readFile(filePath, "utf8");
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }

  throw new Error(`Timed out waiting for ${filePath}`);
}

describe("standalone production wrapper", () => {
  it("starts one server and forwards SIGTERM without leaving it orphaned", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "standalone-start-"));
    temporaryDirectories.push(root);

    const standaloneDirectory = path.join(root, ".next", "standalone");
    const markerPath = path.join(root, "server-events.log");
    await mkdir(standaloneDirectory, { recursive: true });

    await writeFile(
      path.join(standaloneDirectory, "server.js"),
      `import { appendFileSync } from "node:fs";
appendFileSync(process.env.SERVER_MARKER, \`started:\${process.pid}\\n\`);
process.once("SIGTERM", () => {
  appendFileSync(process.env.SERVER_MARKER, \`stopped:\${process.pid}\\n\`);
  process.exit(0);
});
setInterval(() => {}, 1000);
`,
    );

    const wrapper = spawn(process.execPath, [wrapperPath], {
      cwd: root,
      env: { ...process.env, SERVER_MARKER: markerPath },
      stdio: "ignore",
    });

    const started = await waitForFile(markerPath);
    expect(started.match(/^started:/gm)).toHaveLength(1);

    wrapper.kill("SIGTERM");

    const exitCode = await new Promise<number | null>((resolve, reject) => {
      wrapper.once("error", reject);
      wrapper.once("exit", resolve);
    });

    expect(exitCode).toBe(0);

    const events = await waitForFile(markerPath);
    expect(events.match(/^started:/gm)).toHaveLength(1);
    expect(events.match(/^stopped:/gm)).toHaveLength(1);
    expect(events.split("\n").filter(Boolean).map((line) => line.split(":")[1]))
      .toEqual([events.split("\n")[0].split(":")[1], events.split("\n")[0].split(":")[1]]);
  });
});
