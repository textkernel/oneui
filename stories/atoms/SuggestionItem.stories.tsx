import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionItem } from '@textkernel/oneui/components/SuggestionItem';

export default {
    title: 'Atoms/SuggestionItem',
    component: SuggestionItem,
} as Meta<typeof SuggestionItem>;

type StorySuggestionItem = StoryObj<typeof SuggestionItem>;

export const _SuggestionItem: StorySuggestionItem = {
    name: 'SuggestionItem',
    args: {
        isDisabled: false,
        isSelected: false,
        hasCheckbox: true,
        onClick: () => console.log('First item'),
    },
    render: (args) => (
        <ul
            style={{
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            }}
        >
            <SuggestionItem {...args}>First item</SuggestionItem>
        </ul>
    ),
};
