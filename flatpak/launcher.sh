#!/bin/bash
ELECTRON_ARGS=""

# Extract appname parameter if provided
for arg in "$@"; do
  if [[ $arg == --appname=* ]]; then
    APPNAME="${arg#*=}"
    ELECTRON_ARGS="$ELECTRON_ARGS $arg"
  fi
done

# Safety checks
if [ ! -d /app/bin ]; then
  echo "Error: /app/bin directory not found!" >&2
  exit 1
fi

if [ ! -d /app/node_modules ]; then
  echo "Error: Electron not installed correctly!" >&2
  exit 1
fi

# Set additional Electron flags for container environments
EXTRA_FLAGS="--no-sandbox --disable-gpu-sandbox --disable-setuid-sandbox"

if [ -n "$APPNAME" ]; then
  # If appname is provided, pass it through
  cd /app/bin && /app/node_modules/.bin/electron . $ELECTRON_ARGS $EXTRA_FLAGS
else 
  # If no appname is provided, launch the selection UI
  cd /app/bin && /app/node_modules/.bin/electron . $EXTRA_FLAGS
fi
