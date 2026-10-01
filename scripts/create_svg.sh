#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

if [ "$#" -ne 1 ]; then
    printf "\n${RED}An svg component name is required\n"
    exit 1
else

    if [ -d "src/assets/svgs/$1" ]; then
        printf "\n${RED}A $1 svg already exists!\n"
        exit 1
    fi

    mkdir src/assets/svgs/$1

    echo "
import { SVGProps } from "\""react"\"";

const $1 = (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <div>Create your SVG at https://react-svgr.com/playground/?typescript=true</div>
);

export default $1;
" >src/assets/svgs/$1/$1.tsx

    echo "export { default as $1 } from "\""@svgs/$1/$1"\"";" >>src/assets/svgs/index.ts

    echo "
import type { Meta, StoryObj } from "\""@storybook/react-vite"\"";

import $1 from "\""@svgs/$1/$1"\"";

const meta = {
    title: "\""SVG/$1"\"",
    component: $1,
} satisfies Meta<typeof $1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {};
" >src/assets/svgs/$1/$1.stories.tsx

    printf "\n${GREEN} $1 SVG created!\n"
fi

exit 0
