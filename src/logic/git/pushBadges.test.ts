import { mocked } from "ts-jest/utils";

import { info } from "@actions/core";
import { exec } from "@actions/exec";

import { pushBadges } from "./pushBadges";

jest.mock("@actions/core");
jest.mock("@actions/exec");

describe("pushBadges function", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should not push if there is no changes", async () => {
    mocked(exec).mockResolvedValueOnce(0);

    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledTimes(1);
  });

  it("should push changes", async () => {
    mocked(exec).mockResolvedValueOnce(1);

    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(4);
    expect(exec).toHaveBeenNthCalledWith(1, "git diff", [
      "--exit-code",
      "badges",
    ]);
    expect(exec).toHaveBeenNthCalledWith(2, "git add", ["./badges"]);
    expect(exec).toHaveBeenNthCalledWith(3, "git commit", [
      "-m",
      `"Coverage badges"`,
    ]);
    expect(exec).toHaveBeenNthCalledWith(4, "git push");
  });
});
