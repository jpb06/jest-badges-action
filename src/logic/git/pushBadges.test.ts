import { mocked } from "ts-jest/utils";

import { info } from "@actions/core";
import { exec } from "@actions/exec";

import { pushBadges } from "./pushBadges";
import { hasCoverageEvolved } from "../jest/hasCoverageEvolved";

jest.mock("@actions/core");
jest.mock("@actions/exec");
jest.mock("../jest/hasCoverageEvolved");

describe("pushBadges function", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should not push if there is no changes", async () => {
    mocked(hasCoverageEvolved).mockResolvedValueOnce(false);

    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(0);
    expect(info).toHaveBeenCalledTimes(1);
  });

  it("should push changes", async () => {
    mocked(hasCoverageEvolved).mockResolvedValueOnce(true);

    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, "git add", ["./badges"]);
    expect(exec).toHaveBeenNthCalledWith(2, "git commit", [
      "-m",
      "Updating coverage badges",
    ]);
    expect(exec).toHaveBeenNthCalledWith(3, "git push");
  });
});
