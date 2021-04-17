import { generateBadges } from "node-jest-badges";

import { info, setFailed } from "@actions/core";

import { pushBadges } from "../logic/git/pushBadges";
import { setGitConfig } from "../logic/git/setGitConfig";
import { isJestCoverageReportAvailable } from "../logic/jest/isJestCoverageReportAvailable";

export const actionWorkflow = async (): Promise<void> => {
  try {
    const isReportAvailable = await isJestCoverageReportAvailable();
    if (!isReportAvailable) {
      return setFailed(
        "> Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?"
      );
    }

    info("> Generating badges");
    await generateBadges();

    info("> Pushing badges to the repo");
    await setGitConfig();
    await pushBadges();
  } catch (error) {
    return setFailed(`Oh no! An error occured: ${error.message}`);
  }
};
