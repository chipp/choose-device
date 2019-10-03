"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const simctl_1 = require("./simctl");
function find_device(os) {
    return __awaiter(this, void 0, void 0, function* () {
        let runtime = (yield simctl_1.runtimes()).find(function (e) {
            e.name == os && e.isAvailable;
        });
        if (runtime === undefined) {
            throw "can't find OS with name " + os;
        }
        let device = (yield simctl_1.devices(runtime))[0];
        return "id=" + device.udid;
    });
}
exports.find_device = find_device;
