import { runtimes, devices } from "./simctl";

export async function find_device(os: string): Promise<string> {
  let all = await runtimes();

  let runtime = all.find(function(e) {
    return e.name == os && e.isAvailable;
  });

  if (runtime === undefined) {
    throw Error("can't find OS with name " + os);
  }

  let device = (await devices(runtime))[0];

  return "id=" + device.udid;
}
