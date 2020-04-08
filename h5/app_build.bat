@echo off
echo "=> Building app: demo_fs"
del .\dist\app\* /q /f /s 
call node ./bin/weweb demo_fs
copy ".\dist\app.zip" "../ios/HeraDemo/demoapp.zip"  /y
copy ".\dist\app.zip" "../android/sample/src/main/assets/demoapp.zip"  /y
