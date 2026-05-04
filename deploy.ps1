#!/usr/bin/env pwsh
#
# Mammoth Coatings - GitHub & Vercel Deployment Script
# Usage: .\deploy.ps1
#

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║              🦣 MAMMOTH COATINGS - DEPLOYMENT AUTOMATION 🦣 ║" -ForegroundColor Cyan
Write-Host "║                      Deploying to mammothcoat.com                         ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify prerequisites
Write-Host "[STEP 1] Checking prerequisites..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>$null
    Write-Host "✓ Git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = npm --version 2>$null
    Write-Host "✓ npm: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Verify project structure
Write-Host "[STEP 2] Verifying project structure..." -ForegroundColor Yellow
if (-not (Test-Path "package.json")) {
    Write-Host "✗ ERROR: package.json not found. Run this script from the project root." -ForegroundColor Red
    exit 1
}
if (-not (Test-Path "src/app/page.tsx")) {
    Write-Host "✗ ERROR: Invalid project structure. Verify you're in the correct directory." -ForegroundColor Red
    exit 1
}
Write-Host "✓ Project structure verified" -ForegroundColor Green
Write-Host ""

# Step 3: Check git status
Write-Host "[STEP 3] Checking git repository..." -ForegroundColor Yellow
$gitRemote = git remote -v 2>$null | Select-String "origin" | Select-Object -First 1
if ($null -eq $gitRemote) {
    Write-Host "⚠ No remote 'origin' found yet (will set up in next step)" -ForegroundColor Yellow
} else {
    Write-Host "✓ Git remote found: $gitRemote" -ForegroundColor Green
}
Write-Host ""

# Step 4: GitHub setup
Write-Host "[STEP 4] GitHub Repository Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "Before deploying to Vercel, you need to push this code to GitHub." -ForegroundColor White
Write-Host ""
Write-Host "Follow these steps:" -ForegroundColor Cyan
Write-Host "  1. Go to https://github.com/new" -ForegroundColor White
Write-Host "  2. Repository name: mammoth-coatings" -ForegroundColor White
Write-Host "  3. Do NOT initialize with any files" -ForegroundColor White
Write-Host "  4. Click 'Create repository'" -ForegroundColor White
Write-Host "  5. Copy the HTTPS URL (example: https://github.com/yourname/mammoth-coatings.git)" -ForegroundColor White
Write-Host ""

$continueSetup = Read-Host "Have you created the GitHub repo? (yes/no)"

if ($continueSetup -eq "yes" -or $continueSetup -eq "y") {
    Write-Host ""
    $githubRepoUrl = Read-Host "Paste your GitHub repository URL"
    
    if ([string]::IsNullOrEmpty($githubRepoUrl)) {
        Write-Host "✗ Repository URL cannot be empty" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "[STEP 5] Pushing code to GitHub..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        # Set main branch
        git branch -M main 2>$null
        Write-Host "✓ Branch set to 'main'" -ForegroundColor Green
        
        # Add remote
        git remote add origin $githubRepoUrl 2>$null
        Write-Host "✓ Remote 'origin' configured" -ForegroundColor Green
        
        # Push to GitHub
        Write-Host "Pushing code..." -ForegroundColor Gray
        git push -u origin main
        
        Write-Host ""
        Write-Host "✓ Code successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        
        # Next steps
        Write-Host "[STEP 6] Deploy to Vercel" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Next steps to deploy on Vercel:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  1. Go to https://vercel.com" -ForegroundColor White
        Write-Host "  2. Click '+ New Project'" -ForegroundColor White
        Write-Host "  3. Click 'Import Git Repository'" -ForegroundColor White
        Write-Host "  4. Paste your GitHub URL: $githubRepoUrl" -ForegroundColor White
        Write-Host "  5. Click 'Continue' then 'Deploy'" -ForegroundColor White
        Write-Host "  6. Wait 2-3 minutes for build to complete" -ForegroundColor White
        Write-Host ""
        Write-Host "  7. Once deployed, go to Settings > Domains" -ForegroundColor White
        Write-Host "  8. Add custom domain: mammothcoat.com" -ForegroundColor White
        Write-Host "  9. Either:" -ForegroundColor White
        Write-Host "     a) Use Vercel's nameservers (point your domain registrar to them)" -ForegroundColor White
        Write-Host "     b) Or add DNS records manually at your registrar" -ForegroundColor White
        Write-Host ""
        Write-Host "  10. Wait 5-30 minutes for DNS to propagate" -ForegroundColor White
        Write-Host "  11. Visit https://mammothcoat.com 🚀" -ForegroundColor White
        Write-Host ""
        
    } catch {
        Write-Host "✗ ERROR: Failed to push to GitHub" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host ""
        Write-Host "Troubleshooting:" -ForegroundColor Yellow
        Write-Host "  • Verify your GitHub URL is correct" -ForegroundColor White
        Write-Host "  • Check your GitHub credentials/token" -ForegroundColor White
        Write-Host "  • Ensure the repository exists and is empty" -ForegroundColor White
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "Skipped GitHub setup. You can push manually later:" -ForegroundColor Yellow
    Write-Host "  git remote add origin [YOUR_GITHUB_URL]" -ForegroundColor Gray
    Write-Host "  git push -u origin main" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "                        ✓ SETUP COMPLETE" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see: DEPLOYMENT.md" -ForegroundColor White
Write-Host "For quick reference, see: LAUNCH.md" -ForegroundColor White
Write-Host ""
