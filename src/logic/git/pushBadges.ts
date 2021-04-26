import { info } from "@actions/core";
import { exec } from "@actions/exec";
import { hasCoverageEvolved } from "../jest/hasCoverageEvolved";

export const pushBadges = async (): Promise<void> => {
  const hasEvolved = await hasCoverageEvolved();
  if (!hasEvolved) {
    info("> Coverage has not evolved, no action required.");
    return;
  }

  await exec("git add", ["./badges"]);
  await exec("git commit", ["-m", "Updating coverage badges"]);
  await exec("git push");
};
