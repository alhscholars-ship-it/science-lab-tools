import fs from "node:fs";

if (
  !process.env.NEXT_PUBLIC_SITE_URL &&
  fs.existsSync(".env.local")
) {
  process.loadEnvFile(".env.local");
}

const fallbackSiteUrl = "https://sciencecalchub.com";

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, "");
}

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = normalizeSiteUrl(configuredSiteUrl || fallbackSiteUrl);

const requiredRoutes = [
  [".next/server/app/index.html", "Homepage"],
  [".next/server/app/calculators.html", "Calculators"],
  [".next/server/app/scientific-method.html", "Scientific method"],
  [".next/server/app/templates.html", "Templates"],
  [
    ".next/server/app/templates/printable-lab-report-template.html",
    "Printable lab report template",
  ],
  [
    ".next/server/app/templates/scientific-method-worksheet.html",
    "Scientific method worksheet",
  ],
  [
    ".next/server/app/templates/experiment-planning-template.html",
    "Experiment planning template",
  ],
  [
    ".next/server/app/templates/data-table-template.html",
    "Scientific data table template",
  ],
  [
    ".next/server/app/templates/graphing-scientific-data-worksheet.html",
    "Graphing scientific data worksheet",
  ],
  [
    ".next/server/app/templates/variables-worksheet.html",
    "Independent and dependent variables worksheet",
  ],
  [
    ".next/server/app/scientific-method/steps-of-the-scientific-method.html",
    "Scientific method steps guide",
  ],
  [
    ".next/server/app/scientific-method/scientific-question.html",
    "Scientific question guide",
  ],
  [
    ".next/server/app/scientific-method/how-to-write-a-hypothesis.html",
    "Hypothesis guide",
  ],
  [
    ".next/server/app/scientific-method/independent-dependent-controlled-variables.html",
    "Experimental variables guide",
  ],
  [
    ".next/server/app/scientific-method/control-group-and-experimental-group.html",
    "Control and experimental groups guide",
  ],
  [
    ".next/server/app/scientific-method/experimental-design.html",
    "Experimental design guide",
  ],
  [
    ".next/server/app/scientific-method/collect-and-record-data.html",
    "Scientific data collection guide",
  ],
  [
    ".next/server/app/scientific-method/analyze-experimental-results.html",
    "Experimental results analysis guide",
  ],
  [
    ".next/server/app/calculators/percent-error-calculator.html",
    "Percent error calculator",
  ],
  [
    ".next/server/app/calculators/percent-difference-calculator.html",
    "Percent difference calculator",
  ],
  [
    ".next/server/app/calculators/significant-figures-calculator.html",
    "Significant figures calculator",
  ],
  [
    ".next/server/app/calculators/coefficient-variation-calculator.html",
    "Coefficient of variation calculator",
  ],
  [
    ".next/server/app/calculators/mean-median-mode-calculator.html",
    "Mean median mode calculator",
  ],
  [
    ".next/server/app/calculators/standard-deviation-calculator.html",
    "Standard deviation calculator",
  ],
  [
    ".next/server/app/calculators/uncertainty-propagation-calculator.html",
    "Uncertainty propagation calculator",
  ],
  [
    ".next/server/app/calculators/measurement-uncertainty-calculator.html",
    "Measurement uncertainty calculator",
  ],
  [
    ".next/server/app/calculators/rate-of-change-calculator.html",
    "Rate of change calculator",
  ],
  [
    ".next/server/app/calculators/linear-regression-calculator.html",
    "Linear regression calculator",
  ],
  [
    ".next/server/app/calculators/molarity-calculator.html",
    "Molarity calculator",
  ],
  [
    ".next/server/app/calculators/mass-moles-calculator.html",
    "Mass to moles calculator",
  ],
  [
    ".next/server/app/calculators/dilution-calculator.html",
    "Dilution calculator",
  ],
  [
    ".next/server/app/calculators/force-calculator.html",
    "Force calculator",
  ],
  [
    ".next/server/app/calculators/acceleration-calculator.html",
    "Acceleration calculator",
  ],
  [
    ".next/server/app/calculators/density-calculator.html",
    "Density calculator",
  ],
  [
    ".next/server/app/calculators/specific-heat-calculator.html",
    "Specific heat calculator",
  ],
  [
    ".next/server/app/lab-reports/how-to-write-a-lab-report.html",
    "How to write a lab report guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-format.html",
    "Lab report format guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-introduction.html",
    "Lab report introduction guide",
  ],
  [
    ".next/server/app/lab-reports/materials-and-methods.html",
    "Materials and methods guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-results.html",
    "Lab report results guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-discussion.html",
    "Lab report discussion guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-conclusion.html",
    "Lab report conclusion guide",
  ],
  [
    ".next/server/app/lab-reports/significant-figures-in-lab-reports.html",
    "Significant figures guide",
  ],
  [
    ".next/server/app/lab-reports/tables-and-graphs.html",
    "Tables and graphs guide",
  ],
  [
    ".next/server/app/lab-reports/lab-report-template.html",
    "Lab report template",
  ],
];

const placeholderRoutes = [];
let failed = false;

for (const [file, label] of requiredRoutes) {
  if (!fs.existsSync(file)) {
    console.error(`MISSING: ${label} (${file})`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

const homepage = fs.readFileSync(".next/server/app/index.html", "utf8");

const homepageChecks = [
  ['<html lang="en"', "HTML language"],
  ['<meta name="description"', "Meta description"],
  ['application/ld+json', "Organization structured data"],
];

for (const [needle, label] of homepageChecks) {
  if (!homepage.includes(needle)) {
    console.error(`MISSING: ${label}`);
    failed = true;
  } else {
    console.log(`OK: ${label}`);
  }
}

const canonicalMatch = homepage.match(
  /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/,
);

if (!canonicalMatch) {
  console.error("MISSING: Homepage canonical");
  failed = true;
} else {
  const canonicalUrl = new URL(canonicalMatch[1]);

  if (
    canonicalUrl.origin !== new URL(siteUrl).origin ||
    canonicalUrl.pathname !== "/"
  ) {
    console.error(`INVALID: Homepage canonical (${canonicalMatch[1]})`);
    failed = true;
  } else {
    console.log(`OK: Homepage canonical (${canonicalMatch[1]})`);
  }
}

const calculatorsHtml = fs.readFileSync(
  ".next/server/app/calculators.html",
  "utf8",
);

if (calculatorsHtml.includes('name="robots" content="noindex')) {
  console.error("INVALID: Calculators directory is noindex");
  failed = true;
} else {
  console.log("OK: Calculators directory is indexable");
}

if (
  !calculatorsHtml.includes(
    'href="/calculators/percent-error-calculator"',
  )
) {
  console.error("MISSING: Calculator directory internal link");
  failed = true;
} else {
  console.log("OK: Calculator directory internal link");
}

if (placeholderRoutes.length > 0) {
  console.error(`INVALID: Placeholder routes configured (${placeholderRoutes.join(", ")})`);
  failed = true;
}

if (siteUrl !== "https://sciencecalchub.com") {
  console.error(`INVALID: SEO site URL (${siteUrl})`);
  failed = true;
} else {
  console.log(`OK: SEO site URL (${siteUrl})`);
}

if (failed) {
  process.exit(1);
}
