import { getInput } from '@actions/core';

export const getTargetBranch = (currentBranch: string) => {
  const targetBranch = getInput('target-branch');

  const hasTargetBranch = targetBranch !== '';
  if (hasTargetBranch) {
    return targetBranch;
  }

  return currentBranch;
};
