# Shared by the scaffold scripts (create_story.sh, create_svg.sh). Source it
# from the repository root, after `set -euo pipefail`.

RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

fail() {
  printf "\n${RED}%s${RESET}\n" "$1" >&2
  exit 1
}

# Usage: read_name <noun, e.g. "A component"> <example name> "$@"
# Sets `name` to the single argument, which must be PascalCase.
read_name() {
  local noun="$1" example="$2"
  shift 2
  [ "$#" -eq 1 ] || fail "$noun name is required"
  [[ "$1" =~ ^[A-Z][A-Za-z0-9]*$ ]] || fail "Use a PascalCase name, e.g. $example"
  name="$1"
}

# Usage: refuse_exported_name <name>
# A name the package already exports would be exported twice (TS2300). The
# names are captured first, so a crash of the lister aborts the script.
refuse_exported_name() {
  local names
  names="$(node scripts/exported-names.mjs)"
  if grep -qx -- "$1" <<<"$names"; then
    fail "$1 is already exported from the package (src/index.ts)"
  fi
}
