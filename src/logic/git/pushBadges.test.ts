import { getInput } from '@actions/core';
import { exec } from '@actions/exec';

import { pushBadges } from './pushBadges';

jest.mock('@actions/exec');
jest.mock('@actions/core');

describe('pushBadges function', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should push changes', async () => {
    const branchName = 'master';

    jest.mocked(getInput).mockReturnValueOnce('Updating coverage badges');

    await pushBadges(branchName);

    expect(exec).toHaveBeenCalledTimes(5);
    expect(exec).toHaveBeenNthCalledWith(1, 'git checkout', [branchName]);
    expect(exec).toHaveBeenNthCalledWith(3, 'git add', ['./badges']);
    expect(exec).toHaveBeenNthCalledWith(4, 'git commit', [
      '-m',
      'Updating coverage badges',
    ]);
    expect(exec).toHaveBeenNthCalledWith(5, `git push origin ${branchName}`);
  });
});
