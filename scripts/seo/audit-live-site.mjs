const baseUrl =
  "https://science-lab-tools-murex.vercel.app";

const sitemapResponse = await fetch(
  `${baseUrl}/sitemap.xml`,
);

if (!sitemapResponse.ok) {
  throw new Error(
    `Sitemap HTTP ${sitemapResponse.status}`,
  );
}

const sitemap = await sitemapResponse.text();

const urls = [
  ...sitemap.matchAll(
    /<loc>(.*?)<\/loc>/g,
  ),
].map((match) => match[1]);

const results = [];

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

for (const [index, url] of urls.entries()) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
    });

    const html = await response.text();

    const title = extract(
      html,
      /<title>(.*?)<\/title>/is,
    );

    const description = extract(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
    ) || extract(
      html,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
    );

    const canonical = extract(
      html,
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    ) || extract(
      html,
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
    );

    const robots = extract(
      html,
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i,
    ) || extract(
      html,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i,
    );

    const h1Count =
      (
        html.match(
          /<h1\b[^>]*>/gi,
        ) ?? []
      ).length;

    const jsonLdCount =
      (
        html.match(
          /type=["']application\/ld\+json["']/gi,
        ) ?? []
      ).length;

    const issues = [];

    if (response.status !== 200) {
      issues.push(
        `http-${response.status}`,
      );
    }

    if (!title) {
      issues.push("missing-title");
    }

    if (!description) {
      issues.push(
        "missing-description",
      );
    }

    if (!canonical) {
      issues.push(
        "missing-canonical",
      );
    }

    if (!robots) {
      issues.push(
        "missing-robots",
      );
    }

    if (h1Count !== 1) {
      issues.push(
        `h1-count-${h1Count}`,
      );
    }

    if (jsonLdCount === 0) {
      issues.push(
        "missing-jsonld",
      );
    }

    results.push({
      url,
      status: response.status,
      titleLength: title.length,
      descriptionLength:
        description.length,
      canonical,
      robots,
      h1Count,
      jsonLdCount,
      issues,
    });

    console.log(
      `[${index + 1}/${urls.length}] ` +
      `${issues.length === 0 ? "PASS" : "FAIL"} ` +
      `${new URL(url).pathname}`,
    );
  } catch (error) {
    results.push({
      url,
      status: 0,
      issues: [
        `request-error: ${error.message}`,
      ],
    });

    console.log(
      `[${index + 1}/${urls.length}] ERROR ` +
      `${new URL(url).pathname}`,
    );
  }
}

const problemPages = results.filter(
  (result) =>
    result.issues.length > 0,
);

console.log(
  "\n===== LIVE SEO CRAWL SUMMARY =====",
);

console.log(
  `URLs crawled: ${results.length}`,
);

console.log(
  `Clean URLs: ${
    results.length -
    problemPages.length
  }`,
);

console.log(
  `URLs with issues: ${problemPages.length}`,
);

if (problemPages.length === 0) {
  console.log(
    "PASS: all live sitemap URLs passed",
  );
} else {
  console.log(
    "\n===== PROBLEM URLS =====",
  );

  for (const page of problemPages) {
    console.log(
      `${page.url}\n  ${page.issues.join(", ")}`,
    );
  }
}

await import("node:fs").then(
  ({ writeFileSync }) => {
    writeFileSync(
      "/tmp/live-seo-crawl.json",
      JSON.stringify(
        {
          generatedAt:
            new Date().toISOString(),
          baseUrl,
          totals: {
            urls: results.length,
            clean:
              results.length -
              problemPages.length,
            withIssues:
              problemPages.length,
          },
          results,
        },
        null,
        2,
      ),
    );
  },
);

process.exitCode =
  problemPages.length === 0
    ? 0
    : 1;
