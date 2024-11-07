import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    MultiSelectItem,
    DropdownRoot,
    DropdownTrigger,
    DropdownContent,
    Button,
    Text,
    PriorityItemType,
} from '@textkernel/oneui';

export default {
    title: 'Atoms/Dropdown/MultiSelectItem',
    component: MultiSelectItem,
} as Meta<typeof MultiSelectItem>;

type StoryMultiSelectItem = StoryObj<typeof MultiSelectItem>;

export const _MultiSelectItem: StoryMultiSelectItem = {
    name: 'MultiSelectItem with checkbox',
    args: {
        disabled: false,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        const handleOnCheckedChange = () => {
            setIsSelected(!isSelected);
            console.log('onCheckedChange: MultiSelectItem has been clicked');
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
                            onCheckedChange={handleOnCheckedChange}
                        >
                            Item with checkbox
                        </MultiSelectItem>
                    </DropdownContent>
                </DropdownRoot>
            </>
        );
    },
};

const priorityList: PriorityItemType<string>[] = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

export const _MultiSelectItemPriority: StoryMultiSelectItem = {
    name: 'MultiSelectItem with checkbox and priority selector',
    args: {
        disabled: false,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);
        const [prioritySelected, setPrioritySelected] = React.useState<PriorityItemType<string>>({
            priority: 'mandatory',
            label: 'Mandatory',
            value: 'required',
        });
        const handleChange = () => {
            setIsSelected(!isSelected);
            console.log('MultiSelectItem has been clicked');
        };
        const handlePrioritySelect = (selectedItem: PriorityItemType<string>) => {
            console.log('new item selected: ', selectedItem);
            setPrioritySelected(selectedItem);
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
                            priority={{
                                onChange: handlePrioritySelect,
                                selectedItem: prioritySelected,
                                list: priorityList,
                                buttonLabel: 'priorityButton',
                            }}
                        >
                            Item with checkbox
                        </MultiSelectItem>
                    </DropdownContent>
                </DropdownRoot>
            </>
        );
    },
};
