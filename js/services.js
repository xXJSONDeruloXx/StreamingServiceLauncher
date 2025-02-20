document.addEventListener("DOMContentLoaded", () => {
  const streamingServiceNames = document.getElementById(
    "streamingServiceNames",
  );

  fetch("services.json")
    .then((response) => response.json())
    .then((json) => {
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
          const el = document.getElementById("serviceInstallInfo");
          if (info.recommendStandaloneApp) {
            el.innerHTML = `
              <h2>${serviceName}</h2>

              <p>For this app, it is recommended to use the already existing Standalone App.</p>
              <p>See the following link: <a href="${info.appUrl}">${info.appUrl}</a></p>
              `;
          } else {
            el.innerHTML = generateAppInstallInstructions(serviceName, info);
          }
        });

        streamingServiceNames.appendChild(streamingService);
      });
    });
});

function generateAppInstallInstructions(serviceName, appInfo) {
  return `
    <h2>${serviceName}</h2>

    <p>App url: ${appInfo.appUrl}</p>

    <h2>Add to Steam Deck Gaming mode</h2>

    <pre>
    mkdir -p $HOME/Applications/streaming_scripts

    # creates a ${serviceName}.sh script
    cat << EOF > $HOME/Applications/streaming_scripts/${serviceName}.sh
    #!/bin/bash
    $HOME/.local/bin/streaming-service-launcher ${serviceName}
    EOF

    # make ${serviceName}.sh script executable
    chmod +x  $HOME/Applications/streaming_scripts/${serviceName}.sh

    # Add to Steam game mode
    steamos-add-to-steam $HOME/Applications/streaming_scripts/${serviceName}.sh
    </pre>
  `;
}
