import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";

const canMeasureProcesses =
  process.platform === "linux" && existsSync("/proc");

function readProcessStatus(pid) {
  try {
    const status = readFileSync(`/proc/${pid}/status`, "utf8");
    const parent = Number(status.match(/^PPid:\s+(\d+)/m)?.[1]);
    const threads = Number(status.match(/^Threads:\s+(\d+)/m)?.[1]);

    return {
      pid,
      parent: Number.isFinite(parent) ? parent : 0,
      threads: Number.isFinite(threads) ? threads : 1,
    };
  } catch {
    return undefined;
  }
}

function measureProcessTree(rootPid) {
  if (!canMeasureProcesses) {
    return undefined;
  }

  const processes = readdirSync("/proc")
    .filter((entry) => /^\d+$/.test(entry))
    .map((entry) => readProcessStatus(Number(entry)))
    .filter(Boolean);
  const descendants = new Set([rootPid]);
  let changed = true;

  while (changed) {
    changed = false;

    for (const processInfo of processes) {
      if (
        descendants.has(processInfo.parent) &&
        !descendants.has(processInfo.pid)
      ) {
        descendants.add(processInfo.pid);
        changed = true;
      }
    }
  }

  const processTree = processes.filter((processInfo) =>
    descendants.has(processInfo.pid),
  );

  return {
    processes: processTree.length,
    threads: processTree.reduce(
      (total, processInfo) => total + processInfo.threads,
      0,
    ),
  };
}

const packageManagerExecutable = process.env.npm_execpath;
const build = packageManagerExecutable
  ? spawn(process.execPath, [packageManagerExecutable, "build"], {
      env: process.env,
      stdio: "inherit",
    })
  : spawn("corepack", ["pnpm@11.13.1", "build"], {
      env: process.env,
      stdio: "inherit",
    });
let peakProcesses = 0;
let peakThreads = 0;

const sampler = setInterval(() => {
  const measurement = measureProcessTree(build.pid);

  if (!measurement) {
    return;
  }

  peakProcesses = Math.max(peakProcesses, measurement.processes);
  peakThreads = Math.max(peakThreads, measurement.threads);
}, 25);

build.on("error", (error) => {
  clearInterval(sampler);
  console.error("Unable to start the measured production build.", error);
  process.exit(1);
});

build.on("exit", (code, signal) => {
  clearInterval(sampler);

  if (canMeasureProcesses) {
    console.log(`Peak build process count: ${peakProcesses}`);
    console.log(`Peak build process/thread task count: ${peakThreads}`);
  } else {
    console.log(
      "Build process/thread measurement requires a Linux /proc filesystem.",
    );
  }

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
