import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDirectory = path.join(root, "src/app");
const layoutPath = path.join(appDirectory, "layout.tsx");
const siteConfigPath = path.join(
  root,
  "src/config/site.ts",
);
const reportDirectory = path.join(root, "reports");
const reportPath = path.join(
  reportDirectory,
  "seo-page-inventory.json",
);

fs.mkdirSync(reportDirectory, {
  recursive: true,
});

function walk(directory) {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .flatMap((entry) => {
      const absolutePath = path.join(
        directory,
        entry.name,
      );

      if (
        entry.isDirectory() &&
        !entry.name.startsWith("_")
      ) {
        return walk(absolutePath);
      }

      if (
        entry.isFile() &&
        entry.name === "page.tsx"
      ) {
        return [absolutePath];
      }

      return [];
    });
}

function routeFromFile(filePath) {
  const relativeDirectory = path.relative(
    appDirectory,
    path.dirname(filePath),
  );

  if (!relativeDirectory) {
    return "/";
  }

  return `/${relativeDirectory
    .split(path.sep)
    .join("/")}`;
}

function firstMatch(text, pattern) {
  return text.match(pattern)?.[1]?.trim() ?? "";
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function readQuotedString(source) {
  const value = source.trimStart();
  const quote = value[0];

  if (!["\"", "'", "`"].includes(quote)) {
    return "";
  }

  let result = "";

  for (let index = 1; index < value.length; index += 1) {
    const character = value[index];

    if (character === "\\") {
      const nextCharacter = value[index + 1];

      if (nextCharacter === undefined) {
        return "";
      }

      const escapedCharacters = {
        n: " ",
        r: " ",
        t: " ",
        "\\": "\\",
        "\"": "\"",
        "'": "'",
        "`": "`",
      };

      result +=
        escapedCharacters[nextCharacter] ??
        nextCharacter;

      index += 1;
      continue;
    }

    if (character === quote) {
      return result.trim();
    }

    result += character;
  }

  return "";
}

function resolveModulePath(
  importPath,
  importerPath,
) {
  if (!importPath || !importerPath) {
    return "";
  }

  const basePath = importPath.startsWith("@/")
    ? path.join(
        root,
        "src",
        importPath.slice(2),
      )
    : path.resolve(
        path.dirname(importerPath),
        importPath,
      );

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
  ];

  return (
    candidates.find((candidate) =>
      fs.existsSync(candidate),
    ) ?? ""
  );
}

function resolveImportedObjectProperty(
  text,
  filePath,
  objectName,
  propertyName,
) {
  if (
    !filePath ||
    !objectName ||
    !propertyName
  ) {
    return "";
  }

  const escapedObject = objectName.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const importPath = firstMatch(
    text,
    new RegExp(
      `import\\s*\\{[^}]*\\b${escapedObject}\\b` +
        `[^}]*\\}\\s*from\\s*` +
        `["']([^"']+)["']`,
      "s",
    ),
  );

  const modulePath = resolveModulePath(
    importPath,
    filePath,
  );

  if (!modulePath) {
    return "";
  }

  const moduleText = fs.readFileSync(
    modulePath,
    "utf8",
  );

  const objectStartPattern = new RegExp(
    `export\\s+const\\s+${escapedObject}\\b` +
      `[\\s\\S]*?=\\s*\\{`,
  );

  const objectStart = moduleText.search(
    objectStartPattern,
  );

  if (objectStart === -1) {
    return "";
  }

  const objectText = moduleText.slice(objectStart);

  const escapedProperty = propertyName.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const propertyMatch = objectText.match(
    new RegExp(
      `\\b${escapedProperty}\\s*:\\s*`,
    ),
  );

  if (
    !propertyMatch ||
    propertyMatch.index === undefined
  ) {
    return "";
  }

  return readQuotedString(
    objectText.slice(
      propertyMatch.index +
        propertyMatch[0].length,
    ),
  );
}

function resolveStringConstant(
  text,
  variableName,
  filePath = "",
) {
  if (!variableName) {
    return "";
  }

  const escapedName = variableName.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const expression = firstMatch(
    text,
    new RegExp(
      `(?:export\\s+)?const\\s+${escapedName}` +
        `(?:\\s*:\\s*[^=]+)?\\s*=\\s*` +
        `([\\s\\S]*?);`,
    ),
  );

  if (!expression) {
    return "";
  }

  const literalValue =
    readQuotedString(expression);

  if (literalValue) {
    return literalValue;
  }

  const memberMatch = expression.match(
    /^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)$/,
  );

  if (!memberMatch) {
    return "";
  }

  return resolveImportedObjectProperty(
    text,
    filePath,
    memberMatch[1],
    memberMatch[2],
  );
}

