import { exec } from "@actions/exec";

import { pushBadges } from "./pushBadges";

jest.mock("@actions/exec");

describe("pushBadges function", () => {
  it("should ", async () => {
    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, "git add", ["./badges"]);
    expect(exec).toHaveBeenNthCalledWith(2, "git commit", [
      "-m",
      `"Coverage badges"`,
    ]);
    expect(exec).toHaveBeenNthCalledWith(3, "git push");
  });
});
