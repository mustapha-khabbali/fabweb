@echo off
echo --- Starting Fab Lab Deployment ---
echo.

:: 1. Check if Firebase is already installed
where firebase >nul 2>nul
if %errorlevel% neq 0 (
    echo 1. Firebase CLI not found. Installing tools (this may take a minute)...
    call npm install -g firebase-tools
) else (
    echo 1. Firebase CLI is already installed. Skipping install...
)

:: 2. Login check
echo.
echo 2. Logging in to Firebase (A browser window will open if needed)...
call firebase login
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Firebase login failed.
    echo Please ensure you complete the browser authentication.
    pause
    exit /b %errorlevel%
)

:: 3. Deploy
echo.
echo 3. Deploying to targets (fablab-bmk and fablab-cmc)...
:: We deploy all hosting targets to the project fablab-bmk
call npx firebase deploy --only hosting --project fablab-bmk
if %errorlevel% neq 0 (
    echo.
    echo ---------------------------------------------------------
    echo ERROR: Firebase deployment failed!
    echo.
    echo Possible causes:
    echo 1. You are not logged in (run: firebase login)
    echo 2. Site "fablab-cmc" was not added to "fablab-bmk" project.
    echo.
    echo FIX: Go to https://console.firebase.google.com/
    echo Select project "fablab-bmk" -> Hosting
    echo Click "Add another site" and name it "fablab-cmc"
    echo ---------------------------------------------------------
    pause
    exit /b %errorlevel%
)

echo.
echo --- Deployment Complete! ---
echo Visitor App: https://fablab-bmk.web.app
echo Admin Dashboard: https://fablab-cmc.web.app
echo.
echo Note: If urls are not active, double check site names in console.
pause
