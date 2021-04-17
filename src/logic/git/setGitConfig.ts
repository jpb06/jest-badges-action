import { exec } from "@actions/exec";
import { context } from "@actions/github";

export const setGitConfig = async (): Promise<void> => {
  await exec("git config", ["--global", "user.name", context.actor]);
  await exec("git config", [
    "--global",
    "user.email",
    `${context.actor}@users.noreply.github.com`,
  ]);
};
