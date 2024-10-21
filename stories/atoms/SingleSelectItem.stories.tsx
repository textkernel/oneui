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
    Priority,
} from '@textkernel/oneui';

export default {
    title: 'Atoms/Dropdown/SingleSelectItem',
    component: SingleSelectItem,
} as Meta<typeof SingleSelectItem>;

type StorySingleSelectItem = StoryObj<typeof SingleSelectItem>;

const priorityList: PriorityItemType<string>[] = [
    { priority: Priority.Mandatory, label: 'Mandatory', value: 'required' },
    { priority: Priority.Important, label: 'Important', value: 'strongly_favored' },
    { priority: Priority.Optional, label: 'Optional', value: 'favored' },
    { priority: Priority.Exclude, label: 'Exclude', value: 'banned' },
];

export const _SingleSelectItem: StorySingleSelectItem = {
    name: 'SingleSelectItem',
    args: {
        disabled: false,
        priority: {
            list: priorityList,
            buttonLabel: 'Priority',
            onSelect: () => {},
            selectedItem: { priority: Priority.Mandatory, label: 'Mandatory', value: 'required' },
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
                            hasPriority
                            priority={{
                                onSelect: handlePrioritySelect,
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
