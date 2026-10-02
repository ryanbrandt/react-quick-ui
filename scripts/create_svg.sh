#!/usr/bin/env bash
# Scaffolds an SVG component and its story.
# Usage: yarn svg:create <SvgName>
set -euo pipefail

cd "$(dirname "$0")/.."

RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

fail() {
  printf "\n${RED}%s${RESET}\n" "$1" >&2
  exit 1
}

[ "$#" -eq 1 ] || fail "An svg component name is required"
name="$1"
[[ "$name" =~ ^[A-Z][A-Za-z0-9]*$ ]] || fail "Use a PascalCase name, e.g. ArrowSvg"

dir="src/assets/svgs/$name"
# A name the package already exports would be exported twice (TS2300).
if yarn node scripts/exported-names.mjs | grep -qx "$name"; then
  fail "$name is already exported from the package (src/index.ts)"
fi

# Check the target before writing anything, so a failure can't half-write.
[ ! -e "$dir" ] || fail "A $name svg already exists!"

mkdir "$dir"

# Placeholder: paste the SVG from https://react-svgr.com/playground/?typescript=true
cat >"$dir/$name.tsx" <<EOF
import type { SVGProps } from "react";

const $name = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" {...props} />
);

export default $name;
EOF

cat >"$dir/$name.stories.tsx" <<EOF
import type { Meta, StoryObj } from "@storybook/react-vite";

import $name from "@svgs/$name/$name";

const meta = {
  title: "SVG/$name",
  component: $name,
} satisfies Meta<typeof $name>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
EOF

printf 'export { default as %s } from "@svgs/%s/%s";\n' "$name" "$name" "$name" >>src/assets/svgs/index.ts

# Line lengths depend on the name, so let Prettier lay the files out.
yarn prettier --log-level warn --write "$dir" src/assets/svgs/index.ts

printf "\n${GREEN}%s SVG created!${RESET}\n" "$name"
printf 'Next: add %s to %s (the 100%% coverage gate fails without a test).\n' "$name" "__tests__/assets/svgs.test.tsx"
