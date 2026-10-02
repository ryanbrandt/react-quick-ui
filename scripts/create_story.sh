#!/usr/bin/env bash
# Scaffolds a component, its story and its stylesheet.
# Usage: yarn story:create <ComponentName>
set -euo pipefail

cd "$(dirname "$0")/.."

source scripts/_common.sh

read_name "A component" MyComponent "$@"

dir="src/stories/$name"
scss="src/styles/stories/_$name.scss"
# Check every target before writing anything, so a failure can't half-write.
# The cheap file checks come first.
[ ! -e "$dir" ] || fail "A $name story already exists!"
[ ! -e "$scss" ] || fail "$scss already exists!"
refuse_exported_name "$name"

# Lowercase without bash 4's ${1,,} (macOS ships bash 3.2).
class_name="$(printf %s "$name" | tr '[:upper:]' '[:lower:]')"

mkdir "$dir"

cat >"$dir/$name.tsx" <<EOF
import type { FunctionComponent } from "react";

const $name: FunctionComponent = () => <div className="$class_name">$name</div>;

export default $name;
EOF

cat >"$dir/$name.stories.tsx" <<EOF
import type { Meta, StoryObj } from "@storybook/react-vite";

import $name from "@stories/$name/$name";

const meta = {
  title: "Core/$name",
  component: $name,
} satisfies Meta<typeof $name>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
EOF

printf '.%s {\n}\n' "$class_name" >"$scss"

printf 'export { default as %s } from "@stories/%s/%s";\n' "$name" "$name" "$name" >>src/stories/index.ts
printf '@use "stories/%s";\n' "$name" >>src/styles/index.scss

# Line lengths depend on the name, so let Prettier lay the files out.
yarn prettier --log-level warn --write "$dir" "$scss" src/stories/index.ts src/styles/index.scss

printf "\n${GREEN}%s story created!${RESET}\n" "$name"
printf 'Next: add a test in %s (the 100%% coverage gate fails without one).\n' "__tests__/stories/$name.test.tsx"
