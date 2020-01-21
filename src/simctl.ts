import { exec } from "@actions/exec";
import { ExecOptions } from "@actions/exec/lib/interfaces";

interface Runtime {
  name: string;
  isAvailable: boolean;
  identifier: string;
}

export async function runtimes(): Promise<Array<Runtime>> {
  var stdout: string = "";
  var stderr: string = "";

  var options: ExecOptions = {
    silent: true,
    listeners: {
      stdout: function(data) {
        stdout = data.toString();
      },
      stderr: function(err) {
        stderr = err.toString();
      }
    }
  };

  await exec("xcrun", ["simctl", "list", "runtimes", "--json"], options);

  if (stdout === undefined) {
    throw stderr;
  }

  return JSON.parse(stdout)["runtimes"];
}

interface Device {
  name: string;
  isAvailable: string;
  udid: string;
}

export async function devices(runtime: Runtime): Promise<Array<Device>> {
  var stdout: string = "";
  var stderr: string = "";

  var options: ExecOptions = {
    silent: true,
    listeners: {
      stdout: function(data) {
        stdout = data.toString();
      },
      stderr: function(err) {
        stderr = err.toString();
      }
    }
  };

  await exec("xcrun", ["simctl", "list", "devices", "--json"], options);

  if (stdout === undefined) {
    throw stderr;
  }

  return JSON.parse(stdout)["devices"][runtime.identifier];
}
