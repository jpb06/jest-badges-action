import { exec } from '@actions/exec';

export const hasCoverageEvolved = async (
  badgesExist: boolean,
  outputPath: string,
): Promise<boolean> => {
  if (!badgesExist) {
    return true;
  }

  const code = await exec('git diff', ['--quiet', `${outputPath}/*`], {
    ignoreReturnCode: true,
  });

  const hasChanged = code === 1;
  return hasChanged;
};
