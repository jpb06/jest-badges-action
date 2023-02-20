import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

export const pushBadges = async (source = './badges'): Promise<void> => {
  await exec('git add', [source]);
  await exec('git commit', ['-m', getInput('commit-message')]);
  await exec('git push');
};
