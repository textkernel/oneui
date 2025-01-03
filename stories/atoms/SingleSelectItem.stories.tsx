import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    SingleSelectItem,
    DropdownRoot,
    DropdownTrigger,
    DropdownContent,
    Button,
    Text,
    PriorityItemType,
} from '@textkernel/oneui';

export default {
    title: 'Atoms/Dropdown/SingleSelectItem',
    component: SingleSelectItem,
} as Meta<typeof SingleSelectItem>;

type StorySingleSelectItem = StoryObj<typeof SingleSelectItem>;

const priorityList: PriorityItemType<string>[] = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

export const _SingleSelectItem: StorySingleSelectItem = {
    name: 'SingleSelectItem',
    args: {
        disabled: false,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        const handleSelect = () => {
            setIsSelected(!isSelected);
            console.log('onSelect: SingleSelectItem has been clicked');
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

export const _SingleSelectItemPriority: StorySingleSelectItem = {
    name: 'SingleSelectItem with priority selector',
    args: {
        disabled: false,
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        },
    },
    render: (args) => {
        const [prioritySelected, setPrioritySelected] = React.useState<PriorityItemType<string>>(
            args.priority?.selectedItem as PriorityItemType<string>
        );
        const [isSelected, setIsSelected] = React.useState(false);

        const handleSelect = () => {
            setIsSelected(!isSelected);
            console.log('onSelect: SingleSelectItem has been clicked');
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
                        <SingleSelectItem
                            {...args}
                            isSelected={isSelected}
                            onSelect={handleSelect}
                            priority={{
                                onChange: handlePrioritySelect,
                                selectedItem: prioritySelected,
                                list: priorityList,
                                buttonLabel: 'priorityButton',
                            }}
                        >
                            Simple Item
                        </SingleSelectItem>
                    </DropdownContent>
                </DropdownRoot>
            </>
        );
    },
};
