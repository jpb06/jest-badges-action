import { pathExists } from 'fs-extra';

import { doBadgesExist } from './doBadgesExist';

jest.mock('fs-extra');

describe('doBadgesExist function', () => {
  it('should return false if one file does not exist', async () => {
    jest
      .mocked(pathExists)
      .mockImplementationOnce(() => false as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never);

    const result = await doBadgesExist();

    expect(result).toBe(false);
  });

  it('should return true if all files exist', async () => {
    jest
      .mocked(pathExists)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never)
      .mockImplementationOnce(() => true as never);

    const result = await doBadgesExist();

    expect(result).toBe(true);
  });
});
