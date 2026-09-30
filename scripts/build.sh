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
# Passing the installed Sass version makes every deprecation it knows about
# fatal, so the build fails instead of warning.
sass_version="$(yarn sass --version | cut -d ' ' -f 1)"
sass() { yarn sass --no-source-map --fatal-deprecation="$sass_version" "$@"; }

sass --style compressed src/styles/index.scss dist/stylesheets/index.css

# Public Sass API (tokens + mixins). Loading it must not emit any CSS.
cp -R src/styles/sass dist/stylesheets/sass
if [ -n "$(sass dist/stylesheets/sass/_index.scss)" ]; then
  echo "dist/stylesheets/sass/_index.scss must not emit CSS" >&2
  exit 1
fi

# Deprecated @import entry points, kept for existing consumers:
# index.scss is the compiled CSS, colors.scss exposes the color variables.
cp dist/stylesheets/index.css dist/stylesheets/index.scss
printf '@forward "sass/colors";\n' >dist/stylesheets/colors.scss

step "Copying fonts"
mkdir -p dist/assets
cp -R src/assets/fonts dist/assets/fonts

printf '\nBuild succeeded.\n'
