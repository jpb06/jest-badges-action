import cp from "child_process";
import util from "util";

const execFile = util.promisify(cp.execFile);

export { execFile };
