@echo off
call npm run build:dev 
call node ./bin/weweb -b   
copy ".\dist\framework.zip" "../ios/Hera/Resources/HeraRes.bundle/framework.zip"  /y
copy ".\dist\framework.zip" "../ios/HeraDemo/HeraRes.bundle/framework.zip" /y
copy  ".\dist\framework.zip" "..\android\hera\src\main\assets\framework.zip"   /y
call adb shell mkdir -p  sdcard/facishare/hera
call adb push dist\framework.zip sdcard/facishare/hera
