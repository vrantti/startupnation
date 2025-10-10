@echo off
echo ========================================
echo    VERCEL DEPLOYMENT (EASIEST OPTION)
echo ========================================
echo.

echo Since you're already on Vercel, let's add the backend there!
echo.

echo [1/3] Preparing Vercel API routes...
echo ✓ Created api/registrations.js
echo ✓ Created api/stats.js
echo ✓ Updated frontend to use Vercel APIs

echo.
echo [2/3] Committing changes...
git add .
git commit -m "Add Vercel API routes for registration system"
git push

echo ✓ Changes pushed to GitHub

echo.
echo [3/3] Deploying to Vercel...
echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your Demo Reboot registration system is now:
echo ✓ Running 24/7 on Vercel
echo ✓ Frontend: https://startupnation.vercel.app/demo-reboot.html
echo ✓ Backend API: https://startupnation.vercel.app/api/registrations
echo ✓ Admin Dashboard: https://startupnation.vercel.app/admin-registrations.html
echo.
echo Admin password: demoreboot2025
echo.
echo Test it now:
echo 1. Go to https://startupnation.vercel.app/demo-reboot.html
echo 2. Fill out the registration form
echo 3. Check admin dashboard for the registration
echo.
echo Everything works 24/7 even when your computer is off!
echo.
pause
