# StreamingServiceLauncher

[![](https://img.shields.io/github/downloads/xxjsonderuloxx/StreamingServiceLauncher/total.svg)](https://github.com/xxjsonderuloxx/StreamingServiceLauncher/releases)

Simple Launcher for Video Streaming Services on SteamOS, Bazzite, SteamFork, etc

![app image](./img/app.png)

# Installation / Update

## AppImage (Recommended)

Run the following script, it does both install and updates:

```
curl -L https://raw.githubusercontent.com/xxjsonderuloxx/StreamingServiceLauncher/refs/heads/main/install.sh | sh
```

## Flatpak

You can install the Flatpak version with:

```
curl -L https://raw.githubusercontent.com/xxjsonderuloxx/StreamingServiceLauncher/refs/heads/main/install.sh | sh -- --flatpak
```

Or download and install the Flatpak bundle manually from the [latest release](https://github.com/xxjsonderuloxx/StreamingServiceLauncher/releases/latest).

# Uninstall

## AppImage

```bash
rm $HOME/Applications/StreamingServiceLauncher.AppImage
rm $HOME/Applications/streaming_scripts/*.sh
rm $HOME/.local/bin/streaming-service-launcher
rm $HOME/.local/bin/steamos-install-streaming-app
rm $HOME/.local/share/applications/streamingservicelauncher*.desktop
rm $HOME/.local/bin/create-streaming-app-desktop-entry
```

## Flatpak

```bash
flatpak uninstall --user com.xxjsonderuloxx.StreamingServiceLauncher
```

# Development

## CI Build Process

This project uses GitHub Actions to automatically build both AppImage and Flatpak packages. The CI pipeline includes some special accommodations to handle the limitations of building Flatpak in a container environment:

1. A special CI-specific manifest file (`manifest-ci.json`) is used for Flatpak builds in GitHub Actions
2. The build uses additional flags to work around user namespace restrictions in containers:
   - `--system-helper=disabled`
   - `--disable-rofiles-fuse` 
   - Additional sandbox-disabling flags

If you're experiencing issues with the Flatpak build in CI environments:

1. Check the uploaded build logs artifact for detailed error information
2. Ensure all source files are correctly copied to the flatpak directory
3. Consider using the fallback direct build approach which manually structures the Flatpak directory

For local development and building:

```bash
# Build AppImage locally
npm run build

# Build Flatpak locally (works better than CI in most environments)
npm run build:flatpak
npm run build:flatpak-bundle
```

# Usage

## AppImage

```bash
$HOME/.local/bin/streaming-service-launcher serviceName
```

## Flatpak

```bash
flatpak run com.xxjsonderuloxx.StreamingServiceLauncher --appname=serviceName
```

Example:

```bash
# example for netflix (AppImage)
$HOME/.local/bin/streaming-service-launcher netflix

# example for netflix (Flatpak)
flatpak run com.xxjsonderuloxx.StreamingServiceLauncher --appname=netflix
```

You can find all `serviceName` values in the [services.json](./services.json)

## Create Desktop Entries

```bash
$HOME/.local/bin/create-streaming-app-desktop-entry serviceName
```

Example for netflix:

```bash
# creates desktop entry
$HOME/.local/bin/create-streaming-app-desktop-entry netflix

# This will generate a desktop app entry in the following location:
$HOME/.local/share/applications/streamingservicelauncher-netflix.desktop
```

Delete the generated desktop entry file if you wish to remove it.

## Add to Steam Deck Gaming mode

Note, your distro must support the `steamos-add-to-steam` command

```bash
# adds streaming service to Steam Gaming mode
$HOME/.local/bin/steamos-install-streaming-app serviceName

# example: netflix
$HOME/.local/bin/steamos-install-streaming-app netflix
```

Make sure to reboot steam after adding a streaming app. You can find all `serviceName` values in the [services.json](./services.json)

## Custom Targets

You can also set custom targets, see below for usage:

```bash
APP_URL=https://example.com  $HOME/.local/bin/streaming-service-launcher

# Optional: USER_AGENT and ZOOM_FACTOR can additionally be added, but requires the APP_URL env var
# ZOOM_FACTOR must be an integer or float
APP_URL=https://example.com  USER_AGENT="UserAgent Here"  ZOOM_FACTOR="1.5"  $HOME/.local/bin/streaming-service-launcher
```
