import { getCurrentBranch } from './getCurrentBranch';

jest.mock('@actions/core');

describe('getCurrentBranch function', () => {
  beforeAll(() => {
    process.env.GITHUB_HEAD_REF = undefined;
    process.env.GITHUB_REF_NAME = undefined;
  });

  it('should throw an error when branch name could not be defined', () => {
    process.env.GITHUB_HEAD_REF = undefined;
    process.env.GITHUB_REF_NAME = undefined;

    expect(getCurrentBranch).toThrow(
      'Unable to get current branch from github event.',
    );
  });

  it('should return the current branch', () => {
    process.env.GITHUB_HEAD_REF = 'master';
    process.env.GITHUB_REF_NAME = undefined;

    const result = getCurrentBranch();

    expect(result).toBe('master');
  });

  it('should return the current branch from ref name env var', () => {
    process.env.GITHUB_HEAD_REF = undefined;
    process.env.GITHUB_REF_NAME = 'cool';

    const result = getCurrentBranch();

    expect(result).toBe('cool');
  });
});
