"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const find_device_1 = require("./find_device");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let os = core.getInput("os");
            let os_type = os.split(" ")[0];
            switch (os_type) {
                case "macOS":
                    core.setOutput("destination", "platform=macOS,arch=x86_64");
                    break;
                case "iOS":
                case "tvOS":
                    var destination = yield find_device_1.find_device(os);
                    core.setOutput("destination", destination);
                    break;
                default:
                    core.setFailed("unknown OS type " + os_type);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
