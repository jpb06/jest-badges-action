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

  const hasChanged = code === 1;
  return hasChanged;
};
