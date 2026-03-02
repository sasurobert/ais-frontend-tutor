#!/bin/bash
set -e
APP_DIR=$PWD
cd ..

# Clone workspace repos needed for tsconfig paths (@ais/material, @ais/common)
git clone --depth 1 https://${GITHUB_TOKEN}@github.com/sasurobert/ais-frontend-common.git

# Install ais-frontend-common deps (transpilePackages in next.config needs them)
cd ais-frontend-common && rm -f package-lock.json && npm install --legacy-peer-deps --no-package-lock 2>/dev/null || true

# Create symlink inside project root so Next.js can resolve ../ais-frontend-common
cd $APP_DIR
ln -sf ../ais-frontend-common ais-frontend-common

# Install the main app
npm install --legacy-peer-deps
