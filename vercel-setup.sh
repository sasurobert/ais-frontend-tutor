#!/bin/bash
set -e
APP_DIR=$PWD
cd ..

# Clone workspace repos needed for tsconfig paths (@ais/material, @ais/common)
git clone --depth 1 https://${GITHUB_TOKEN}@github.com/sasurobert/ais-frontend-common.git

# Install ais-frontend-common deps (material components need @lit/react, @material/web)
cd ais-frontend-common && rm -f package-lock.json && npm install --legacy-peer-deps --no-package-lock 2>/dev/null || true

# Selectively copy ONLY the dirs tutor needs (avoids compiling unused files with missing deps)
cd $APP_DIR
mkdir -p ./ais-frontend-common/src/material
mkdir -p ./ais-frontend-common/src/components
cp ../ais-frontend-common/src/material/MaterialComponents.ts ./ais-frontend-common/src/material/
cp ../ais-frontend-common/src/components/InteractiveParticleSystem.tsx ./ais-frontend-common/src/components/

# Fix Vite-specific syntax not compatible with Next.js:
find ./ais-frontend-common/src -name "*.ts" -o -name "*.tsx" | xargs sed -i.bak 's/import\.meta\.env\.VITE_/process.env.NEXT_PUBLIC_/g' 2>/dev/null || true
find ./ais-frontend-common/src -name "*.ts" -o -name "*.tsx" | xargs sed -i.bak 's/import\.meta\.env/process.env/g' 2>/dev/null || true
find ./ais-frontend-common/src -name "*.bak" -delete 2>/dev/null || true

# Install the main app
npm install --legacy-peer-deps
