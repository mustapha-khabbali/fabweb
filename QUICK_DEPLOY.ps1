# Fab Lab One-Click Deploy Script
# Run this file by right-clicking it and selecting 'Run with PowerShell'

Write-Host "--- Starting Fab Lab Deployment ---" -ForegroundColor Cyan

# 1. Set Execution Policy for this session
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# 2. Check if Firebase CLI is installed, if not install it
if (!(Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Host "Error: NodeJS/NPM is not installed. Please install NodeJS first." -ForegroundColor Red
    pause
    exit
}

# 3. Trigger Login
Write-Host "Please log in to Firebase in the browser window that opens..." -ForegroundColor Yellow
npx firebase-tools login

# 4. Deploy to both sites
Write-Host "Deploying to fablab-bmk and fablab-cmc..." -ForegroundColor Green
npx firebase-tools deploy --project fablab-bmk

Write-Host "--- Deployment Complete! ---" -ForegroundColor Cyan
Write-Host "Visitor App: https://fablab-bmk.web.app"
Write-Host "Admin Dashboard: https://fablab-cmc.web.app"
pause
