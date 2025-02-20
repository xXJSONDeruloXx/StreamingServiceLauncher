document.addEventListener("DOMContentLoaded", () => {
  const streamingServiceNames = document.getElementById(
    "streamingServiceNames",
  );

  fetch("services.json")
    .then((response) => response.json())
    .then((json) => {
      // initialize appInfo with first entry
      updateAppInfo(Object.entries(json)[0]);

      Object.entries(json).forEach(([serviceName, info]) => {
        const streamingService = document.createElement("div");

        streamingService.innerHTML = serviceName;
        streamingService.setAttribute(
          "style",
          `
          text-transform: capitalize;
          padding: 1rem;
          border: 1px solid black;
          hover: pointer;
        `,
        );

        streamingService.addEventListener("click", () => {
          updateAppInfo([serviceName, info]);
        });

        streamingServiceNames.appendChild(streamingService);
      });
    });
});

function updateAppInfo([serviceName, info]) {
  const el = document.getElementById("serviceInstallInfo");
  if (info.recommendStandaloneApp) {
    el.innerHTML = `
      <h2 style="text-transform: capitalize;">${serviceName}</h2>

      <p>For this app, it is recommended to use the already existing Standalone App.</p>
      <p>See the following link: <a href="${info.appUrl}">${info.appUrl}</a></p>
      `;
  } else {
    el.innerHTML = generateAppInstallInstructions(serviceName, info);
  }
}

function generateAppInstallInstructions(serviceName, appInfo) {
  return `
    <h2 style="text-transform: capitalize;">${serviceName}</h2>

    <p>App url: ${appInfo.appUrl}</p>

    <h2>Basic Usage</h2>

    <p>Run the following in terminal</p>

    <pre>$HOME/.local/bin/streaming-service-launcher ${serviceName}</pre>

    <h2>Add to Steam Deck Gaming mode</h2>

    <p>Note, your distro must support the "steamos-add-to-steam" command</p>

    <p>Run the following in Terminal:</p>

    <pre>$HOME/.local/bin/steamos-install-streaming-app ${serviceName}</pre>
  `;
}
