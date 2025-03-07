# StreamingServiceLauncher

Simple Launcher for Video Streaming Services on SteamOS, Bazzite, ChimeraOS, etc

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

## Add to Steam Deck Gaming mode

```bash
# example for adding netflix to Steam Game mode

mkdir -p $HOME/Applications/streaming_scripts

# creates a netflix.sh script
cat << EOF > $HOME/Applications/streaming_scripts/netflix.sh
#!/bin/bash
$HOME/.local/bin/streaming-service-launcher netflix
EOF

# make netflix.sh script executable
chmod +x  $HOME/Applications/streaming_scripts/netflix.sh

# Add to Steam game mode
steamos-add-to-steam $HOME/Applications/streaming_scripts/netflix.sh
```

## Custom Targets

You can also set custom targets, see below for usage:

```bash
APP_URL=https://example.com  $HOME/.local/bin/streaming-service-launcher

# Optional: USER_AGENT and ZOOM_FACTOR can additionally be added, but requires the APP_URL env var
# ZOOM_FACTOR must be an integer or float
APP_URL=https://example.com  USER_AGENT="UserAgent Here"  ZOOM_FACTOR="1.5"  $HOME/.local/bin/streaming-service-launcher
```
