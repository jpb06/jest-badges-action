import { readFileSync } from 'fs-extra';

import { GithubEvent } from '../../types/github';

export const getCurrentBranch = (): string | undefined => {
  let event: GithubEvent;
  try {
    event = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH as string, {
        encoding: 'utf8',
      })
    );
  } catch (err) {
    return undefined;
  }

  const currentBranch = event.ref?.split('/').slice(2).join('/');

  return currentBranch;
};
