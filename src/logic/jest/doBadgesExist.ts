import { pathExists } from 'fs-extra';

export const doBadgesExist = async (): Promise<boolean> => {
  const files = [
    'coverage-branches.svg',
    'coverage-functions.svg',
    'coverage-global coverage.svg',
    'coverage-lines.svg',
    'coverage-statements.svg',
  ];

  const exist = await Promise.all(
    files.map((file) => pathExists(`./badges/${file}`))
  );

  return exist.every((el) => el === true);
};
