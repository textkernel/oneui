import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectAllSuggestions } from '@textkernel/oneui';

export default {
    title: 'Atoms/SelectAllSuggestions',
    component: SelectAllSuggestions,
} as Meta<typeof SelectAllSuggestions>;

type StorySelectAllSuggestions = StoryObj<typeof SelectAllSuggestions>;

export const _SelectAllSuggestions: StorySelectAllSuggestions = {
    name: 'SelectAllSuggestions',
    args: {
        disabled: false,
        isSelected: false,
        onChange: () => console.log('Select all has been clicked'),
    },
    render: (args) => (
        <ul
            style={{
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            }}
        >
            <SelectAllSuggestions {...args}>Select All</SelectAllSuggestions>
        </ul>
    ),
};
