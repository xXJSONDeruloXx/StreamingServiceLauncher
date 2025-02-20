#!/usr/bin/bash

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

APPNAME=$1

mkdir -p $HOME/Applications/streaming_scripts

# creates the script
cat << EOF > $HOME/Applications/streaming_scripts/$APPNAME.sh
#!/bin/bash
$HOME/.local/bin/streaming-service-launcher $APPNAME
EOF

# make script executable
chmod +x  $HOME/Applications/streaming_scripts/$APPNAME.sh

# Add to Steam game mode
steamos-add-to-steam $HOME/Applications/streaming_scripts/$APPNAME.sh
