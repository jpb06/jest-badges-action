import { info } from "@actions/core";
import { exec } from "@actions/exec";

export const pushBadges = async (): Promise<void> => {
  const diffResult = await exec("git diff", ["--exit-code", "badges"]);
  const hasNoChanges = diffResult === 0;
  if (hasNoChanges) {
    info("> Coverage has not evolved, no action required.");
    return;
  }

  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", `"Coverage badges"`]);
  await exec("git push");
};
