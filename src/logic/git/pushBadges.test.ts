import { mocked } from "ts-jest/utils";

import { error, info } from "@actions/core";
import { exec } from "@actions/exec";

import { execFile } from "../shell/execFile";
import { pushBadges } from "./pushBadges";

jest.mock("@actions/core");
jest.mock("@actions/exec");
jest.mock("../shell/execFile");

describe("pushBadges function", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should not push if there is no changes", async () => {
    mocked(execFile).mockResolvedValueOnce({ stdout: "", stderr: "" });

    await pushBadges();

    expect(execFile).toHaveBeenCalledTimes(1);
    expect(exec).toHaveBeenCalledTimes(0);
    expect(info).toHaveBeenCalledTimes(1);
  });

  it("should end the task if git diff has errors", async () => {
    const errorMessage = "Oh no!";
    mocked(execFile).mockResolvedValueOnce({
      stdout: "",
      stderr: errorMessage,
    });

    await pushBadges();

    expect(execFile).toHaveBeenCalledTimes(1);
    expect(exec).toHaveBeenCalledTimes(0);
    expect(info).toHaveBeenCalledTimes(0);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith(
      `> An error occured while running git diff: \n\n${errorMessage}`
    );
  });

  it("should push changes", async () => {
    mocked(execFile).mockResolvedValueOnce({ stdout: "1", stderr: "" });

    await pushBadges();

    expect(execFile).toHaveBeenCalledTimes(1);
    expect(execFile).toHaveBeenCalledWith("git", [
      "diff",
      "--quiet",
      "badges",
      "|| echo $?",
    ]);

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, "git add", ["./badges"]);
    expect(exec).toHaveBeenNthCalledWith(2, "git commit", [
      "-m",
      `"Coverage badges"`,
    ]);
    expect(exec).toHaveBeenNthCalledWith(3, "git push");
  });
});
