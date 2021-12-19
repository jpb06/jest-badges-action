import { readFileSync } from 'fs-extra';
import { mocked } from 'jest-mock';

import { getCurrentBranch } from './getCurrentBranch';

jest.mock('fs-extra');

describe('getCurrentBranch function', () => {
  it('should return undefined if github event path could not be parsed', () => {
    mocked(readFileSync).mockImplementationOnce(() => {
      throw new Error('Oh no!');
    });

    const result = getCurrentBranch();

    expect(result).toBeUndefined();
  });

  it('should return undefined if ref is missing', () => {
    mocked(readFileSync).mockReturnValueOnce(
      JSON.stringify({
        ref: undefined,
      }),
    );

    const result = getCurrentBranch();

    expect(result).toBeUndefined();
  });

  it('should return the current branch', () => {
    mocked(readFileSync).mockReturnValueOnce(
      JSON.stringify({
        ref: 'refs/heads/master',
      }),
    );

    const result = getCurrentBranch();

    expect(result).toBe('master');
  });
});
