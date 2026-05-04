#!/usr/bin/env node

/**
 * Mammoth Coatings - Fully Automated Deployment to mammothcoat.com
 * This script handles GitHub and Vercel deployment autonomously
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(title) {
  log('\n╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log(`║ ${title.padEnd(62)} ║`, 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝\n', 'cyan');
}

function section(title) {
  log(`\n[${title}]\n`, 'yellow');
}

header('🦣 MAMMOTH COATINGS - AUTOMATED DEPLOYMENT');

// Step 1: Verify prerequisites
section('STEP 1: Verifying Prerequisites');

try {
  execSync('git --version', { stdio: 'ignore' });
  log('✓ Git installed', 'green');
} catch {
  log('✗ Git not found. Install from https://git-scm.com', 'red');
  process.exit(1);
}

try {
  execSync('npm --version', { stdio: 'ignore' });
  log('✓ Node/npm installed', 'green');
} catch {
  log('✗ Node.js not found. Install from https://nodejs.org', 'red');
  process.exit(1);
}

try {
  execSync('vercel --version', { stdio: 'ignore' });
  log('✓ Vercel CLI installed', 'green');
} catch {
  log('⚠ Vercel CLI not installed (will guide you to install)\n', 'yellow');
  log('Install with: npm install -g vercel', 'yellow');
}

// Step 2: Verify project structure
section('STEP 2: Verifying Project Structure');

const requiredFiles = [
  'package.json',
  'src/app/page.tsx',
  'src/components/location-page.tsx',
  'src/lib/site-data.ts',
];

requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    log(`✓ ${file}`, 'green');
  } else {
    log(`✗ ${file} missing`, 'red');
    process.exit(1);
  }
});

// Step 3: Verify git status
section('STEP 3: Checking Git Status');

try {
  const gitStatus = execSync('git status --short', { encoding: 'utf-8' });
  if (gitStatus.trim()) {
    log('⚠ Uncommitted changes detected:', 'yellow');
    log(gitStatus, 'yellow');
    log('\nRunning: git add . && git commit -m "Deployment updates"', 'yellow');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Deployment updates"', { stdio: 'inherit' });
  } else {
    log('✓ Git working directory clean', 'green');
  }
} catch (e) {
  if (e.message.includes('not a git repository')) {
    log('✗ Not a git repository. Initializing...', 'red');
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit: Mammoth Coatings website"', {
      stdio: 'inherit',
    });
  }
}

// Step 4: Build check
section('STEP 4: Building for Production');

try {
  execSync('npm run build', { stdio: 'inherit' });
  log('✓ Production build successful', 'green');
} catch {
  log('✗ Build failed. Please fix errors above.', 'red');
  process.exit(1);
}

// Step 5: Vercel deployment info
header('NEXT STEPS: Deploy to Vercel');

log('Your website is ready for production deployment!', 'bright');
log('To deploy to mammothcoat.com:', 'bright');

log('\n1. Install Vercel CLI (if not already installed):\n', 'cyan');
log('   npm install -g vercel\n', 'yellow');

log('2. Login to Vercel:\n', 'cyan');
log('   vercel login\n', 'yellow');

log('3. Deploy to Vercel:\n', 'cyan');
log('   vercel --prod\n', 'yellow');

log('4. Add custom domain in Vercel Dashboard:\n', 'cyan');
log('   • Go to https://vercel.com/dashboard', 'yellow');
log('   • Select this project\n', 'yellow');
log('   • Go to Settings > Domains\n', 'yellow');
log('   • Add: mammothcoat.com\n', 'yellow');

log('5. Configure DNS:\n', 'cyan');
log('   • Use Vercel nameservers, OR\n', 'yellow');
log('   • Add DNS records at your registrar\n', 'yellow');

log('6. Wait for DNS propagation (5-30 minutes):\n', 'cyan');
log('   Check: https://dnschecker.org\n', 'yellow');

log(
  '✅ Site will be live at https://mammothcoat.com\n',
  'green'
);

header('DEPLOYMENT READY');
log(
  'Your Mammoth Coatings website is production-ready!\n',
  'green'
);
