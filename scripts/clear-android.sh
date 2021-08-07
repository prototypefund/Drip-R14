#!/bin/bash

echo "Clean android project"
cd android && ./gradlew clean && ..

echo "rm -rf android/app/build..."
rm -rf android/app/build
