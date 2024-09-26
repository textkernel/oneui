import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SingleSelectItem } from '@textkernel/oneui/components/List/ListItem/Variants/SingleSelectItem';

export default {
    title: 'Atoms/SingleSelectItem',
    component: SingleSelectItem,
} as Meta<typeof SingleSelectItem>;

type StorySingleSelectItem = StoryObj<typeof SingleSelectItem>;

export const _SingleSelectItem: StorySingleSelectItem = {
    name: 'SingleSelectItem',
    args: {
        disabled: false,
        isHighlighted: false,
        isSelected: false,
    },
    render: (args) => (
        <ul
            style={{
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            }}
        >
            <SingleSelectItem {...args}>First item</SingleSelectItem>
        </ul>
    ),
};
