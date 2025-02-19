const streamingServices = require("./services.json");
const { app, BrowserWindow } = require("electron");

const getServiceName = () => {
  const flag = process.argv[process.argv.length - 1];
  const appname = flag?.match(/--appname=([a-zA-Z0-9]+)/);
  const extractedAppname = appname ? appname[1] : undefined;

  // default is youtube
  const serviceName = extractedAppname || process.env?.APP_NAME || "youtube";

  return serviceName;
};

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

  const serviceName = getServiceName();

  const { appUrl, userAgent, zoomFactor } =
    streamingServices[serviceName] || {};

  win.loadURL(
    appUrl,
    userAgent?.length
      ? {
          userAgent,
        }
      : {},
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
