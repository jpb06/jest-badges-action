import { pathExists, readJson } from 'fs-extra';

import { isJestCoverageReportAvailable } from './isJestCoverageReportAvailable';

jest.mock('fs-extra');

describe('isJestCoverageReportAvailable function', () => {
  it('should return false if coverage report does not exist', async () => {
    jest.mocked(pathExists).mockImplementationOnce(() => false as never);

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report is missing', async () => {
    jest.mocked(pathExists).mockImplementationOnce(() => true as never);
    jest.mocked(readJson).mockImplementationOnce(() => undefined as never);

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report is empty', async () => {
    jest.mocked(pathExists).mockImplementationOnce(() => true as never);
    jest.mocked(readJson).mockImplementationOnce(() => ({} as never));

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return false if coverage report has missing details', async () => {
    jest.mocked(pathExists).mockImplementationOnce(() => true as never);
    jest.mocked(readJson).mockImplementationOnce(
      () =>
        ({
          total: {
            branches: { pct: 20 },
          },
        } as never),
    );

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(false);
  });

  it('should return true', async () => {
    jest.mocked(pathExists).mockImplementationOnce(() => true as never);
    jest.mocked(readJson).mockImplementationOnce(
      () =>
        ({
          total: {
            branches: { pct: 90 },
            functions: { pct: 70 },
            lines: { pct: 100 },
            statements: { pct: 60 },
          },
        } as never),
    );

    const result = await isJestCoverageReportAvailable();

    expect(result).toBe(true);
  });
});
