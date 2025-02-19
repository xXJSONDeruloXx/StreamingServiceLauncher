# StreamingServiceLauncher

Simple Launcher for Video Streaming Services on Linux

# Installation / Update

run the following script, it does both install and updates:

```
curl -L https://raw.githubusercontent.com/aarron-lee/StreamingServiceLauncher/refs/heads/main/install.sh | sh
```

# Uninstall

```bash
rm $HOME/.local/bin/StreamingServiceLauncher.AppImage
```

# Usage

```bash
APP_NAME=serviceName $HOME/.local/bin/StreamingServiceLauncher.AppImage
```

Example:

```bash
APP_NAME=netflix $HOME/.local/bin/StreamingServiceLauncher.AppImage
```

You can find all `APP_NAME` values in the [services.json](./services.json)
