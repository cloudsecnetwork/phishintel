#!/bin/sh
set -e

echo "Initializing root admin (if needed)..."
node initRootAdmin.js

echo "Starting main application..."
exec node app.js 