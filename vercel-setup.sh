#!/bin/bash
set -e
APP_DIR=$PWD
cd ..

# Clone workspace repos needed for tsconfig paths (@ais/material, @ais/common)
git clone --depth 1 https://${GITHUB_TOKEN}@github.com/sasurobert/ais-frontend-common.git

# Install ais-frontend-common deps (transpilePackages in next.config needs them)
cd ais-frontend-common && rm -f package-lock.json && npm install --legacy-peer-deps --no-package-lock 2>/dev/null || true

# Install the main app
cd $APP_DIR && npm install --legacy-peer-deps
