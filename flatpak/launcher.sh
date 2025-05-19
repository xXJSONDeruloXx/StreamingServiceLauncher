#!/bin/bash
ELECTRON_ARGS=""

# Extract appname parameter if provided
for arg in "$@"; do
  if [[ $arg == --appname=* ]]; then
    APPNAME="${arg#*=}"
    ELECTRON_ARGS="$ELECTRON_ARGS $arg"
  fi
done

if [ -n "$APPNAME" ]; then
  # If appname is provided, pass it through
  cd /app/bin && node_modules/.bin/electron . $ELECTRON_ARGS --no-sandbox
else 
  # If no appname is provided, launch the selection UI
  cd /app/bin && node_modules/.bin/electron . --no-sandbox
fi
