import { exec } from "@actions/exec";

export const pushBadges = async (): Promise<void> => {
  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", `"Coverage badges"`]);
  await exec("git push");
};
