"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_window_state_1 = __importDefault(require("electron-window-state"));
var url_1 = require("url");
var path_1 = __importDefault(require("path"));
var config_1 = require("./lib/config");
var discordRPC_1 = require("./lib/discordRPC");
var autoLaunch_1 = require("./lib/autoLaunch");
var updater_1 = require("./lib/updater");
var WindowIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, "../build/icons/icon.png"));
WindowIcon.setTemplateImage(true);
config_1.onStart();
updater_1.autoUpdate();
var relaunch;
function createWindow() {
    var _this = this;
    var initialConfig = config_1.getConfig();
    var mainWindowState = electron_window_state_1.default({
        defaultWidth: 1280,
        defaultHeight: 720
    });
    var mainWindow = new electron_1.BrowserWindow({
        autoHideMenuBar: true,
        title: 'Apptime Desktop',
        icon: WindowIcon,
        frame: initialConfig.frame,
        webPreferences: {
            preload: path_1.default.resolve(electron_1.app.getAppPath(), 'bundle', 'app.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 480,
        minHeight: 300
    });
    mainWindowState.manage(mainWindow);
    mainWindow.loadURL(config_1.getBuildURL());
    mainWindow.webContents.on('did-finish-load', function () {
        return mainWindow.webContents.send('config', config_1.getConfig());
    });
    if (process.platform === 'win32') {
        electron_1.app.setAppUserModelId(mainWindow.title);
    }
    electron_1.ipcMain.on('getAutoStart', function () {
        return autoLaunch_1.autoLaunch.isEnabled()
            .then(function (v) { return mainWindow.webContents.send('autoStart', v); });
    });
    electron_1.ipcMain.on('setAutoStart', function (_, value) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!value) return [3 /*break*/, 2];
                    return [4 /*yield*/, autoLaunch_1.autoLaunch.enable()];
                case 1:
                    _a.sent();
                    mainWindow.webContents.send('autoStart', true);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, autoLaunch_1.autoLaunch.disable()];
                case 3:
                    _a.sent();
                    mainWindow.webContents.send('autoStart', false);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    electron_1.ipcMain.on('set', function (_, arg) {
        if (typeof arg.discordRPC !== 'undefined') {
            if (arg.discordRPC) {
                discordRPC_1.connectRPC();
            }
            else {
                discordRPC_1.dropRPC();
            }
        }
        config_1.store.set('config', __assign(__assign({}, config_1.store.get('config')), arg));
    });
    electron_1.ipcMain.on('reload', function () { return mainWindow.loadURL(config_1.getBuildURL()); });
    electron_1.ipcMain.on('relaunch', function () {
        relaunch = true;
        mainWindow.close();
    });
    electron_1.ipcMain.on('min', function () { return mainWindow.minimize(); });
    electron_1.ipcMain.on('max', function () { return mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize(); });
    electron_1.ipcMain.on('close', function () { return mainWindow.close(); });
}
electron_1.app.whenReady().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, config_1.firstRun()];
            case 1:
                _a.sent();
                createWindow();
                electron_1.app.on('activate', function () {
                    if (electron_1.BrowserWindow.getAllWindows().length === 0)
                        createWindow();
                });
                return [2 /*return*/];
        }
    });
}); });
electron_1.app.on('window-all-closed', function () {
    if (relaunch) {
        var options = {
            args: process.argv.slice(1).concat(['--relaunch']),
            execPath: process.execPath
        };
        if (electron_1.app.isPackaged && process.env.APPIMAGE) {
            options.execPath = process.env.APPIMAGE;
            options.args.unshift('--appimage-extract-and-run');
        }
        electron_1.app.relaunch(options);
        electron_1.app.quit();
        return;
    }
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('web-contents-created', function (_, contents) {
    contents.on('will-navigate', function (event, navigationUrl) {
        var parsedUrl = new url_1.URL(navigationUrl);
        if (parsedUrl.origin !== config_1.getBuildURL()) {
            event.preventDefault();
        }
    });
    contents.setWindowOpenHandler(function (_a) {
        var url = _a.url;
        if (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:')) {
            setImmediate(function () {
                electron_1.shell.openExternal(url);
            });
        }
        return { action: 'deny' };
    });
});
