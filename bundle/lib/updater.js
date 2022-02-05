"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUpdate = void 0;
var electron_updater_1 = require("electron-updater");
function autoUpdate() {
    if (process.platform === 'win32') {
        if (process.windowsStore) {
            return;
        }
    }
    if (process.platform === 'linux') {
        if (typeof process.env.APP_IMAGE === 'undefined') {
            return;
        }
    }
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
}
exports.autoUpdate = autoUpdate;
