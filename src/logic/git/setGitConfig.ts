import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { context } from '@actions/github';

export const setGitConfig = async (): Promise<void> => {
  const userEmail = getInput('commit-user-email');
  const userName = getInput('commit-user');

  await exec('git config', [
    '--global',
    'user.name',
    userName.length === 0 ? context.actor : userName,
  ]);
  await exec('git config', [
    '--global',
    'user.email',
    userEmail.length === 0
      ? `${context.actor}@users.noreply.github.com`
      : userEmail,
  ]);
};
