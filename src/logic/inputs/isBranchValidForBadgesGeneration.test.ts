import { error, getInput, info } from '@actions/core';

import { getCurrentBranch } from '../github/getCurrentBranch';
import { isBranchValidForBadgesGeneration } from './isBranchValidForBadgesGeneration';

jest.mock('@actions/core');
jest.mock('../github/getCurrentBranch');

describe('isBranchValidForBadgesGeneration function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false when current branch could not be determined', () => {
    jest.mocked(getCurrentBranch).mockReturnValueOnce(undefined);

    const result = isBranchValidForBadgesGeneration();

    expect(error).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  it('should return true when no branches were specified as input and current branch is master', () => {
    jest.mocked(getCurrentBranch).mockReturnValueOnce('master');
    jest.mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true when no branches were specified as input and current branch is main', () => {
    jest.mocked(getCurrentBranch).mockReturnValueOnce('main');
    jest.mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true if branch is allowed', () => {
    jest.mocked(getCurrentBranch).mockReturnValueOnce('master');
    jest.mocked(getInput).mockReturnValueOnce('yolo,bro,master,cool');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(true);
  });

  it('should return false if branch is not allowed', () => {
    jest.mocked(getCurrentBranch).mockReturnValueOnce('master');
    jest.mocked(getInput).mockReturnValueOnce('yolo,bro,cool');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(false);
  });
});
