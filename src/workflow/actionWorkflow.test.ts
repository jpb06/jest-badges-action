import { generateBadges } from "node-jest-badges";
import { mocked } from "ts-jest/utils";

import { info, setFailed } from "@actions/core";

import { pushBadges } from "../logic/git/pushBadges";
import { setGitConfig } from "../logic/git/setGitConfig";
import { isJestCoverageReportAvailable } from "../logic/jest/isJestCoverageReportAvailable";
import { actionWorkflow } from "./actionWorkflow";

jest.mock("@actions/core");
jest.mock("node-jest-badges");
jest.mock("../logic/git/pushBadges");
jest.mock("../logic/git/setGitConfig");
jest.mock("../logic/jest/isJestCoverageReportAvailable");

describe("actionWorkflow function", () => {
  afterEach(() => jest.resetAllMocks());

  it("should fail the task if there is no coverage report", async () => {
    mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(false);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      "> Coverage report is missing. Did you forget to run tests or to add `json-summary` to coverageReporters in jest config?"
    );
  });

  it("should generate badges and push them", async () => {
    mocked(isJestCoverageReportAvailable).mockResolvedValueOnce(true);

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(1);
    expect(setGitConfig).toHaveBeenCalledTimes(1);
    expect(pushBadges).toHaveBeenCalledTimes(1);

    expect(info).toHaveBeenCalledTimes(2);
    expect(setFailed).toHaveBeenCalledTimes(0);
  });

  it("should fail the task if there is errors", async () => {
    mocked(isJestCoverageReportAvailable).mockRejectedValueOnce(
      new Error("Big bad error")
    );

    await actionWorkflow();

    expect(generateBadges).toHaveBeenCalledTimes(0);
    expect(setGitConfig).toHaveBeenCalledTimes(0);
    expect(pushBadges).toHaveBeenCalledTimes(0);

    expect(setFailed).toHaveBeenCalledTimes(1);
    expect(setFailed).toHaveBeenCalledWith(
      "Oh no! An error occured: Big bad error"
    );
  });
});
