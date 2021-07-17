import { exec } from '@actions/exec';

export const pushBadges = async (): Promise<void> => {
  await exec('git add', ['./badges']);
  await exec('git commit', ['-m', 'Updating coverage badges']);
  await exec('git push');
};
