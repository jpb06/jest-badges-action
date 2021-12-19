import { info } from '@actions/core';
import { exec } from '@actions/exec';

export const hasCoverageEvolved = async (
  badgesExist: boolean,
): Promise<boolean> => {
  if (!badgesExist) {
    return true;
  }

  const code = await exec('git diff', ['--quiet', './badges/*'], {
    ignoreReturnCode: true,
  });
  info(`git diff code: ${code}`);

  const hasChanged = code === 1;
  return hasChanged;
};
