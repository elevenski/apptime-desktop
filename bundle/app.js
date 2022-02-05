"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Config = /** @class */ (function () {
    function Config() {
        this.frame = true;
        this.build = 'stable';
        this.discordRPC = true;
        this.hardwareAcceleration = true;
    }
    Config.prototype.apply = function (data) {
        Object.assign(this, data);
    };
    Config.prototype.set = function (key, value) {
        var _a;
        // @ts-expect-error
        this[key] = value;
        electron_1.ipcRenderer.send('set', (_a = {}, _a[key] = value, _a));
    };
    return Config;
}());
var config = new Config();
electron_1.ipcRenderer.on('config', function (_, data) { return config.apply(data); });
electron_1.contextBridge.exposeInMainWorld("isNative", true);
electron_1.contextBridge.exposeInMainWorld("nativeVersion", "1.0.2");
electron_1.contextBridge.exposeInMainWorld("native", {
    min: function () { return electron_1.ipcRenderer.send('min'); },
    max: function () { return electron_1.ipcRenderer.send('max'); },
    close: function () { return electron_1.ipcRenderer.send('close'); },
    reload: function () { return electron_1.ipcRenderer.send('reload'); },
    relaunch: function () { return electron_1.ipcRenderer.send('relaunch'); },
    getConfig: function () { return config; },
    set: function (k, v) { return config.set(k, v); },
    getAutoStart: function () { return new Promise(function (resolve) {
        electron_1.ipcRenderer.send('getAutoStart');
        electron_1.ipcRenderer.on('autoStart', function (_, arg) { return resolve(arg); });
    }); },
    enableAutoStart: function () { return new Promise(function (resolve) {
        electron_1.ipcRenderer.send('setAutoStart', true);
        electron_1.ipcRenderer.on('autoStart', function (_, arg) { return resolve(arg); });
    }); },
    disableAutoStart: function () { return new Promise(function (resolve) {
        electron_1.ipcRenderer.send('setAutoStart', false);
        electron_1.ipcRenderer.on('autoStart', function (_, arg) { return resolve(arg); });
    }); }
});
