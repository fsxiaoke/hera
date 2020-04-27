#!/bin/bash
echo "=> build framework"
npm run build:dev 
node ./bin/weweb -b   
cp  -R "./dist/framework.zip" "../ios/Hera/Resources/HeraRes.bundle/framework.zip" 
cp  -R "./dist/framework.zip" "../ios/HeraDemo/HeraRes.bundle/framework.zip" 
cp  -R "./dist/framework.zip" "../android/hera/src/main/assets/framework.zip" 
