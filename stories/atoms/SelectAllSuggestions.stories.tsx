import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectAllSuggestions, Text } from '@textkernel/oneui';

export default {
    title: 'Atoms/List/SelectAllSuggestions',
    component: SelectAllSuggestions,
} as Meta<typeof SelectAllSuggestions>;

type StorySelectAllSuggestions = StoryObj<typeof SelectAllSuggestions>;

export const _SelectAllSuggestions: StorySelectAllSuggestions = {
    name: 'SelectAllSuggestions',
    args: {
        disabled: false,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);
        const handleChange = () => {
            setIsSelected(!isSelected);
            console.log('Select all has been clicked');
        };

        return (
            <>
                <Text>
                    Note: this is a controlled component. You have to set `isSelected` prop yourself
                </Text>
                <ul
                    style={{
                        padding: 0,
                        listStyleType: 'none',
                        width: '200px',
                    }}
                >
                    <SelectAllSuggestions {...args} isSelected={isSelected} onChange={handleChange}>
                        Select All
                    </SelectAllSuggestions>
                </ul>
            </>
        );
    },
};
