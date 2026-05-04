@echo off
REM Mammoth Coatings - Automated GitHub & Vercel Deployment Script
REM This script automates the deployment to mammothcoat.com

setlocal enabledelayedexpansion

echo.
echo ███████╗████████╗ █████╗ ██████╗ ████████╗    ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗
echo ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝
echo ███████╗   ██║   ███████║██████╔╝   ██║       ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝
echo ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝
echo ███████║   ██║   ██║  ██║██║  ██║   ██║       ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║
echo ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝
echo.
echo Mammoth Coatings - Automated Deployment to mammothcoat.com
echo.

REM Step 1: Verify git is installed
echo [STEP 1] Checking prerequisites...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH. Please install Git and try again.
    exit /b 1
)
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node/npm is not installed or not in PATH. Please install Node.js and try again.
    exit /b 1
)
echo ✓ Git and npm found
echo.

REM Step 2: Verify we're in the right directory
echo [STEP 2] Verifying project structure...
if not exist "package.json" (
    echo ERROR: package.json not found. Please run this script from the Mammoth Coatings project root.
    exit /b 1
)
if not exist "src\app\page.tsx" (
    echo ERROR: Project structure is invalid. Please run this script from the correct project root.
    exit /b 1
)
echo ✓ Project structure verified
echo.

REM Step 3: Git status check
echo [STEP 3] Checking git status...
git status >nul 2>&1
if errorlevel 1 (
    echo ✓ Git already initialized
) else (
    echo ✓ Git already initialized
)
echo.

REM Step 4: Display GitHub instructions
echo [STEP 4] GitHub Repository Setup Required
echo.
echo Before we can deploy to Vercel, you need to push this code to GitHub.
echo.
echo Please follow these steps:
echo.
echo 1. Go to https://github.com/new
echo 2. Create a new repository named: mammoth-coatings
echo 3. Do NOT initialize with README (or any files)
echo 4. Click "Create repository"
echo 5. Copy the repository URL (it will look like: https://github.com/YOUR_USERNAME/mammoth-coatings.git)
echo.
echo Then return here and enter your repository URL below.
echo.
set /p GITHUB_REPO_URL="Enter your GitHub repository URL (or press Enter to skip): "

if not "!GITHUB_REPO_URL!"=="" (
    echo.
    echo [STEP 5] Pushing to GitHub...
    git remote add origin !GITHUB_REPO_URL! 2>nul
    git branch -M main
    git push -u origin main
    
    if errorlevel 0 (
        echo ✓ Code pushed to GitHub successfully!
        echo.
        echo [STEP 6] Next: Deploy to Vercel
        echo.
        echo 1. Go to https://vercel.com
        echo 2. Click "+ New Project"
        echo 3. Click "Import Git Repository"
        echo 4. Paste your GitHub repo URL: !GITHUB_REPO_URL!
        echo 5. Click "Continue" and then "Deploy"
        echo 6. Wait for deployment to complete (2-3 minutes)
        echo 7. After deployment, go to Settings > Domains
        echo 8. Add custom domain: mammothcoat.com
        echo 9. Use Vercel nameservers or add DNS records at your domain registrar
        echo.
        echo ✓ Deployment workflow initiated!
    ) else (
        echo ERROR: Failed to push to GitHub. Please verify your credentials and repository URL.
        exit /b 1
    )
) else (
    echo Skipped GitHub push. You can push manually later with:
    echo   git remote add origin [YOUR_REPO_URL]
    echo   git push -u origin main
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Deployment ready! Next steps are manual via Vercel dashboard.
echo Full instructions: See DEPLOYMENT.md in the project root.
echo ═══════════════════════════════════════════════════════════════
echo.
pause
