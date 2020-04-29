@echo off
echo "=> Building app: %1"
del .\dist\%1\* /q /f /s 
call node ./bin/weweb %1 -d dist/%1
copy ".\dist\%1.zip" "../ios/HeraDemo/%1.zip"  /y
copy ".\dist\%1.zip" "../android/sample/src/main/assets/%1.zip"  /y
call adb shell mkdir -p  sdcard/facishare/hera
call adb push dist\%1.zip sdcard/facishare/hera