import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { context } from '@actions/github';

import { setGitConfig } from './setGitConfig';

jest.mock('@actions/exec');
jest.mock('@actions/github');
jest.mock('@actions/core');

describe('setGitConfig function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should use default values for commit user', async () => {
    jest.mocked(getInput).mockReturnValue('');

    await setGitConfig();

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenNthCalledWith(1, 'git config', [
      '--global',
      'user.name',
      context.actor,
    ]);
    expect(exec).toHaveBeenNthCalledWith(2, 'git config', [
      '--global',
      'user.email',
      `${context.actor}@users.noreply.github.com`,
    ]);
  });

  it('should use custom values for commit user', async () => {
    const email = 'yolo@cool.org';
    const name = 'yolo bro';
    jest.mocked(getInput).mockReturnValueOnce(email).mockReturnValueOnce(name);

    await setGitConfig();

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenNthCalledWith(1, 'git config', [
      '--global',
      'user.name',
      name,
    ]);
    expect(exec).toHaveBeenNthCalledWith(2, 'git config', [
      '--global',
      'user.email',
      email,
    ]);
  });
});
