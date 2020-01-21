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
const exec_1 = require("@actions/exec");
function runtimes() {
    return __awaiter(this, void 0, void 0, function* () {
        var stdout = "";
        var stderr = "";
        var options = {
            silent: true,
            listeners: {
                stdout: function (data) {
                    stdout += data.toString();
                },
                stderr: function (err) {
                    stderr += err.toString();
                }
            }
        };
        yield exec_1.exec("xcrun", ["simctl", "list", "runtimes", "--json"], options);
        if (stdout === undefined) {
            throw stderr;
        }
        return JSON.parse(stdout).runtimes;
    });
}
exports.runtimes = runtimes;
function devices(runtime) {
    return __awaiter(this, void 0, void 0, function* () {
        var stdout = "";
        var stderr = "";
        var options = {
            silent: true,
            listeners: {
                stdout: function (data) {
                    stdout += data.toString();
                },
                stderr: function (err) {
                    stderr += err.toString();
                }
            }
        };
        yield exec_1.exec("xcrun", ["simctl", "list", "devices", "--json"], options);
        if (stdout === undefined) {
            throw stderr;
        }
        return JSON.parse(stdout).devices[runtime.identifier];
    });
}
exports.devices = devices;
