import { describe, expect, it } from "vitest";

import { siteConfig } from "../site";

describe("siteConfig.feedback", () => {
  it("points every feedback link at this repository", () => {
    const { repositoryUrl, newIssueUrl, correctionIssueUrl, bugReportIssueUrl } =
      siteConfig.feedback;

    expect(newIssueUrl.startsWith(repositoryUrl)).toBe(true);
    expect(correctionIssueUrl.startsWith(repositoryUrl)).toBe(true);
    expect(bugReportIssueUrl.startsWith(repositoryUrl)).toBe(true);
  });

  it("links the correction and bug report URLs to their specific templates", () => {
    expect(siteConfig.feedback.correctionIssueUrl).toContain(
      "template=scientific-correction.yml",
    );
    expect(siteConfig.feedback.bugReportIssueUrl).toContain(
      "template=bug_report.yml",
    );
  });
});
