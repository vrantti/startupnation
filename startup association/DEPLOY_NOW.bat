@echo off
echo ========================================
echo   🚀 STARTUP NATION - INSTANT DEPLOY
echo ========================================
echo.
echo Choose your FREE hosting option:
echo.
echo 1. Netlify (Easiest - Drag & Drop)
echo 2. Vercel (Fastest - Command Line)
echo 3. GitHub Pages (Free with GitHub)
echo 4. Firebase (Google's Platform)
echo 5. Open Quick Deploy Guide
echo 6. Exit
echo.

:menu
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto github
if "%choice%"=="4" goto firebase
if "%choice%"=="5" goto guide
if "%choice%"=="6" goto exit
goto menu

:netlify
echo.
echo 🎯 NETLIFY DEPLOYMENT (Easiest Method)
echo ======================================
echo.
echo 1. Go to: https://netlify.com
echo 2. Drag your entire project folder to the deploy area
echo 3. Wait 30 seconds
echo 4. Get your URL: https://random-name.netlify.app
echo.
echo ✅ No account needed for first deploy!
echo ✅ Completely free forever!
echo.
pause
goto menu

:vercel
echo.
echo ⚡ VERCEL DEPLOYMENT (Fastest Method)
echo ====================================
echo.
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org
    echo 2. Download and install the LTS version
    echo 3. Restart this script
    echo.
    pause
    goto menu
)

echo ✅ Node.js found!
echo.
echo Installing Vercel CLI...
call npm i -g vercel
echo.
echo Deploying to Vercel...
call vercel --prod
echo.
echo ✅ Deployed! Check the URL above.
echo.
pause
goto menu

:github
echo.
echo 📚 GITHUB PAGES DEPLOYMENT
echo ==========================
echo.
echo 1. Create account at: https://github.com
echo 2. Create new repository
echo 3. Upload all files to repository
echo 4. Go to Settings ^> Pages
echo 5. Select "Deploy from a branch"
echo 6. Choose "main" branch
echo 7. Get URL: https://username.github.io/repository-name
echo.
echo ✅ Free forever with GitHub account!
echo.
pause
goto menu

:firebase
echo.
echo 🔥 FIREBASE DEPLOYMENT
echo ======================
echo.
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org
    echo 2. Download and install the LTS version
    echo 3. Restart this script
    echo.
    pause
    goto menu
)

echo ✅ Node.js found!
echo.
echo Installing Firebase CLI...
call npm i -g firebase-tools
echo.
echo Login to Firebase...
call firebase login
echo.
echo Initializing Firebase project...
call firebase init hosting
echo.
echo Deploying to Firebase...
call firebase deploy
echo.
echo ✅ Deployed! Check the URL above.
echo.
pause
goto menu

:guide
echo.
echo 📖 Opening Quick Deploy Guide...
start QUICK_DEPLOY.html
echo.
echo The guide will open in your browser with step-by-step instructions.
echo.
pause
goto menu

:exit
echo.
echo Thank you for using Startup Nation deployment!
echo.
echo Your website is ready to go live! 🚀
echo.
pause
exit
