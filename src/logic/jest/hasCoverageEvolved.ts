import { pathExists } from 'fs-extra';

import { exec } from '@actions/exec';

export const hasCoverageEvolved = async (): Promise<boolean> => {
  const folderExists = await pathExists("./coverage");
  if (!folderExists) {
    return true;
  }

  const code = await exec("git diff", ["--quiet", "badges"], {
    ignoreReturnCode: true,
  });

  const hasChanged = code === 1;
  return hasChanged;
};
