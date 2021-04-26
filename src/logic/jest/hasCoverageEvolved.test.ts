import { pathExists } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

import { exec } from '@actions/exec';

import { hasCoverageEvolved } from './hasCoverageEvolved';

jest.mock("@actions/exec");
jest.mock("fs-extra");

describe("hasCoverageEvolved function", () => {
  it("should return true if coverage folder does not exist", async () => {
    mocked(pathExists).mockImplementationOnce(() => false);

    const result = await hasCoverageEvolved();

    expect(result).toBe(true);
  });
});
