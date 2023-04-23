import { getInput, info } from '@actions/core';

import { isBranchValidForBadgesGeneration } from './isBranchValidForBadgesGeneration';

jest.mock('@actions/core');

describe('isBranchValidForBadgesGeneration function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when no branches were specified as input and current branch is master', () => {
    jest.mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration('master');

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true when no branches were specified as input and current branch is main', () => {
    jest.mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration('main');

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true if branch is allowed', () => {
    jest.mocked(getInput).mockReturnValueOnce('yolo,bro,master,cool');

    const result = isBranchValidForBadgesGeneration('master');

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(true);
  });

  it('should return false if branch is not allowed', () => {
    jest.mocked(getInput).mockReturnValueOnce('yolo,bro,cool');

    const result = isBranchValidForBadgesGeneration('master');

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(false);
  });
});
