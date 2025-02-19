const streamingServices = require("./services.json");
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  // pressing alt can bring up the menu bar even when its hidden. This accounts for that and disables it entirely
  win.setMenu(null);

  // default is youtube
  const serviceName = process.env.APP_NAME || "youtube";

  const { appUrl, userAgent, zoomFactor } =
    streamingServices[serviceName] || {};

  win.loadURL(
    appUrl,
    userAgent?.length
      ? {
          userAgent,
        }
      : {}
  );

  if (zoomFactor && zoomFactor > 0) {
    win.webContents.on("did-finish-load", () => {
      win.webContents.setZoomFactor(zoomFactor);
    });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
