import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    MultiSelectItem,
    DropdownRoot,
    DropdownTrigger,
    DropdownContent,
    Button,
    Text,
} from '@textkernel/oneui';

export default {
    title: 'Molecules/Dropdown/MultiSelectItem',
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
            console.log('MultiSelectItem has been clicked');
        };

        return (
            <>
                <Text>
                    Note: this is a controlled component. You have to set `isSelected` prop yourself
                </Text>
                <DropdownRoot>
                    <DropdownTrigger>
                        <Button>Click here</Button>
                    </DropdownTrigger>
                    <DropdownContent>
                        <MultiSelectItem
                            {...args}
                            isSelected={isSelected}
                            onCheckedChange={handleChange}
                        >
                            Item with checkbox
                        </MultiSelectItem>
                    </DropdownContent>
                </DropdownRoot>
            </>
        );
    },
};
