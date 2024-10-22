import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    SingleSelectItem,
    DropdownRoot,
    DropdownTrigger,
    DropdownContent,
    Button,
    Text,
} from '@textkernel/oneui';

export default {
    title: 'Atoms/Dropdown/SingleSelectItem',
    component: SingleSelectItem,
} as Meta<typeof SingleSelectItem>;

type StorySingleSelectItem = StoryObj<typeof SingleSelectItem>;

export const _SingleSelectItem: StorySingleSelectItem = {
    name: 'SingleSelectItem',
    args: {
        disabled: false,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);
        const handleSelect = () => {
            setIsSelected(!isSelected);
            console.log('SingleSelectItem has been clicked');
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
                        <SingleSelectItem {...args} isSelected={isSelected} onSelect={handleSelect}>
                            Simple Item
                        </SingleSelectItem>
                    </DropdownContent>
                </DropdownRoot>
            </>
        );
    },
};
