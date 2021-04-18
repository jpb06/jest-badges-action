import { info } from "@actions/core";
import { exec } from "@actions/exec";

export const pushBadges = async (): Promise<void> => {
  const code = await exec("git diff", ["--quiet", "badges"], {
    ignoreReturnCode: true,
  });

  const hasNoChanges = code === 0;
  if (hasNoChanges) {
    info("> Coverage has not evolved, no action required.");
    return;
  }

  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", "Updating coverage badges"]);
  await exec("git push");
};
