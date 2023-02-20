import { getInput, info, setFailed } from '@actions/core';
import { generateBadges } from 'node-jest-badges';

import { actionWorkflow } from './actionWorkflow';
import { pushBadges } from '../logic/git/pushBadges';
import { setGitConfig } from '../logic/git/setGitConfig';
import { isBranchValidForBadgesGeneration } from '../logic/inputs/isBranchValidForBadgesGeneration';
import { doBadgesExist } from '../logic/jest/doBadgesExist';
import { hasCoverageEvolved } from '../logic/jest/hasCoverageEvolved';
import { isJestCoverageReportAvailable } from '../logic/jest/isJestCoverageReportAvailable';

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
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(false);
    jest.mocked(getInput).mockReturnValueOnce('false');

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(0);

    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith(
      '🔶 Current branch does not belong to the branches allowed for badges generation, task dropped.',
    );
  });

  it('should fail the task if there is no coverage report', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(false);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      '🔶 Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?',
    );
  });

  it('should do nothing if coverage has not evolved', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(false);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should check if coverage has not evolved in a custom output folder', async () => {
    const path = './out-path';
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(false);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(path);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(doBadgesExist).toHaveBeenCalledWith(path);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges and not push them if no-commit is set to true', async () => {
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(true);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('true')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges and push them', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(true);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges from the default summary path', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(true);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(generateBadges).toHaveBeenCalledWith(undefined);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges from a custom summary path', async () => {
    const path = './myModule/coverage-summary.json';
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(true);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('false')
      .mockReturnValueOnce(path);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(generateBadges).toHaveBeenCalledWith(path, undefined);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should generate badges to a custom output folder', async () => {
    const path = './out-path';
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest.mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);
    jest.mocked(doBadgesExist).mockResolvedValueOnce(true);
    jest.mocked(hasCoverageEvolved).mockResolvedValueOnce(true);
    jest
      .mocked(getInput)
      .mockReturnValueOnce('false')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(path);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(generateBadges).toHaveBeenCalledWith(undefined, path);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledWith(path);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it('should fail the task if there is errors', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest
      .mocked(isJestCoverageReportAvailable)
      .mockRejectedValueOnce(new Error('Big bad error'));

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      '🔶 Oh no! An error occured: Big bad error',
    );
  });

  it('should display a generic error when no message is available', async () => {
    jest.mocked(isBranchValidForBadgesGeneration).mockReturnValueOnce(true);
    jest
      .mocked(isJestCoverageReportAvailable)
      .mockRejectedValueOnce('Big bad error');

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      `🔶 Oh no! An unknown error occured`,
    );
  });
});