function resolveMetadataValue(
  text,
  property,
  filePath = "",
) {
  const escapedProperty = property.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const memberMatch = text.match(
    new RegExp(
      `${escapedProperty}:\\s*` +
        `([A-Za-z_$][\\w$]*)\\.` +
        `([A-Za-z_$][\\w$]*)`,
    ),
  );

  if (memberMatch) {
    const resolvedMember =
      resolveImportedObjectProperty(
        text,
        filePath,
        memberMatch[1],
        memberMatch[2],
      );

    if (resolvedMember) {
      return resolvedMember;
    }
  }

  const variableName = firstMatch(
    text,
    new RegExp(
      `${escapedProperty}:\\s*` +
        `([A-Za-z_$][\\w$]*)`,
    ),
  );

  const resolvedVariable =
    resolveStringConstant(
      text,
      variableName,
      filePath,
    );

  if (resolvedVariable) {
    return resolvedVariable;
  }

  const propertyMatch = text.match(
    new RegExp(
      `${escapedProperty}:\\s*`,
    ),
  );

  if (
    !propertyMatch ||
    propertyMatch.index === undefined
  ) {
    return "";
  }

  return readQuotedString(
    text.slice(
      propertyMatch.index +
        propertyMatch[0].length,
    ),
  );
}

function resolveCanonical(
  text,
  filePath = "",
) {
  return resolveMetadataValue(
    text,
    "canonical",
    filePath,
  );
}

function hasMetadataExport(text) {
  return (
    /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=/.test(
      text,
    ) ||
    /export\s+(?:async\s+)?function\s+generateMetadata/.test(
      text,
    )
  );
}

function hasRobotsMetadata(text) {
  return /\brobots\s*:/.test(text);
}

function hasJsonLd(text) {
  return /application\/ld\+json/.test(text);
}

function getRenderedTitle(
  text,
  filePath = "",
) {
  const rawTitle = resolveMetadataValue(
    text,
    "title",
    filePath,
  );

  if (!rawTitle) {
    return "";
  }

  return rawTitle.replace(
    /\$\{([^}]+)\}/g,
    (_, rawExpression) => {
      const expression =
        rawExpression.trim();

      if (expression === "siteConfig.name") {
        return siteConfigName;
      }

      const memberMatch = expression.match(
        /^([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)$/,
      );

      if (memberMatch) {
        return (
          resolveImportedObjectProperty(
            text,
            filePath,
            memberMatch[1],
            memberMatch[2],
          ) || `<${expression}>`
        );
      }

      return (
        resolveStringConstant(
          text,
          expression,
          filePath,
        ) || `<${expression}>`
      );
    },
  );
}

const layoutText = fs.existsSync(layoutPath)
  ? fs.readFileSync(layoutPath, "utf8")
  : "";

const siteConfigText = fs.existsSync(
  siteConfigPath,
)
  ? fs.readFileSync(siteConfigPath, "utf8")
  : "";

const siteConfigDescriptionMatch =
  siteConfigText.match(
    /description:\s*\n?\s*"([^"]+)"/,
  );

const siteConfigDescription =
  siteConfigDescriptionMatch?.[1]?.trim() ?? "";

const siteConfigNameMatch = siteConfigText.match(
  /name:\s*\n?\s*"([^"]+)"/,
);

const siteConfigName =
  siteConfigNameMatch?.[1]?.trim() ?? "";

const inherited = {
  hasMetadata: hasMetadataExport(layoutText),
  title:
    resolveMetadataValue(layoutText, "default", layoutPath) ||
    resolveMetadataValue(layoutText, "title", layoutPath),
  titleTemplate: resolveMetadataValue(
    layoutText,
    "template",
    layoutPath,
  ).replace(
    /\$\{siteConfig\.name\}/g,
    siteConfigName,
  ),
  description:
    resolveMetadataValue(
        layoutText,
        "description",
        layoutPath,
      ) ||
    (layoutText.includes(
      "description: siteConfig.description",
    )
      ? siteConfigDescription
      : ""),
  canonical: resolveCanonical(layoutText, layoutPath),
  hasRobots: hasRobotsMetadata(layoutText),
  hasJsonLd: hasJsonLd(layoutText),
};

