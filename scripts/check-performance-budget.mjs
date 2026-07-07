import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const routes = {
  Homepage:
    ".next/server/app/page_client-reference-manifest.js",
  "Calculators hub":
    ".next/server/app/calculators/page_client-reference-manifest.js",
  "Percent error":
    ".next/server/app/calculators/percent-error-calculator/page_client-reference-manifest.js",
  "Percent difference":
    ".next/server/app/calculators/percent-difference-calculator/page_client-reference-manifest.js",
  "Uncertainty propagation":
    ".next/server/app/calculators/uncertainty-propagation-calculator/page_client-reference-manifest.js",
  "Measurement uncertainty":
    ".next/server/app/calculators/measurement-uncertainty-calculator/page_client-reference-manifest.js",
  "Rate of change":
    ".next/server/app/calculators/rate-of-change-calculator/page_client-reference-manifest.js",
  "Linear regression":
    ".next/server/app/calculators/linear-regression-calculator/page_client-reference-manifest.js",
  "Coefficient variation":
    ".next/server/app/calculators/coefficient-variation-calculator/page_client-reference-manifest.js",
  "Mean median mode":
    ".next/server/app/calculators/mean-median-mode-calculator/page_client-reference-manifest.js",
  "Standard deviation":
    ".next/server/app/calculators/standard-deviation-calculator/page_client-reference-manifest.js",
  "Significant figures":
    ".next/server/app/calculators/significant-figures-calculator/page_client-reference-manifest.js",
  Molarity:
    ".next/server/app/calculators/molarity-calculator/page_client-reference-manifest.js",
  "Mass to moles":
    ".next/server/app/calculators/mass-moles-calculator/page_client-reference-manifest.js",
  Dilution:
    ".next/server/app/calculators/dilution-calculator/page_client-reference-manifest.js",
  Force:
    ".next/server/app/calculators/force-calculator/page_client-reference-manifest.js",
  Acceleration:
    ".next/server/app/calculators/acceleration-calculator/page_client-reference-manifest.js",
  Density:
    ".next/server/app/calculators/density-calculator/page_client-reference-manifest.js",
  "Specific heat":
    ".next/server/app/calculators/specific-heat-calculator/page_client-reference-manifest.js",
  "Templates hub":
    ".next/server/app/templates/page_client-reference-manifest.js",
  "Lab Reports hub":
    ".next/server/app/lab-reports/page_client-reference-manifest.js",
  "Scientific Method hub":
    ".next/server/app/scientific-method/page_client-reference-manifest.js",
};

const sharedGzipBudget = 25 * 1024;
const calculatorUniqueGzipBudget = 8 * 1024;
const staticUniqueGzipBudget = 512;

function parseManifest(manifestPath) {
  const source = fs.readFileSync(manifestPath, "utf8");
  const match = source.match(/=\s*(\{.*\});?\s*$/s);

  if (!match) {
    throw new Error(`Could not parse manifest: ${manifestPath}`);
  }

  return JSON.parse(match[1]);
}

function normalizeChunk(chunk) {
  return chunk
    .replace(/^\/_next\//, "")
    .replace(/^\.next\//, "");
}

function getChunks(manifest) {
  const chunks = new Set();

  for (const files of Object.values(
    manifest.entryJSFiles ?? {},
  )) {
    for (const chunk of files) {
      if (chunk.endsWith(".js")) {
        chunks.add(normalizeChunk(chunk));
      }
    }
  }

  for (const clientModule of Object.values(
    manifest.clientModules ?? {},
  )) {
    for (const chunk of clientModule.chunks ?? []) {
      if (chunk.endsWith(".js")) {
        chunks.add(normalizeChunk(chunk));
      }
    }
  }

  return [...chunks].sort();
}

function chunkPath(chunk) {
  return path.join(".next", chunk);
}

function gzipSize(chunk) {
  const filePath = chunkPath(chunk);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Chunk not found: ${filePath}`);
  }

  return zlib.gzipSync(fs.readFileSync(filePath), {
    level: 9,
  }).length;
}

const routeChunks = new Map();

for (const [label, manifestPath] of Object.entries(routes)) {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest missing: ${manifestPath}`);
  }

  routeChunks.set(
    label,
    getChunks(parseManifest(manifestPath)),
  );
}

const homepageChunks = new Set(
  routeChunks.get("Homepage"),
);

const homepageGzip = [...homepageChunks].reduce(
  (total, chunk) => total + gzipSize(chunk),
  0,
);

let failed = false;

console.log("===== PERFORMANCE BUDGET =====");
console.log(
  `Shared homepage JavaScript: ${(homepageGzip / 1024).toFixed(1)} KB gzip`,
);

if (homepageGzip > sharedGzipBudget) {
  console.error(
    `FAIL: shared JavaScript exceeds ${(sharedGzipBudget / 1024).toFixed(0)} KB gzip`,
  );
  failed = true;
} else {
  console.log("PASS: shared JavaScript budget");
}

for (const [label, chunks] of routeChunks) {
  const uniqueChunks = chunks.filter(
    (chunk) => !homepageChunks.has(chunk),
  );

  const uniqueGzip = uniqueChunks.reduce(
    (total, chunk) => total + gzipSize(chunk),
    0,
  );

  const isCalculator = [
    "Percent error",
    "Percent difference",
    "Molarity",
    "Significant figures",
    "Standard deviation",
    "Mean median mode",
    "Coefficient variation",
    "Linear regression",
    "Rate of change",
    "Measurement uncertainty",
    "Uncertainty propagation",
    "Dilution",
    "Mass to moles",
    "Force",
    "Acceleration",
    "Density",
    "Specific heat",
  ].includes(label);

  const budget = isCalculator
    ? calculatorUniqueGzipBudget
    : staticUniqueGzipBudget;

  console.log(
    `${label}: ${(uniqueGzip / 1024).toFixed(1)} KB unique gzip`,
  );

  if (uniqueGzip > budget) {
    console.error(
      `FAIL: ${label} exceeds ${(budget / 1024).toFixed(1)} KB unique gzip`,
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("Performance budget checks passed.");
