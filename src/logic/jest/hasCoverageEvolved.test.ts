import { exec } from '@actions/exec';

import { hasCoverageEvolved } from './hasCoverageEvolved';

jest.mock('@actions/exec');

describe('hasCoverageEvolved function', () => {
  const outputPath = './badges';

  it('should return true if coverage folder does not exist', async () => {
    const result = await hasCoverageEvolved(false, outputPath);

    expect(result).toBe(true);
  });

  it('should return true if diff returns one', async () => {
    jest.mocked(exec).mockResolvedValueOnce(1);

    const result = await hasCoverageEvolved(true, outputPath);

    expect(result).toBe(true);
  });

  it('should return false if diff returns zero', async () => {
    jest.mocked(exec).mockResolvedValueOnce(0);

    const result = await hasCoverageEvolved(true, outputPath);

    expect(result).toBe(false);
  });
});