const pages = walk(appDirectory)
  .map((filePath) => {
    const text = fs.readFileSync(
      filePath,
      "utf8",
    );

    const route = routeFromFile(filePath);
    const isHomepage = route === "/";

    const ownTitle = isHomepage
      ? ""
      : getRenderedTitle(text, filePath);

    const ownDescription = isHomepage
      ? ""
      : resolveMetadataValue(
            text,
            "description",
            filePath,
          );

    const ownCanonical = isHomepage
      ? ""
      : resolveCanonical(text, filePath);

    const title = isHomepage
      ? inherited.title
      : inherited.titleTemplate
        ? inherited.titleTemplate.replace(
            "%s",
            ownTitle,
          )
        : ownTitle;

    const description = isHomepage
      ? inherited.description
      : ownDescription;

    const canonical = isHomepage
      ? inherited.canonical
      : ownCanonical;

    const ownMetadata =
      hasMetadataExport(text);

    const hasMetadata =
      ownMetadata ||
      (isHomepage &&
        inherited.hasMetadata);

    const hasRobots =
      hasRobotsMetadata(text) ||
      inherited.hasRobots;

    const pageHasJsonLd =
      hasJsonLd(text) ||
      (isHomepage &&
        inherited.hasJsonLd);

    const h1Count = countMatches(
      text,
      /<h1(?:\s[^>]*)?>/g,
    );

    const staticInternalLinks = countMatches(
      text,
      /href=["'`]\/(?!\/|#)[^"'`]+["'`]/g,
    );

    const dynamicInternalLinks = countMatches(
      text,
      /href=\{(?:calculator|resource|category|link)\.href\}/g,
    );

    const componentInternalLinks =
      countMatches(
        text,
        /<CalculatorBreadcrumb\b/g,
      ) *
        3 +
      countMatches(
        text,
        /<RelatedCalculators\b/g,
      ) *
        4 +
      countMatches(
        text,
        /<RelatedLearning\b/g,
      ) *
        4;

    const internalLinks =
      staticInternalLinks +
      dynamicInternalLinks * 2 +
      componentInternalLinks;

    const hasFaqSchema =
      /"@type":\s*"FAQPage"/.test(
        text,
      );

    const hasWebApplication =
      /"@type":\s*"WebApplication"/.test(
        text,
      );

    const hasBreadcrumbSchema =
      /"@type":\s*"BreadcrumbList"/.test(
        text,
      );

    const sourceWords = text
      .replace(/<[^>]+>/g, " ")
      .replace(
        /[^A-Za-zÀ-ÿ0-9μθπτΔ²³°]+/g,
        " ",
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const issues = [];

    if (!hasMetadata) {
      issues.push("missing-metadata");
    }

    if (!title) {
      issues.push("missing-title");
    } else if (title.length < 20) {
      issues.push("short-title");
    } else if (title.length > 65) {
      issues.push("long-title");
    }

    if (!description) {
      issues.push("missing-description");
    } else if (description.length < 100) {
      issues.push(
        "short-description",
      );
    } else if (description.length > 170) {
      issues.push(
        "long-description",
      );
    }

    if (!canonical) {
      issues.push("missing-canonical");
    }

    if (!hasRobots) {
      issues.push(
        "missing-robots-directive",
      );
    }

    if (h1Count !== 1) {
      issues.push(
        `h1-count-${h1Count}`,
      );
    }

    if (internalLinks < 2) {
      issues.push(
        "weak-internal-linking",
      );
    }

    if (!pageHasJsonLd) {
      issues.push("missing-jsonld");
    }

    return {
      route,
      file: path.relative(
        root,
        filePath,
      ),
      title,
      titleLength: title.length,
      description,
      descriptionLength:
        description.length,
      canonical,
      h1Count,
      internalLinks,
      sourceWords,
      hasMetadata,
      hasRobots,
      hasJsonLd: pageHasJsonLd,
      hasFaqSchema,
      hasWebApplication,
      hasBreadcrumbSchema,
      issues,
    };
  })
  .sort((a, b) =>
    a.route.localeCompare(b.route),
  );

const titleGroups = new Map();
const descriptionGroups = new Map();

for (const page of pages) {
  if (page.title) {
    titleGroups.set(page.title, [
      ...(titleGroups.get(page.title) ??
        []),
      page.route,
    ]);
  }

  if (page.description) {
    descriptionGroups.set(
      page.description,
      [
        ...(descriptionGroups.get(
          page.description,
        ) ?? []),
        page.route,
      ],
    );
  }
}

const duplicateTitles = [
  ...titleGroups,
]
  .filter(
    ([, routes]) => routes.length > 1,
  )
  .map(([value, routes]) => ({
    value,
    routes,
  }));

const duplicateDescriptions = [
  ...descriptionGroups,
]
  .filter(
    ([, routes]) => routes.length > 1,
  )
  .map(([value, routes]) => ({
    value,
    routes,
  }));

const issueCounts = {};

for (const page of pages) {
  for (const issue of page.issues) {
    issueCounts[issue] =
      (issueCounts[issue] ?? 0) + 1;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  inherited,
  totals: {
    pages: pages.length,
    pagesWithIssues: pages.filter(
      (page) =>
        page.issues.length > 0,
    ).length,
    pagesWithoutIssues: pages.filter(
      (page) =>
        page.issues.length === 0,
    ).length,
    duplicateTitles:
      duplicateTitles.length,
    duplicateDescriptions:
      duplicateDescriptions.length,
  },
  issueCounts,
  duplicateTitles,
  duplicateDescriptions,
  pages,
};

fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    report,
    null,
    2,
  )}\n`,
);

console.log(
  `Pages audited: ${report.totals.pages}`,
);
console.log(
  `Pages with issues: ${report.totals.pagesWithIssues}`,
);
console.log(
  `Pages without issues: ${report.totals.pagesWithoutIssues}`,
);
console.log(
  `Duplicate titles: ${report.totals.duplicateTitles}`,
);
console.log(
  `Duplicate descriptions: ${report.totals.duplicateDescriptions}`,
);

console.log("\nIssue counts:");

for (const [issue, count] of Object.entries(
  issueCounts,
).sort((a, b) => b[1] - a[1])) {
  console.log(`${count}\t${issue}`);
}

console.log(
  `\nReport: ${path.relative(
    root,
    reportPath,
  )}`,
);
