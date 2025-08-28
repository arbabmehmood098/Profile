@echo off
echo.
echo ========================================
echo    AI DEVELOPER PORTFOLIO - QUICK START
echo ========================================
echo.
echo This script will help you set up your portfolio
echo for GitHub and Vercel deployment.
echo.

:menu
echo Choose an option:
echo 1. Initialize Git Repository
echo 2. Push to GitHub
echo 3. Install Dependencies
echo 4. Run Locally
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto init
if "%choice%"=="2" goto push
if "%choice%"=="3" goto install
if "%choice%"=="4" goto run
if "%choice%"=="5" goto exit
goto menu

:init
echo.
echo ========================================
echo    INITIALIZING GIT REPOSITORY
echo ========================================
echo.
echo Please enter your GitHub username:
set /p username="GitHub Username: "
echo.
echo Initializing Git repository...
git init
git add .
git commit -m "Initial commit: AI Developer Portfolio with WhatsApp integration"
git remote add origin https://github.com/%username%/ai-developer-portfolio.git
git branch -M main
echo.
echo Git repository initialized successfully!
echo Next: Create repository on GitHub and run option 2
echo.
pause
goto menu

:push
echo.
echo ========================================
echo    PUSHING TO GITHUB
echo ========================================
echo.
echo Pushing code to GitHub...
git push -u origin main
echo.
echo Code pushed successfully!
echo Next: Deploy on Vercel
echo.
pause
goto menu

:install
echo.
echo ========================================
echo    INSTALLING DEPENDENCIES
echo ========================================
echo.
echo Installing Node.js dependencies...
npm install
echo.
echo Dependencies installed successfully!
echo.
pause
goto menu

:run
echo.
echo ========================================
echo    RUNNING LOCALLY
echo ========================================
echo.
echo Starting local development server...
echo Your portfolio will open at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
goto menu

:exit
echo.
echo Thank you for using AI Developer Portfolio!
echo.
echo Next steps:
echo 1. Create GitHub repository
echo 2. Deploy on Vercel
echo 3. Customize your portfolio
echo.
echo Good luck with your portfolio!
echo.
pause
exit
