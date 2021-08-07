#!/bin/bash

COL_PINK="\x1b[35;01m"
COL_RESET="\x1b[39;49;00m"

echo  $COL_PINK"Your current TMPDIR variable points here: "$COL_RESET$TMPDIR$COL_PINK"\nIf path is not correct, please make sure you fix it before running the script, to make sure all caches are cleared. Is path to tmp folder correct and you would like to continue running clear script(y/n)?"$COL_RESET
read tmp

if [ $tmp == "n" ];
then
  exit
fi

echo $COL_PINK"Do you want to clear ios project(y/n)?"$COL_RESET
read ios

echo $COL_PINK"Do you want to clear android project(y/n)?"$COL_RESET
read android

echo $COL_PINK"Do you want to clear general cache(y/n)?"$COL_RESET
read cache

echo $COL_PINK"Do you want to re-install project libraries?"$COL_RESET
read libraries

if [ $ios == "y" ];
then
echo $COL_PINK"Start clearing ios cache..."$COL_RESET
. scripts/clear-ios.sh
echo $COL_PINK"Done!"$COL_RESET
fi

if [ $android == "y" ];
then
echo $COL_PINK"Start clearing android cache..."$COL_RESET
. scripts/clear-android.sh
echo $COL_PINK"Done!"$COL_RESET
fi

if [ $cache == "y" ];
then
echo $COL_PINK"Start clearing general cache..."$COL_RESET

echo "watchman watch-del-all..."
watchman watch-del-all

echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/haste-map-react-native-packager-*..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "rm -rf $TMPDIR/metro-*..."
rm -rf $TMPDIR/metro-*

echo $COL_PINK"Done!"$COL_RESET
fi

if [ $cache == "y" ];
then
echo $COL_PINK"Start re-installing dependencies..."$COL_RESET

echo "rm -rf node_modules..."
rm -rf node_modules

echo "Verify npm cache"
npm cache verify

echo "npm install..."
npm install

echo "Pods install..."
cd ios && pod install && cd ..

echo $COL_PINK"Done!"$COL_RESET
fi

echo $COL_PINK"Clearing is completed. You're ready to go!"$COL_RESET
