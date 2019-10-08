#!/bin/bash
echo "Building map app"
yarn build
echo "Copying files to suitable directories"
mkdir -p ../static/map/
cp -r build/static ../static/map/
cp build/index.html ../static/map/map.html
cp build/manifest.json ../static/map/

echo "Completed"