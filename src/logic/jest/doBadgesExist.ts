import { pathExists } from 'fs-extra';

export const doBadgesExist = async (outputPath: string): Promise<boolean> => {
  const files = [
    'coverage-branches.svg',
    'coverage-functions.svg',
    'coverage-jest coverage.svg',
    'coverage-lines.svg',
    'coverage-statements.svg',
  ];

  const exist = await Promise.all(
    files.map((file) => pathExists(`${outputPath}/${file}`)),
  );

  return exist.every((el) => el === true);
};
