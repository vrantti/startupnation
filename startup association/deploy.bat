@echo off
echo ========================================
echo   Startup Nation - Deployment Script
echo ========================================
echo.

:menu
echo Choose deployment option:
echo 1. Vercel (Recommended - Free)
echo 2. Netlify (Free)
echo 3. Firebase (Free)
echo 4. GitHub Pages (Free)
echo 5. Local Preview
echo 6. Build for Production
echo 7. Exit
echo.
set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto firebase
if "%choice%"=="4" goto github
if "%choice%"=="5" goto local
if "%choice%"=="6" goto build
if "%choice%"=="7" goto exit
goto menu

:vercel
echo.
echo Deploying to Vercel...
echo.
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
echo.
echo Building project...
npm run build
echo.
echo Deploying to Vercel...
npx vercel --prod
echo.
echo ✅ Deployed to Vercel!
echo Your site will be available at: https://your-project.vercel.app
pause
goto menu

:netlify
echo.
echo Deploying to Netlify...
echo.
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
echo.
echo Building project...
npm run build
echo.
echo Deploying to Netlify...
npx netlify deploy --prod --dir .
echo.
echo ✅ Deployed to Netlify!
echo Your site will be available at: https://your-site.netlify.app
pause
goto menu

:firebase
echo.
echo Deploying to Firebase...
echo.
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
echo.
echo Building project...
npm run build
echo.
echo Deploying to Firebase...
npx firebase deploy
echo.
echo ✅ Deployed to Firebase!
echo Your site will be available at: https://your-project.firebaseapp.com
pause
goto menu

:github
echo.
echo Deploying to GitHub Pages...
echo.
echo 1. First, create a new repository on GitHub
echo 2. Upload all files to the repository
echo 3. Go to Settings > Pages
echo 4. Select source: Deploy from a branch
echo 5. Choose main branch
echo 6. Your site will be available at: https://username.github.io/repository-name
echo.
echo For automatic deployment, use GitHub Actions with the provided workflow.
pause
goto menu

:local
echo.
echo Starting local preview...
echo.
echo Opening launcher at: http://localhost:8000/launch.html
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
pause
goto menu

:build
echo.
echo Building for production...
echo.
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)
echo.
echo Minifying CSS and JS...
npm run minify
echo.
echo Optimizing images...
npm run optimize
echo.
echo Generating sitemap...
npm run generate:sitemap
echo.
echo ✅ Production build complete!
echo Files are ready in the current directory.
echo.
pause
goto menu

:exit
echo.
echo Thank you for using Startup Nation deployment script!
echo.
pause
exit
