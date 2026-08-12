const baseUrl = (
  process.env.LIVE_SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sciencecalchub.com"
).replace(/\/$/, "");

const expectedOrigin = new URL(baseUrl).origin;

if (expectedOrigin !== "https://sciencecalchub.com") {
  throw new Error(`LIVE_SITE_URL must use https://sciencecalchub.com, received ${baseUrl}`);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`, {
  redirect: "follow",
});

if (!sitemapResponse.ok) {
  throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();

if (!sitemap.includes("http://www.sitemaps.org/schemas/sitemap/0.9") && !sitemap.includes("http://www.sitemaps.org/schemas/sitemap/0.9")) {
  console.warn("WARNING: sitemap namespace was not found in the response");
}

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);

if (urls.length === 0) {
  throw new Error("Sitemap contains no URLs");
}

const invalidOrigins = urls.filter((url) => {
  try {
    return new URL(url).origin !== expectedOrigin;
  } catch {
    return true;
  }
});

if (invalidOrigins.length > 0) {
  throw new Error(
    `Sitemap contains ${invalidOrigins.length} URL(s) outside ${expectedOrigin}: ${invalidOrigins.slice(0, 5).join(", ")}`,
  );
}

if (urls.some((url) => /localhost|alh\.sciencecalchub\.org/i.test(url))) {
  throw new Error("Sitemap contains a non-production hostname");
}

const results = [];

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

for (const [index, url] of urls.entries()) {
  try {
    const parsedUrl = new URL(url);
    const issues = [];

    const response = await fetch(url, {
      redirect: "follow",
    });

    const html = await response.text();

    const title = extract(html, /<title>(.*?)<\/title>/is);

    const description =
      extract(
        html,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
      ) ||
      extract(
        html,
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
      );

    const canonical =
      extract(
        html,
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
      ) ||
      extract(
        html,
        /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
      );

    const robots =
      extract(
        html,
        /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i,
      ) ||
      extract(
        html,
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["']/i,
      );

    const h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
    const jsonLdCount = (
      html.match(/type=["']application\/ld\+json["']/gi) ?? []
    ).length;

    if (response.status !== 200) {
      issues.push(`http-${response.status}`);
    }

    if (response.url && new URL(response.url).origin !== expectedOrigin) {
      issues.push(`redirected-off-origin-${new URL(response.url).origin}`);
    }

    if (!title) {
      issues.push("missing-title");
    }

    if (!description) {
      issues.push("missing-description");
    }

    if (!canonical) {
      issues.push("missing-canonical");
    } else if (new URL(canonical, baseUrl).origin !== expectedOrigin) {
      issues.push(`wrong-canonical-origin-${new URL(canonical, baseUrl).origin}`);
    }

    if (!robots) {
      issues.push("missing-robots");
    }

    if (h1Count !== 1) {
      issues.push(`h1-count-${h1Count}`);
    }

    if (jsonLdCount === 0) {
      issues.push("missing-jsonld");
    }

    results.push({
      url,
      status: response.status,
      titleLength: title.length,
      descriptionLength: description.length,
      canonical,
      robots,
      h1Count,
      jsonLdCount,
      issues,
    });

    console.log(
      `[${index + 1}/${urls.length}] ${issues.length === 0 ? "PASS" : "FAIL"} ${parsedUrl.pathname}`,
    );
  } catch (error) {
    results.push({
      url,
      status: 0,
      issues: [`request-error: ${error.message}`],
    });

    console.log(`[${index + 1}/${urls.length}] ERROR ${new URL(url).pathname}`);
  }
}

const problemPages = results.filter((result) => result.issues.length > 0);

console.log("\n===== LIVE SEO CRAWL SUMMARY =====");
console.log(`Base URL: ${baseUrl}`);
console.log(`URLs crawled: ${results.length}`);
console.log(`Clean URLs: ${results.length - problemPages.length}`);
console.log(`URLs with issues: ${problemPages.length}`);

if (problemPages.length === 0) {
  console.log("PASS: all live sitemap URLs passed");
} else {
  console.log("\n===== PROBLEM URLS =====");

  for (const page of problemPages) {
    console.log(`${page.url}\n  ${page.issues.join(", ")}`);
  }
}

await import("node:fs").then(({ writeFileSync }) => {
  writeFileSync(
    "/tmp/live-seo-crawl.json",
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl,
        totals: {
          urls: results.length,
          clean: results.length - problemPages.length,
          withIssues: problemPages.length,
        },
        results,
      },
      null,
      2,
    ),
  );
});

process.exitCode = problemPages.length === 0 ? 0 : 1;
