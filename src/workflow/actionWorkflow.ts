import { getInput, info, setFailed } from '@actions/core';
import { generateBadges } from 'node-jest-badges';

import { pushBadges } from '../logic/git/pushBadges';
import { setGitConfig } from '../logic/git/setGitConfig';
import { isBranchValidForBadgesGeneration } from '../logic/inputs/isBranchValidForBadgesGeneration';
import { doBadgesExist } from '../logic/jest/doBadgesExist';
import { hasCoverageEvolved } from '../logic/jest/hasCoverageEvolved';
import { isJestCoverageReportAvailable } from '../logic/jest/isJestCoverageReportAvailable';

export const actionWorkflow = async (): Promise<void> => {
  try {
    const shouldCommit = getInput('no-commit') !== 'true';
    if (shouldCommit) {
      const isBranchValid = isBranchValidForBadgesGeneration();
      if (!isBranchValid) {
        return info(
          '🔶 Current branch does not belong to the branches allowed for badges generation, task dropped.',
        );
      }
    }

    const isReportAvailable = await isJestCoverageReportAvailable();
    if (!isReportAvailable) {
      return setFailed(
        '🔶 Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?',
      );
    }

    const summaryPathInput = getInput('coverage-summary-path');
    const summaryPath = summaryPathInput === '' ? undefined : summaryPathInput;

    const outputPath = getInput('output-folder');
    // this must be checked before generating badges (duh!)
    const badgesExist = await doBadgesExist(outputPath);

    info(
      `🔶 Generating badges from ${
        summaryPath ? summaryPath : 'default coverage summary path'
      }`,
    );
    await generateBadges(summaryPath, outputPath);

    if (!shouldCommit) {
      return info("🔶 `no-commit` set to true: badges won't be committed");
    }

    const hasEvolved = await hasCoverageEvolved(badgesExist, outputPath);
    if (!hasEvolved) {
      return info('🔶 Coverage has not evolved, no action required.');
    }

    info('🔶 Pushing badges to the repo');
    await setGitConfig();
    await pushBadges(outputPath);
  } catch (error) {
    if (error instanceof Error) {
      return setFailed(`🔶 Oh no! An error occured: ${error.message}`);
    }

    return setFailed(`🔶 Oh no! An unknown error occured`);
  }
};
