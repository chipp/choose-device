import * as core from "@actions/core";
import { find_device } from "./find_device";

async function run() {
  try {
    let os = core.getInput("os");
    let os_type = os.split(" ")[0];

    switch (os_type) {
      case "macOS":
        core.setOutput("destination", "platform=macOS,arch=x86_64");
        break;
      case "iOS":
      case "tvOS":
        var destination = await find_device(os);
        core.setOutput("destination", destination);
        break;
      default:
        core.setFailed("unknown OS type " + os_type);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
