# StreamingServiceLauncher

Simple Launcher for Video Streaming Services on Linux

# Installation / Update

run the following script, it does both install and updates:

```
curl -L https://raw.githubusercontent.com/aarron-lee/StreamingServiceLauncher/refs/heads/main/install.sh | sh
```

# Uninstall

```bash
rm $HOME/Applications/StreamingServiceLauncher.AppImage
rm $HOME/.local/bin/streaming-service-launcher
```

# Usage

```bash
$HOME/.local/bin/streaming-service-launcher serviceName
```

Example:

```bash
# example for netflix
$HOME/.local/bin/streaming-service-launcher netflix
```

You can find all `serviceName` values in the [services.json](./services.json)
