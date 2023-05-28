import { getInput, info } from '@actions/core';

export const isBranchValidForBadgesGeneration = (
  currentBranch: string,
): boolean => {
  const input = getInput('branches');
  if (input === '*') {
    return true;
  }

  let branches = input.split(',');
  if (branches.length === 1 && branches[0].length === 0) {
    info(`🔶 No branches specified, defaulting to master and main`);
    branches = ['master', 'main'];
  }

  return branches.includes(currentBranch);
};
