import { info, setFailed } from '@actions/core';
import { generateBadges } from 'node-jest-badges';
import { mocked } from 'ts-jest/utils';

import { pushBadges } from '../logic/git/pushBadges';
import { setGitConfig } from '../logic/git/setGitConfig';
import { isBranchValidForBadgesGeneration } from '../logic/inputs/isBranchValidForBadgesGeneration';
import { doBadgesExist } from '../logic/jest/doBadgesExist';
import { hasCoverageEvolved } from '../logic/jest/hasCoverageEvolved';
import { isJestCoverageReportAvailable } from '../logic/jest/isJestCoverageReportAvailable';
import { actionWorkflow } from './actionWorkflow';

jest.mock('@actions/core');
jest.mock('node-jest-badges');
jest.mock('../logic/git/pushBadges');
jest.mock('../logic/git/setGitConfig');
jest.mock('../logic/jest/isJestCoverageReportAvailable');
jest.mock('../logic/jest/doBadgesExist');
jest.mock('../logic/jest/hasCoverageEvolved');
jest.mock('../logic/inputs/isBranchValidForBadgesGeneration');

describe('actionWorkflow function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should end the task if branch is not allowed', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(false);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(0);

    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith(
      '> Current branch does not belong to the branches allowed for badges generation, task dropped.',
    );
  });

  it('should fail the task if there is no coverage report', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(false);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      '> Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?',
    );
  });

  it('should do nothing if coverage has not evolved', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    mocked(doBadgesExist).mockResolvedValueOnce(true);
    mocked(hasCoverageEvolved).mockResolvedValueOnce(false);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges and push them', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    mocked(doBadgesExist).mockResolvedValueOnce(true);
    mocked(hasCoverageEvolved).mockResolvedValueOnce(true);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should fail the task if there is errors', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    mocked(isJestCoverageReportAvailable).mockRejectedValueOnce(
      new Error('Big bad error'),
    );

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      'Oh no! An error occured: Big bad error',
    );
  });

  it('should display a generic error when no message is available', async () => {
    mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    mocked(isJestCoverageReportAvailable).mockRejectedValueOnce(
      'Big bad error',
    );

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(`Oh no! An unknown error occured`);
  });
});
