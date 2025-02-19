#!/usr/bin/bash

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

APP=StreamingServiceLauncher
RELEASE_URL=https://api.github.com/repos/aarron-lee/$APP/releases/latest

APPIMAGE_PATH=$HOME/Applications/$APP.AppImage
LAUNCHER_PATH=$HOME/.local/bin/streaming-service-launcher

# make dirs if non-existent
mkdir -p $HOME/.local/bin
mkdir -p $HOME/Applications

# remove old versions
rm -f $HOME/.local/bin/StreamingServiceLauncher.AppImage
rm -f $APPIMAGE_PATH
rm -f $LAUNCHER_PATH

echo "Downloading $APP AppImage"

# curl -L $(curl -s $RELEASE_URL | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/.local/bin/$APP.AppImage
wget \
    $(curl -s $RELEASE_URL | \
    jq -r ".assets[] | select(.name | test(\".*AppImage\")) | .browser_download_url") \
    -O $APPIMAGE_PATH

cat << EOF > $LAUNCHER_PATH
#!/bin/bash
$APPIMAGE_PATH --appname=\$1 --no-sandbox
EOF

chmod +x $APPIMAGE_PATH
chmod +x $LAUNCHER_PATH

IMAGE_INFO="/usr/share/ublue-os/image-info.json"

if [ -f "$IMAGE_INFO" ]; then
    echo "Ublue image detected"
    # handle for SE Linux
    sudo chcon -u system_u -r object_r --type=bin_t $APPIMAGE_PATH
    sudo chcon -u system_u -r object_r --type=bin_t  $LAUNCHER_PATH
fi

echo "Installation complete"
