import { pathExists, readJson } from 'fs-extra';
import { mocked } from 'jest-mock';

import { isJestCoverageReportAvailable } from './isJestCoverageReportAvailable';

jest.mock('fs-extra');

describe('isJestCoverageReportAvailable function', () => {
  it('should return false if coverage report does not exist', async () => {
    mocked(pathExists).mockImplementationOnce(() => false);

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report is missing', async () => {
    mocked(pathExists).mockImplementationOnce(() => true);
    mocked(readJson).mockImplementationOnce(() => undefined);

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report is empty', async () => {
    mocked(pathExists).mockImplementationOnce(() => true);
    mocked(readJson).mockImplementationOnce(() => ({}));

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report has missing details', async () => {
    mocked(pathExists).mockImplementationOnce(() => true);
    mocked(readJson).mockImplementationOnce(() => ({
      total: {
        branches: { pct: 20 },
      },
    }));

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return true', async () => {
    mocked(pathExists).mockImplementationOnce(() => true);
    mocked(readJson).mockImplementationOnce(() => ({
      total: {
        branches: { pct: 90 },
        functions: { pct: 70 },
        lines: { pct: 100 },
        statements: { pct: 60 },
      },
    }));

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(true);
  });
});
