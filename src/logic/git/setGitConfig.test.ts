import { exec } from "@actions/exec";
import { context } from "@actions/github";

import { setGitConfig } from "./setGitConfig";

jest.mock("@actions/exec");
jest.mock("@actions/github");

describe("setGitConfig function", () => {
  it("should set git config", async () => {
    await setGitConfig();

    expect(exec).toHaveBeenCalledTimes(2);
    expect(exec).toHaveBeenNthCalledWith(1, "git config", [
      "--global",
      "user.name",
      context.actor,
    ]);
    expect(exec).toHaveBeenNthCalledWith(2, "git config", [
      "--global",
      "user.email",
      `${context.actor}@users.noreply.github.com`,
    ]);
  });
});
