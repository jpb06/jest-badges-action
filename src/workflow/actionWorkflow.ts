import { info, setFailed } from '@actions/core';
import { generateBadges } from 'node-jest-badges';

import { pushBadges } from '../logic/git/pushBadges';
import { setGitConfig } from '../logic/git/setGitConfig';
import { isBranchValidForBadgesGeneration } from '../logic/inputs/isBranchValidForBadgesGeneration';
import { doBadgesExist } from '../logic/jest/doBadgesExist';
import { hasCoverageEvolved } from '../logic/jest/hasCoverageEvolved';
import { isJestCoverageReportAvailable } from '../logic/jest/isJestCoverageReportAvailable';

export const actionWorkflow = async (): Promise<void> => {
  try {
    const isBranchValid = isBranchValidForBadgesGeneration();
    if (!isBranchValid) {
      return info(
        '🔶 Current branch does not belong to the branches allowed for badges generation, task dropped.',
      );
    }

    const isReportAvailable = await isJestCoverageReportAvailable();
    if (!isReportAvailable) {
      return setFailed(
        '🔶 Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?',
      );
    }

    const badgesExist = await doBadgesExist();

    info('🔶 Generating badges');
    await generateBadges();

    const hasEvolved = await hasCoverageEvolved(badgesExist);
    if (!hasEvolved) {
      return info('🔶 Coverage has not evolved, no action required.');
    }

    info('🔶 Pushing badges to the repo');
    await setGitConfig();
    await pushBadges();
  } catch (error) {
    if (error instanceof Error) {
      return setFailed(`🔶 Oh no! An error occured: ${error.message}`);
    }

    return setFailed(`🔶 Oh no! An unknown error occured`);
  }
};
