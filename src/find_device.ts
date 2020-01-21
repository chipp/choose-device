import { runtimes, devices } from "./simctl";

export async function find_device(os: string): Promise<string> {
  let runtime = (await runtimes()).find(function(e) {
    e.name == os && e.isAvailable;
  });

  if (runtime === undefined) {
    throw "can't find OS with name " + os;
  }

  let device = (await devices(runtime))[0];

  return "id=" + device.udid;
}
