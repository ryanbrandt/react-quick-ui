#!/usr/bin/env bash
# Scaffolds an SVG component and its story.
# Usage: yarn svg:create <SvgName>
set -euo pipefail

cd "$(dirname "$0")/.."

source scripts/_common.sh

read_name "An svg component" ArrowSvg "$@"

dir="src/assets/svgs/$name"
# Check the target before writing anything, so a failure can't half-write.
# The cheap file check comes first.
[ ! -e "$dir" ] || fail "A $name svg already exists!"
refuse_exported_name "$name"

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
