import { generateBadges } from 'node-jest-badges';

import { info, setFailed } from '@actions/core';

import { pushBadges } from '../logic/git/pushBadges';
import { setGitConfig } from '../logic/git/setGitConfig';
import { doBadgesExist } from '../logic/jest/doBadgesExist';
import { hasCoverageEvolved } from '../logic/jest/hasCoverageEvolved';
import { isJestCoverageReportAvailable } from '../logic/jest/isJestCoverageReportAvailable';

export const actionWorkflow = async (): Promise<void> => {
  try {
    const isReportAvailable = await isJestCoverageReportAvailable();
    if (!isReportAvailable) {
      return setFailed(
        "> Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?"
      );
    }

    const badgesExist = await doBadgesExist();

    info("> Generating badges");
    await generateBadges();

    const hasEvolved = await hasCoverageEvolved(badgesExist);
    if (!hasEvolved) {
      info("> Coverage has not evolved, no action required.");
      return;
    }

    info("> Pushing badges to the repo");
    await setGitConfig();
    await pushBadges();
  } catch (error) {
    return setFailed(`Oh no! An error occured: ${error.message}`);
  }
};
