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

## CI/CD Pipeline

This project uses GitHub Actions for automated building and releasing of both AppImage and Flatpak packages.

### AppImage Building

The AppImage build process is straightforward using electron-builder. The CI workflow:
1. Installs dependencies using npm
2. Builds the application with electron-builder
3. Makes the AppImage executable and uploads it as an artifact

### Flatpak Building

Building Flatpaks in CI environments is more challenging due to container limitations in GitHub Actions. Our approach:

1. **CI-specific Manifest**: We use a special `manifest-ci.json` that's optimized for CI environments
2. **Direct Build Strategy**: 
   - Creates the directory structure manually instead of relying on bubblewrap
   - Installs Electron directly in the build directory
   - Uses alternate approaches for repository creation and bundling

3. **Container Adaptations**:
   - Uses `--disable-rofiles-fuse` and `--system-helper=disabled` flags
   - Adds `no-sandbox` options for Electron
   - Implements fallback mechanisms when standard approaches fail

4. **Error Handling**:
   - Includes multiple fallback approaches for each critical step
   - Provides detailed logging for troubleshooting
   - Creates placeholder files if build fails, allowing the workflow to continue

### Troubleshooting CI Builds

If you're experiencing issues with the Flatpak build in CI environments:

1. Check the uploaded build logs artifact for detailed error information
2. Verify app ID consistency across desktop files, icons, and manifest
3. Ensure all required files are properly copied to the build directory
4. Review npm/Node.js paths and environment variables in the workflow

### Local Development

For local development and building:

```bash
# Install dependencies
npm install

# Run the app during development
npm start

# Build AppImage locally
npm run build

# Build Flatpak locally (works better than in CI)
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
