@echo off
echo "=> Building app: demo"
del .\dist\app\* /q /f /s 
call node ./bin/weweb demo
copy ".\dist\app.zip" "../ios/HeraDemo/demoapp.zip"  /y
copy ".\dist\app.zip" "../android/sample/src/main/assets/demoapp.zip"  /y
