@echo off
echo ========================================
echo    DEMO REBOOT CLOUD DEPLOYMENT
echo ========================================
echo.

echo This script will help you deploy to Railway for 24/7 operation.
echo.

echo [1/4] Checking if you have a GitHub account...
echo Do you have a GitHub account? (y/n)
set /p github_choice="Enter choice: "

if /i "%github_choice%" neq "y" (
    echo.
    echo Please create a GitHub account first:
    echo 1. Go to https://github.com/
    echo 2. Sign up for free
    echo 3. Come back and run this script again
    pause
    exit /b 1
)

echo.
echo [2/4] Checking if code is pushed to GitHub...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Git not initialized. Initializing...
    git init
    git add .
    git commit -m "Initial commit - Demo Reboot Backend"
    echo.
    echo Please push to GitHub:
    echo 1. Create a new repository on GitHub
    echo 2. Run: git remote add origin YOUR_GITHUB_URL
    echo 3. Run: git push -u origin main
    echo 4. Come back and run this script again
    pause
    exit /b 1
)

echo ✓ Git repository ready

echo.
echo [3/4] Preparing cloud deployment files...

REM Copy cloud-ready files
copy "backend\server-cloud.js" "backend\server.js" >nul
copy "backend\package-cloud.json" "backend\package.json" >nul

echo ✓ Cloud deployment files prepared

echo.
echo [4/4] Opening Railway deployment...
echo.
echo ========================================
echo    DEPLOYMENT INSTRUCTIONS
echo ========================================
echo.
echo 1. Go to https://railway.app/
echo 2. Sign up with your GitHub account
echo 3. Click "Deploy from GitHub repo"
echo 4. Select your startupnation repository
echo 5. Railway will auto-detect Node.js and deploy
echo 6. Wait for deployment to complete
echo 7. Copy your Railway URL (e.g., https://your-app.railway.app)
echo.
echo After deployment:
echo 1. Update demo-reboot.html - replace localhost:3001 with your Railway URL
echo 2. Update admin-registrations.html - replace localhost:3001 with your Railway URL
echo 3. Test registration from any device/browser
echo.
echo Your backend will now work 24/7 even when your computer is off!
echo.

start https://railway.app/

echo.
echo Press any key when you've completed the Railway deployment...
pause >nul

echo.
echo ========================================
echo    NEXT STEPS
echo ========================================
echo.
echo 1. Get your Railway URL from the Railway dashboard
echo 2. Run the update-urls.bat script to update your frontend
echo 3. Test the registration system
echo.
echo Your Demo Reboot registration system is now live 24/7!
echo.
pause
