import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionItem } from '@textkernel/oneui/components/List/ListItem/Variants/SuggestionItem';

export default {
    title: 'Atoms/SuggestionItem',
    component: SuggestionItem,
} as Meta<typeof SuggestionItem>;

type StorySuggestionItem = StoryObj<typeof SuggestionItem>;

export const _SuggestionItem: StorySuggestionItem = {
    name: 'SuggestionItem',
    args: {
        disabled: false,
        isHighlighted: false,
        hasCheckbox: true,
        onClick: () => console.log('First item'),
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <ul
                style={{
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',
                }}
            >
                <SuggestionItem
                    {...args}
                    isSelected={isSelected}
                    onChange={() => setIsSelected(!isSelected)}
                >
                    First item
                </SuggestionItem>
            </ul>
        );
    },
};
