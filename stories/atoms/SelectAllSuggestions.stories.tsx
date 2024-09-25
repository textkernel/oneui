import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelectItem, Text } from '@textkernel/oneui';

export default {
    title: 'Atoms/List/MultiSelectItem',
    component: MultiSelectItem,
} as Meta<typeof MultiSelectItem>;

type StoryMultiSelectItem = StoryObj<typeof MultiSelectItem>;

export const _MultiSelectItem: StoryMultiSelectItem = {
    name: 'MultiSelectItem',
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
                    <MultiSelectItem {...args} isSelected={isSelected} onChange={handleChange}>
                        Select All
                    </MultiSelectItem>
                </ul>
            </>
        );
    },
};
