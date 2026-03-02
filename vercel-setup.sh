#!/bin/bash
set -e
APP_DIR=$PWD
cd ..

# Clone workspace repos needed for tsconfig paths (@ais/material, @ais/common)
git clone --depth 1 https://${GITHUB_TOKEN}@github.com/sasurobert/ais-frontend-common.git

# Install ais-frontend-common deps (transpilePackages in next.config needs them)
cd ais-frontend-common && rm -f package-lock.json && npm install --legacy-peer-deps --no-package-lock 2>/dev/null || true

# Copy ais-frontend-common INTO the project root (Vercel blocks symlinks outside root)
cd $APP_DIR
cp -r ../ais-frontend-common ./ais-frontend-common

# Fix Vite-specific syntax not compatible with Next.js:
# Replace import.meta.env.VITE_xxx with process.env.NEXT_PUBLIC_xxx
find ./ais-frontend-common/src -name "*.ts" -o -name "*.tsx" | xargs sed -i.bak 's/import\.meta\.env\.VITE_/process.env.NEXT_PUBLIC_/g' 2>/dev/null || true
find ./ais-frontend-common/src -name "*.ts" -o -name "*.tsx" | xargs sed -i.bak 's/import\.meta\.env/process.env/g' 2>/dev/null || true
find ./ais-frontend-common/src -name "*.bak" -delete 2>/dev/null || true

# Install the main app
npm install --legacy-peer-deps
