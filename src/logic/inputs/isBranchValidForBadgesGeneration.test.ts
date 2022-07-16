import { error, getInput, info } from '@actions/core';
import { mocked } from 'jest-mock';

import { getCurrentBranch } from '../github/getCurrentBranch';
import { isBranchValidForBadgesGeneration } from './isBranchValidForBadgesGeneration';

jest.mock('@actions/core');
jest.mock('../github/getCurrentBranch');

describe('isBranchValidForBadgesGeneration function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false when current branch could not be determined', () => {
    mocked(getCurrentBranch).mockReturnValueOnce(undefined);

    const result = isBranchValidForBadgesGeneration();

    expect(error).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });

  it('should return true when no branches were specified as input and current branch is master', () => {
    mocked(getCurrentBranch).mockReturnValueOnce('master');
    mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true when no branches were specified as input and current branch is main', () => {
    mocked(getCurrentBranch).mockReturnValueOnce('main');
    mocked(getInput).mockReturnValueOnce('');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('should return true if branch is allowed', () => {
    mocked(getCurrentBranch).mockReturnValueOnce('master');
    mocked(getInput).mockReturnValueOnce('yolo,bro,master,cool');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(true);
  });

  it('should return false if branch is not allowed', () => {
    mocked(getCurrentBranch).mockReturnValueOnce('master');
    mocked(getInput).mockReturnValueOnce('yolo,bro,cool');

    const result = isBranchValidForBadgesGeneration();

    expect(info).toHaveBeenCalledTimes(0);
    expect(result).toBe(false);
  });
});
