import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

export const pushBadges = async (
  branchName: string,
  source = './badges',
): Promise<void> => {
  await exec('git checkout', [branchName]);
  await exec('git status');
  await exec('git add', [source]);
  await exec('git commit', ['-m', getInput('commit-message')]);

  await exec(`git push origin ${branchName}`);
};
