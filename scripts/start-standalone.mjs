import { cpSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const standaloneDirectory = join(root, ".next", "standalone");
const serverFile = join(standaloneDirectory, "server.js");
const sourceStatic = join(root, ".next", "static");
const targetStatic = join(
  standaloneDirectory,
  ".next",
  "static",
);
const sourcePublic = join(root, "public");
const targetPublic = join(standaloneDirectory, "public");

if (!existsSync(serverFile)) {
  console.error(
    'Standalone build missing. Run "pnpm build" before "pnpm start".',
  );
  process.exit(1);
}

if (existsSync(sourceStatic)) {
  cpSync(sourceStatic, targetStatic, {
    recursive: true,
    force: true,
  });
}

if (existsSync(sourcePublic)) {
  cpSync(sourcePublic, targetPublic, {
    recursive: true,
    force: true,
  });
}

const server = spawn(process.execPath, [serverFile], {
  cwd: standaloneDirectory,
  env: process.env,
  stdio: "inherit",
});

server.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
