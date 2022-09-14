import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { mocked } from 'jest-mock';

import { pushBadges } from './pushBadges';

jest.mock('@actions/exec');
jest.mock('@actions/core');

describe('pushBadges function', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should push changes', async () => {
    mocked(getInput).mockReturnValueOnce('Updating coverage badges');

    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, 'git add', ['./badges']);
    expect(exec).toHaveBeenNthCalledWith(2, 'git commit', [
      '-m',
      'Updating coverage badges',
    ]);
    expect(exec).toHaveBeenNthCalledWith(3, 'git push');
  });
});
