@echo off
echo ========================================
echo    DEMO REBOOT CLOUD DEPLOYMENT
echo ========================================
echo.

echo This script will help you deploy to Railway for 24/7 operation.
echo.

echo [1/4] Checking git setup...

REM Check if git is initialized and has remote
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Git not initialized or no remote found.
    echo.
    echo Setting up git repository...
    git init
    git add .
    git commit -m "Initial commit - Demo Reboot Backend"
    echo.
    echo Please set up GitHub repository:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named 'startupnation'
    echo 3. Copy the repository URL
    echo 4. Run: git remote add origin YOUR_GITHUB_URL
    echo 5. Run: git push -u origin main
    echo 6. Come back and run this script again
    pause
    exit /b 1
)

echo ✓ Git repository ready with remote

REM Check if there are uncommitted changes
git diff --quiet
if %errorlevel% neq 0 (
    echo Uncommitted changes found. Committing...
    git add .
    git commit -m "Update for cloud deployment"
)

echo ✓ Code is up to date

echo.
echo [2/4] Preparing cloud deployment files...

REM Copy cloud-ready files
copy "backend\server-cloud.js" "backend\server.js" >nul
copy "backend\package-cloud.json" "backend\package.json" >nul

echo ✓ Cloud deployment files prepared

echo.
echo [3/4] Committing cloud-ready files...
git add .
git commit -m "Cloud deployment ready" >nul
git push >nul

echo ✓ Cloud-ready files pushed to GitHub

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
echo 1. Run update-urls.bat and enter your Railway URL
echo 2. Test registration from any device/browser
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