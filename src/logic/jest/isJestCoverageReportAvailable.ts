import { pathExists, readJson } from "fs-extra";
import { CoverageSummary, FileCoverageTotal } from "node-jest-badges";

const isUndefined = (element?: FileCoverageTotal) => element?.pct === undefined;

interface JestCoverage {
  total?: CoverageSummary;
}

export const isJestCoverageReportAvailable = async (): Promise<boolean> => {
  const coverageSummaryPath = "./coverage/coverage-summary.json";

  const coverageExists = await pathExists(coverageSummaryPath);
  if (!coverageExists) {
    return false;
  }

  const data: JestCoverage = await readJson(coverageSummaryPath);
  if (!data || !data.total) {
    return false;
  }

  if (
    isUndefined(data.total.branches) ||
    isUndefined(data.total.functions) ||
    isUndefined(data.total.lines) ||
    isUndefined(data.total.statements)
  ) {
    return false;
  }

  return true;
};
