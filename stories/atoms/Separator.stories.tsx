import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Separator,
    DropdownRoot,
    DropdownTrigger,
    DropdownContent,
    Button,
    DropdownItem,
} from '@textkernel/oneui';

export default {
    title: 'Atoms/Dropdown/Separator',
    component: Separator,
} as Meta<typeof Separator>;

type StorySeparator = StoryObj<typeof Separator>;

export const _Separator: StorySeparator = {
    name: 'Separator',
    args: { children: 'Separator title' },
    render: (args) => (
        <DropdownRoot>
            <DropdownTrigger>
                <Button>Click here</Button>
            </DropdownTrigger>
            <DropdownContent>
                <DropdownItem>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
                <Separator {...args} />
                <DropdownItem>Item 3</DropdownItem>
            </DropdownContent>
        </DropdownRoot>
    ),
};
