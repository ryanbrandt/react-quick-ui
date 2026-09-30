#!/usr/bin/env bash
# Builds the library into dist/. Any failing command aborts the build.
set -euo pipefail

cd "$(dirname "$0")/.."

step() { printf '\n==> %s\n' "$1"; }

step "Cleaning dist"
rm -rf dist

step "Bundling JavaScript (rollup)"
yarn rollup -c

step "Emitting type declarations (tsc + tsc-alias)"
yarn tsc -p tsconfig.build.json
yarn tsc-alias -p tsconfig.build.json

step "Compiling stylesheets"
yarn sass src/styles/index.scss dist/stylesheets/index.css --no-source-map --style compressed
yarn sass src/styles/index.scss dist/stylesheets/index.scss --no-source-map --style compressed
cp src/styles/colors.scss dist/stylesheets/colors.scss

step "Copying fonts"
mkdir -p dist/assets
cp -R src/assets/fonts dist/assets/fonts

printf '\nBuild succeeded.\n'
