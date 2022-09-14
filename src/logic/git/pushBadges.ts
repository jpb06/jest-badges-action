import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

export const pushBadges = async (): Promise<void> => {
  await exec('git add', ['./badges']);
  await exec('git commit', ['-m', getInput('commit-message')]);
  await exec('git push');
};
