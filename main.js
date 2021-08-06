const { app, BrowserWindow, ipcMain: ipc } = require("electron");

const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });


const AppID = "873161814635085877"
const details = "Monitoring Service."
const state = "2.0.0-beta"
const largeImageKey = "icon"
const largeImageText = "Apptime Desktop"

client.on('ready', () => {

  client.setActivity({
    details: details,
    state: state,
    largeImageKey: largeImageKey,
    largeImageText: largeImageText,
    buttons: [
      { label: "Website", url: "https://www.apptime.tech" }, { label: "Apptime Desktop", url: "https://desktop.apptime.tech" },
    ]
  });
});
rpc.register(AppID);
client.login({ clientId: AppID }).catch((error) => {
  throw error.message;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Loading...',
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    icon: 'images/icon.png'
  });

  win.loadURL("https://www.apptime.tech")

}

app.whenReady().then(createWindow);