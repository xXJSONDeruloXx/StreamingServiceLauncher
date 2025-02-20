const streamingServices = require("./services.json");
const { app, BrowserWindow, shell } = require("electron");

const getServiceName = () => {
  let extractedAppname;

  for (let i = 0; i < process.argv.length; i++) {
    let flag = process.argv[i];
    const appname = flag?.match(/--appname=([a-zA-Z0-9]+)/);
    if (appname) extractedAppname = appname[1];
  }
  const serviceName = extractedAppname || process.env?.APP_NAME || "default";

  return serviceName;
};

function createWindow() {
  let serviceName, appUrl, userAgent, zoomFactor;

  if (process.env.APP_URL) {
    // user provided manual APP_URL override, use it instead
    appUrl = process.env.APP_URL;

    // other manual overrides
    if (process.env.USER_AGENT) userAgent = process.env.USER_AGENT;
    if (process.env.ZOOM_FACTOR)
      zoomFactor = parseFloat(process.env.ZOOM_FACTOR);
  } else {
    serviceName = getServiceName();

    if (serviceName === "default") {
      // render index.html, since no appName was provided
      const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        maxWidth: 1280,
        maxHeight: 720,
        fullscreen: false,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
        },
      });

      win.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
      });

      win.loadFile("./index.html");
      return;
    }

    ({ appUrl, userAgent, zoomFactor } = streamingServices[serviceName] || {});
  }

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
