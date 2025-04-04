#!/bin/bash

# Script to clean up the project before pushing to GitHub

echo "🧹 Cleaning up the project for GitHub..."

# Remove all .DS_Store files
echo "Removing .DS_Store files..."
find . -name ".DS_Store" -type f -delete

# Remove build directories
echo "Removing build directories..."
rm -rf aptos/build
rm -rf aptos_v2/build
rm -rf frontend/build
rm -rf backend/build

# Remove the .aptos directories (they contain local configuration)
echo "Removing .aptos directories..."
rm -rf aptos/.aptos
rm -rf aptos_v2/.aptos

# Remove any logs
echo "Removing log files..."
find . -name "*.log" -type f -delete

# Create backup of .env files
echo "Backing up .env files (will be excluded from Git)..."
[ -f frontend/.env ] && cp frontend/.env frontend/.env.backup
[ -f backend/.env ] && cp backend/.env backend/.env.backup

# Remove any temporary files and cache directories
echo "Removing temporary files and cache directories..."
find . -name ".cache" -type d -exec rm -rf {} +
find . -name ".temp" -type d -exec rm -rf {} +
find . -name "tmp" -type d -exec rm -rf {} +

# Check .gitignore exists and has content
echo "Checking .gitignore file..."
if [ ! -s .gitignore ]; then
  echo "Warning: .gitignore file is empty or doesn't exist. Creating a proper .gitignore file..."
  cat > .gitignore << 'EOL'
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Build directories
aptos/build/
aptos_v2/build/
frontend/build/
backend/build/
dist/

# IDE and OS files
.DS_Store
.idea/
.vscode/
*.swp
*.swo
.project
.classpath
.settings/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
frontend/.env.backup
backend/.env.backup

# Aptos build artifacts
.aptos/
*.blob

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage directory
coverage/

# Miscellaneous
.cache/
.temp/
tmp/
EOL
fi

echo "✅ Cleanup completed!"
echo ""
echo "⚠️ Note: This script does NOT remove node_modules directories as they are"
echo "   excluded by .gitignore. If you need to reduce the project size locally,"
echo "   you can manually delete them with:"
echo ""
echo "   rm -rf frontend/node_modules"
echo "   rm -rf backend/node_modules"
echo ""
echo "   You can restore them later with 'npm install' in each directory."
echo ""
echo "📝 To push to GitHub, make sure you have initialized the repository with:"
echo ""
echo "   git init"
echo "   git add ."
echo "   git commit -m \"Initial commit\""
echo "   git branch -M main"
echo "   git remote add origin YOUR_GITHUB_REPOSITORY_URL"
echo "   git push -u origin main" 
