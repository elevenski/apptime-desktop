"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoLaunch = void 0;
var auto_launch_1 = __importDefault(require("auto-launch"));
exports.autoLaunch = new auto_launch_1.default({
    name: 'Apptime Desktop',
});
