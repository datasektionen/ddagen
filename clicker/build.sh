#!/bin/bash
echo "Building map app"
yarn build
echo "Copying files to suitable directories"
mkdir -p ../static/clicker/
cp -r build/static ../static/clicker/
cp build/index.html ../static/clicker/clicker.html
cp build/manifest.json ../static/clicker/

echo "Completed"