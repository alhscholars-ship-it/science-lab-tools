import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const fixedRoutes = JSON.parse(
  fs.readFileSync(
    new URL("./performance-budget-routes.json", import.meta.url),
    "utf8",
  ),
);

const calculatorManifestDirectory =
  ".next/server/app/calculators";

if (!fs.existsSync(calculatorManifestDirectory)) {
  throw new Error(
    `Calculator manifest directory is missing: ${calculatorManifestDirectory}`,
  );
}

const calculatorRouteEntries = fs
  .readdirSync(calculatorManifestDirectory, {
    withFileTypes: true,
  })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      entry.name.endsWith("-calculator"),
  )
  .map((entry) => [
    entry.name
      .replace(/-calculator$/, "")
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(" "),
    {
      manifest: path.join(
        calculatorManifestDirectory,
        entry.name,
        "page_client-reference-manifest.js",
      ),
      budget: "calculator",
    },
  ]);

if (calculatorRouteEntries.length === 0) {
  throw new Error(
    "No calculator routes were discovered for performance budgeting",
  );
}

const fixedLabels = new Set(Object.keys(fixedRoutes));
const fixedManifests = new Set(
  Object.values(fixedRoutes).map((route) => route.manifest),
);

for (const [label, route] of calculatorRouteEntries) {
  if (fixedLabels.has(label)) {
    throw new Error(
      `Calculator performance label conflicts with a configured route: ${label}`,
    );
  }

  if (fixedManifests.has(route.manifest)) {
    throw new Error(
      `Calculator manifest conflicts with a configured route: ${route.manifest}`,
    );
  }
}

const calculatorRoutes = Object.fromEntries(
  calculatorRouteEntries,
);

if (
  Object.keys(calculatorRoutes).length !==
  calculatorRouteEntries.length
) {
  throw new Error(
    "Calculator performance labels are not unique",
  );
}

const routes = {
  ...fixedRoutes,
  ...calculatorRoutes,
};

const budgetLimits = {
  shared: 25 * 1024,
  calculator: 8 * 1024,
  directory: 2 * 1024,
  static: 512,
};

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

for (const [label, route] of Object.entries(routes)) {
  if (!Object.hasOwn(budgetLimits, route.budget)) {
    throw new Error(
      `Unknown performance budget class for ${label}: ${route.budget}`,
    );
  }

  if (!fs.existsSync(route.manifest)) {
    throw new Error(`Manifest missing: ${route.manifest}`);
  }

  routeChunks.set(label, {
    chunks: getChunks(parseManifest(route.manifest)),
    budget: route.budget,
  });
}

const homepage = routeChunks.get("Homepage");

if (!homepage) {
  throw new Error("Homepage performance route is missing");
}

const homepageChunks = new Set(homepage.chunks);
const homepageGzip = [...homepageChunks].reduce(
  (total, chunk) => total + gzipSize(chunk),
  0,
);

let failed = false;

console.log("===== PERFORMANCE BUDGET =====");
console.log(
  `Shared homepage JavaScript: ${(homepageGzip / 1024).toFixed(1)} KB gzip`,
);

if (homepageGzip > budgetLimits.shared) {
  console.error(
    `FAIL: shared JavaScript exceeds ${(budgetLimits.shared / 1024).toFixed(0)} KB gzip`,
  );
  failed = true;
} else {
  console.log("PASS: shared JavaScript budget");
}

for (const [label, route] of routeChunks) {
  const uniqueChunks = route.chunks.filter(
    (chunk) => !homepageChunks.has(chunk),
  );

  const uniqueGzip = uniqueChunks.reduce(
    (total, chunk) => total + gzipSize(chunk),
    0,
  );
  const budget = budgetLimits[route.budget];

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
