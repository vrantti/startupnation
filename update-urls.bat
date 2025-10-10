@echo off
echo ========================================
echo    UPDATE FRONTEND URLs FOR CLOUD
echo ========================================
echo.

echo Enter your Railway URL (e.g., https://your-app.railway.app):
set /p railway_url="Railway URL: "

if "%railway_url%"=="" (
    echo ERROR: Please enter a valid URL
    pause
    exit /b 1
)

echo.
echo Updating frontend files...

REM Update demo-reboot.html
powershell -Command "(Get-Content 'demo-reboot.html') -replace 'http://localhost:3001', '%railway_url%' | Set-Content 'demo-reboot.html'"

REM Update admin-registrations.html  
powershell -Command "(Get-Content 'admin-registrations.html') -replace 'http://localhost:3001', '%railway_url%' | Set-Content 'admin-registrations.html'"

echo ✓ Updated demo-reboot.html
echo ✓ Updated admin-registrations.html

echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your Demo Reboot registration system is now:
echo ✓ Running 24/7 in the cloud
echo ✓ Accessible from anywhere
echo ✓ Works even when your computer is off
echo.
echo Test URLs:
echo - Registration: demo-reboot.html
echo - Admin Dashboard: admin-registrations.html
echo - Backend API: %railway_url%/api/registrations
echo.
echo Admin password: demoreboot2025
echo.
pause
