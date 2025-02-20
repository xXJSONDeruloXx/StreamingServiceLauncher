#!/usr/bin/bash

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

mkdir -p $HOME/.local/share/applications

APPNAME=$1
LAUNCHER_PATH=$HOME/.local/bin/streaming-service-launcher
DESKTOP_ENTRY_PATH=$HOME/.local/share/applications/streamingservicelauncher-$APPNAME.desktop

cat << EOF > $DESKTOP_ENTRY_PATH
[Desktop Entry]
Name=$APPNAME (StreamingServiceLauncher)
Exec=$LAUNCHER_PATH --appname=$APPNAME
TryExec=$LAUNCHER_PATH
Terminal=false
Type=Application

StartupWMClass=StreamingServiceLauncher
Comment=$APPNAME (StreamingServiceLauncher)
Categories=Utility;
EOF

cat $DESKTOP_ENTRY_PATH

echo "Desktop entry added to $DESKTOP_ENTRY_PATH"
