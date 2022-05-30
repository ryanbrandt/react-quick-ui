#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'

if [ "$#" -ne 1 ]; then
    printf "\n${RED}A component name is required\n"
    exit 1
else

    if [ -d "src/stories/$1" ]; then
        printf "\n${RED}A $1 story already exists!\n"
        exit 1
    fi

    mkdir src/stories/$1

    echo "
import { FunctionComponent } from "\""react"\"";

interface Props {}

const $1: FunctionComponent<Props> = (props: Props): JSX.Element => (
    <div>$1</div>
);

export default $1;
" >src/stories/$1/$1.tsx

    echo "export { default as $1 } from "\""@stories/$1/$1"\"";" >>src/stories/index.ts

    echo "
import { ComponentStory, ComponentMeta } from "\""@storybook/react"\"";

import $1 from "\""@stories/$1/$1"\"";

export default {
    text: $1.name,
    component: $1,
} as ComponentMeta<typeof $1>;

const DefaultTemplate: ComponentStory<typeof $1> = (args) => (
    <$1 {...args} />
);
export const Default = DefaultTemplate.bind({});
" >src/stories/$1/$1.stories.tsx

    echo ".${1,,} {}" >src/styles/stories/$1.scss

    echo "@import "\""./stories/$1.scss"\"";" >>src/styles/index.scss

    printf "\n${GREEN} $1 story created!\n"
fi

exit 0
