#!/bin/bash
echo "=> build demo"
rm   -rf ./dist/app
node ./bin/weweb demo_fs
cp -R  "./dist/app.zip" "../ios/HeraDemo/demoapp.zip"  
cp -R "./dist/app.zip" "../android/sample/src/main/assets/demoapp.zip" 
