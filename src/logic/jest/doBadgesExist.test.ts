import { pathExists } from 'fs-extra';
import { mocked } from 'jest-mock';

import { doBadgesExist } from './doBadgesExist';

jest.mock('fs-extra');

describe('doBadgesExist function', () => {
  it('should return false if one file does not exist', async () => {
    mocked(pathExists)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true);

    const result = await doBadgesExist();

    expect(result).toBe(false);
  });

  it('should return true if all files exist', async () => {
    mocked(pathExists)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true);

    const result = await doBadgesExist();

    expect(result).toBe(true);
  });
});
