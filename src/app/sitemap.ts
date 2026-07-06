import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/percent-error-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/percent-difference-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/calculators/significant-figures-calculator",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/molarity-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/mass-moles-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/dilution-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/density-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/calculators/specific-heat-calculator"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports/how-to-write-a-lab-report"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-format"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-introduction"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/materials-and-methods"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-results"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-discussion"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-conclusion"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/lab-reports/significant-figures-in-lab-reports",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/tables-and-graphs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/lab-reports/lab-report-template"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/scientific-method"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(
        "/scientific-method/steps-of-the-scientific-method",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/scientific-question",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/how-to-write-a-hypothesis",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/independent-dependent-controlled-variables",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/control-group-and-experimental-group",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/experimental-design",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/collect-and-record-data",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/scientific-method/analyze-experimental-results",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/templates"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/printable-lab-report-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/scientific-method-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/experiment-planning-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/data-table-template",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/graphing-scientific-data-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(
        "/templates/variables-worksheet",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
