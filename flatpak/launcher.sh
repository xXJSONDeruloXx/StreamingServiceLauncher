#!/bin/bash
ELECTRON_ARGS=""

# Set up error handling and debugging
set -e
set -o pipefail

# Extract appname parameter if provided
for arg in "$@"; do
  if [[ $arg == --appname=* ]]; then
    APPNAME="${arg#*=}"
    ELECTRON_ARGS="$ELECTRON_ARGS $arg"
  fi
done

# Define paths
APP_DIR="/app"
BIN_DIR="$APP_DIR/bin"
NODE_MODULES_DIR="$APP_DIR/node_modules"

# Safety checks with better error messages
echo "Starting launcher script..."
echo "Checking for $BIN_DIR directory..."
if [ ! -d "$BIN_DIR" ]; then
  echo "Error: $BIN_DIR directory not found!" >&2
  echo "Current directory: $(pwd)" >&2
  echo "Directory contents: $(ls -la /app)" >&2
  exit 1
fi

echo "Checking for electron in $NODE_MODULES_DIR..."
if [ ! -d "$NODE_MODULES_DIR" ]; then
  echo "Error: $NODE_MODULES_DIR directory not found!" >&2
  echo "Looking for alternative electron installations..." >&2
  
  # Try to find electron binary
  ELECTRON_BIN=$(which electron 2>/dev/null || echo "")
  
  if [ -n "$ELECTRON_BIN" ]; then
    echo "Found system electron at $ELECTRON_BIN" >&2
  else
    echo "No electron installation found. Cannot continue." >&2
    exit 1
  fi
fi

# Set additional Electron flags for container environments
EXTRA_FLAGS="--no-sandbox --disable-gpu-sandbox --disable-setuid-sandbox"
echo "Using extra flags: $EXTRA_FLAGS"

# Find electron executable
if [ -x "$NODE_MODULES_DIR/.bin/electron" ]; then
  ELECTRON="$NODE_MODULES_DIR/.bin/electron"
elif [ -n "$ELECTRON_BIN" ]; then
  ELECTRON="$ELECTRON_BIN"
else
  echo "Error: Cannot find electron executable!" >&2
  exit 1
fi

echo "Using electron: $ELECTRON"

# Change to app directory
cd "$BIN_DIR" || { echo "Error: Failed to change directory to $BIN_DIR" >&2; exit 1; }

# Run electron with appropriate arguments
if [ -n "$APPNAME" ]; then
  # If appname is provided, pass it through
  echo "Launching with appname=$APPNAME"
  "$ELECTRON" . $ELECTRON_ARGS $EXTRA_FLAGS
else 
  # If no appname is provided, launch the selection UI
  echo "Launching selection UI"
  "$ELECTRON" . $EXTRA_FLAGS
fi
