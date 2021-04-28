import { error, getInput, info } from '@actions/core';

import { getCurrentBranch } from '../github/getCurrentBranch';

export const isBranchValidForBadgesGeneration = (): boolean => {
  const currentBranch = getCurrentBranch();
  if (!currentBranch) {
    error(`> Unable to get current branch from github event.`);
    return false;
  }

  const branches = getInput('branches').split(',');
  if (branches.length === 1 && branches[0].length === 0) {
    info(`> No branches specified, defaulting to master`);
    branches.push('master');
  }

  return branches.includes(currentBranch);
};
