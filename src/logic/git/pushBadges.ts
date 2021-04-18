import { error, info } from "@actions/core";
import { exec } from "@actions/exec";

import { execFile } from "../shell/execFile";

export const pushBadges = async (): Promise<void> => {
  const { stdout, stderr } = await execFile("git", [
    "diff",
    "--quiet",
    "badges",
    "|| echo $?",
  ]);
  if (stderr.length > 0) {
    error(`> An error occured while running git diff: \n\n${stderr}`);
    return;
  }

  const hasChanges = stdout === "1";
  if (!hasChanges) {
    info("> Coverage has not evolved, no action required.");
    return;
  }

  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", `"Coverage badges"`]);
  await exec("git push");
};
