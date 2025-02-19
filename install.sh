#!/usr/bin/bash

APP=StreamingServiceLauncher
RELEASE_URL=https://api.github.com/repos/aarron-lee/$APP/releases/latest

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

mkdir -p $HOME/.local/bin

echo "Downloading $APP AppImage"

# curl -L $(curl -s $RELEASE_URL | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/.local/bin/$APP.AppImage
wget \
    $(curl -s $RELEASE_URL | \
    jq -r ".assets[] | select(.name | test(\".*AppImage\")) | .browser_download_url") \
    -O $HOME/.local/bin/StreamingServiceLauncher.AppImage


chmod +x $HOME/.local/bin/$APP.AppImage


echo "Installation complete"
