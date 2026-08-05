import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const packagePath = join(root, "package.json");
const nextConfigPath = join(root, "next.config.ts");
const appPath = join(root, "src", "app");

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const nextConfig = readFileSync(nextConfigPath, "utf8");
const expectedPackageManager = "pnpm@11.12.0";
const expectedWorkerLimit = 4;
const failures = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const appFiles = walk(appPath);
const pageFiles = appFiles.filter((path) => /[/\\]page\.(?:js|jsx|ts|tsx)$/.test(path));
const staticParamFiles = appFiles.filter((path) =>
  readFileSync(path, "utf8").includes("generateStaticParams"),
);
const dynamicRouteDirectories = [
  ...new Set(
    appFiles
      .map((path) => relative(appPath, path).split("/"))
      .flatMap((segments) => segments.slice(0, -1))
      .filter((segment) => segment.includes("[")),
  ),
];

const workerMatch = nextConfig.match(/\bcpus:\s*(\d+)\b/);
const workerLimit = workerMatch ? Number(workerMatch[1]) : undefined;
const devPackageManager = packageJson.devEngines?.packageManager;
const buildScript = packageJson.scripts?.build ?? "";
const startScript = packageJson.scripts?.start ?? "";
const heavyCommands = /\b(lint|test|typecheck|check|audit|playwright)\b/;

if (workerLimit !== expectedWorkerLimit) {
  failures.push(
    `Expected next.config.ts experimental.cpus to be ${expectedWorkerLimit}.`,
  );
}

if (packageJson.packageManager !== expectedPackageManager) {
  failures.push(
    `packageManager must be ${expectedPackageManager}.`,
  );
}

if (
  devPackageManager?.name !== "pnpm" ||
  devPackageManager?.version !== "11.12.0"
) {
  failures.push(
    "devEngines.packageManager must align with pnpm@11.12.0.",
  );
}

if (buildScript !== "next build") {
  failures.push('The production build script must be exactly "next build".');
}

if (startScript !== "node scripts/start-standalone.mjs") {
  failures.push(
    "The production start script must start the standalone wrapper exactly once.",
  );
}

if (heavyCommands.test(buildScript) || heavyCommands.test(startScript)) {
  failures.push(
    "Production build/start scripts must not chain validation or audit commands.",
  );
}

console.log(`Configured Next.js build worker limit: ${workerLimit ?? "missing"}`);
console.log(`Node version: ${process.version}`);
console.log(`packageManager: ${packageJson.packageManager ?? "missing"}`);
console.log(
  `devEngines.packageManager: ${
    devPackageManager
      ? `${devPackageManager.name}@${devPackageManager.version}`
      : "missing"
  }`,
);
console.log(`Build script: ${buildScript || "missing"}`);
console.log(`Start script: ${startScript || "missing"}`);
console.log(`App Router page files: ${pageFiles.length}`);
console.log(
  `generateStaticParams implementations: ${staticParamFiles.length}`,
);

for (const path of staticParamFiles) {
  console.log(`- ${relative(root, path)}`);
}

console.log(`Dynamic route segments: ${dynamicRouteDirectories.length}`);

for (const segment of dynamicRouteDirectories) {
  console.log(`- ${segment}`);
}

console.log(
  "Deployment-time heavy script chaining: " +
    (heavyCommands.test(buildScript) || heavyCommands.test(startScript)
      ? "detected"
      : "none"),
);

if (failures.length > 0) {
  console.error("\nHostinger build safety verification failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Hostinger build safety verification passed.");
