const { app, BrowserWindow, ipcMain: ipc } = require("electron");

const rpc = require("discord-rpc");
const client = new rpc.Client({ transport: 'ipc' });


const AppID = "873161814635085877"
const details = "Monitoring Service."
const largeImageKey = "icon"
const largeImageText = "Apptime Desktop 3.1.0"

client.on('ready', () => {

  client.setActivity({
    details: details,
    largeImageKey: largeImageKey,
    largeImageText: largeImageText,
    startTimestamp: new Date(),
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
    minWidth: 1100,
    minHeight: 700,
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
