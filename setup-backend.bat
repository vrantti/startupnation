@echo off
echo ========================================
echo    DEMO REBOOT BACKEND SETUP SCRIPT
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: This script needs to run as Administrator!
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo [1/6] Checking system requirements...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js not found. Installing Node.js...
    echo Please wait while we download and install Node.js...
    
    REM Download Node.js installer
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'nodejs-installer.msi'"
    
    if exist "nodejs-installer.msi" (
        echo Installing Node.js...
        msiexec /i nodejs-installer.msi /quiet /norestart
        echo Waiting for installation to complete...
        timeout /t 30 /nobreak >nul
        
        REM Clean up installer
        del nodejs-installer.msi
        
        echo Node.js installation completed!
    ) else (
        echo ERROR: Failed to download Node.js installer
        echo Please install Node.js manually from https://nodejs.org/
        pause
        exit /b 1
    )
) else (
    echo ✓ Node.js is already installed
)

echo.
echo [2/6] Setting up backend directory...

REM Create backend directory if it doesn't exist
if not exist "backend" (
    mkdir backend
    echo ✓ Created backend directory
) else (
    echo ✓ Backend directory already exists
)

echo.
echo [3/6] Installing backend dependencies...

cd backend

REM Install dependencies
echo Installing npm packages...
npm install express cors --save
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo ✓ Dependencies installed successfully

echo.
echo [4/6] Creating startup scripts...

REM Create Windows service script
echo @echo off > start-service.bat
echo echo Starting Demo Reboot Backend Service... >> start-service.bat
echo cd /d "%~dp0" >> start-service.bat
echo node server.js >> start-service.bat
echo pause >> start-service.bat

REM Create auto-start script
echo @echo off > auto-start.bat
echo echo Auto-starting Demo Reboot Backend... >> auto-start.bat
echo cd /d "%~dp0" >> auto-start.bat
echo timeout /t 5 /nobreak ^>nul >> auto-start.bat
echo start "Demo Reboot Backend" /min node server.js >> auto-start.bat

echo ✓ Startup scripts created

echo.
echo [5/6] Setting up Windows startup...

REM Add to Windows startup
set "startupPath=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
copy "auto-start.bat" "%startupPath%\DemoRebootBackend.bat" >nul 2>&1

if %errorlevel% equ 0 (
    echo ✓ Added to Windows startup
) else (
    echo ⚠ Could not add to Windows startup (manual setup required)
)

echo.
echo [6/6] Starting backend server...

echo Starting Demo Reboot Backend...
echo.
echo Backend will be available at: http://localhost:3001
echo Admin dashboard: http://localhost:3001/admin-registrations.html
echo.
echo Press Ctrl+C to stop the server
echo.

start "Demo Reboot Backend" /min node server.js

echo.
echo ========================================
echo    SETUP COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo ✓ Node.js installed/verified
echo ✓ Backend dependencies installed
echo ✓ Startup scripts created
echo ✓ Added to Windows startup
echo ✓ Backend server started
echo.
echo The backend will now start automatically when you boot your computer.
echo.
echo To stop the backend: Close the "Demo Reboot Backend" window
echo To restart: Run start-service.bat
echo.
echo IMPORTANT: For 24/7 operation, consider cloud deployment!
echo See cloud-deployment-guide.md for options.
echo.
pause
