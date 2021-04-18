import { info } from "@actions/core";
import { exec } from "@actions/exec";

import { execFile } from "../shell/execFile";

export const pushBadges = async (): Promise<void> => {
  const { stdout } = await execFile("git", [
    "diff",
    "--quiet",
    "badges",
    "|| echo $?",
  ]);

  const hasNoChanges = stdout !== "1";
  if (hasNoChanges) {
    info("> Coverage has not evolved, no action required.");
    return;
  }

  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", `"Coverage badges"`]);
  await exec("git push");
};
