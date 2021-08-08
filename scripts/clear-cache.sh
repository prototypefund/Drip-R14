#!/bin/bash

echo "\x1b[35;01m""Start clearing general cache...""\x1b[39;49;00m"

echo "watchman watch-del-all..."
watchman watch-del-all

echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/haste-map-react-native-packager-*..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "rm -rf $TMPDIR/metro-*..."
rm -rf $TMPDIR/metro-*

echo "\x1b[35;01m""Done!""\x1b[39;49;00m"
