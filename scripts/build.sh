#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'

function build_failure() {
    printf "\n${YELLOW}$1\n"
    printf "${RED}Build Failed!\n"
    exit 1
}

function main() {
    printf "\nPreparing to build library...\n"

    rm -rf dist

    if [ $? -ne 0 ]; then
        build_failure "Failed preparation"
    fi

    printf "\nBundling library...\n"

    yarn rollup -c

    if [ $? -ne 0 ]; then
        build_failure "Failed bundling library"
    fi

    printf "\nCompiling stylesheets...\n"

    yarn sass src/styles/index.scss dist/stylesheets/index.css --no-source-map --style compressed && yarn sass src/styles/index.scss dist/stylesheets/index.scss --no-source-map --style compressed

    cp src/styles/colors.scss dist/stylesheets/colors.scss

    if [ $? -ne 0 ]; then
        build_failure "Failed compiling stylesheets"
    fi

    printf "\nCopying assets...\n"

    mkdir -p dist/assets/ && cp -r src/assets/fonts/ dist/assets/

    if [ $? -ne 0 ]; then
        build_failure "Failed copying assets"
    fi

    printf "\n${GREEN}Build succeeded!\n"

    exit 0
}

main
