#!/bin/bash

echo "Remove all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "rm -rf ios/build..."
rm -rf ios/build

echo "Remove iOS Pods data..."
rm -rf ios/Pods/*

echo "Remove Podfile.lock..."
rm Podfile.lock

echo "Wipe iOS build artifacts"
rm -rf ios/build && (killall Xcode || true) && xcrun -k && cd ios && xcodebuild -alltargets clean && cd .. && rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache" && rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang.$(whoami)/ModuleCache" && rm -fr ~/Library/Developer/Xcode/DerivedData/ && rm -fr ~/Library/Caches/com.apple.dt.Xcode/

echo "Wipe system iOS Pods cache"
pod cache clean --all

echo "Wipe user iOS Pods cache"
rm -rf ~/.cocoapods
