import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Button,
    DropdownRoot,
    DropdownSub,
    DropdownPortal,
    DropdownTrigger,
    SubContentTrigger,
    DropdownContent,
    DropdownSubContent,
    SingleSelectItem,
    MultiSelectItem,
    Separator,
} from '@textkernel/oneui';

const meta: Meta<typeof DropdownContent> = {
    title: 'Molecules/Dropdown',
    component: DropdownContent,
};

export default meta;

type Story = StoryObj<typeof DropdownContent>;

export const _Dropdown: Story = {
    name: 'Actions Dropdown',
    args: {},
    render: () => <p>To be implements</p>,
};

export const _DropdownWithSingleSelectItem: Story = {
    name: 'Dropdown - Single Select Item',
    args: {},
    render: (args) => {
        const [selectedValue, setSelectedValue] = React.useState<string>();
        const items = ['Item 1', 'Item 2', 'Some other item', 'Option you like'];
        const items2 = ['Item 3', 'Item 4'];

        const handleOnChange = (value: string) => {
            console.log('handleOnChange was called with the following value:', value);

            setSelectedValue(value);
        };

        return (
            <DropdownRoot>
                <DropdownTrigger>
                    <Button>Apply tags</Button>
                </DropdownTrigger>
                <DropdownPortal>
                    <DropdownContent {...args}>
                        <SingleSelectItem
                            onSelect={() => {
                                handleOnChange('1');
                            }}
                            key="1"
                            isSelected={selectedValue === '1'}
                        >
                            Select all
                        </SingleSelectItem>
                        {items.map((value) => (
                            <SingleSelectItem
                                key={value}
                                isSelected={selectedValue === value}
                                onSelect={() => {
                                    handleOnChange(value);
                                }}
                            >
                                {value}
                            </SingleSelectItem>
                        ))}
                        <Separator>Section Title</Separator>
                        {items2.map((value) => (
                            <SingleSelectItem
                                key={value}
                                isSelected={selectedValue === value}
                                onSelect={() => {
                                    handleOnChange(value);
                                }}
                            >
                                {value}
                            </SingleSelectItem>
                        ))}
                    </DropdownContent>
                </DropdownPortal>
            </DropdownRoot>
        );
    },
};

export const _DropdownWithMultiSingleSelectItem: Story = {
    name: 'Dropdown - Multi Select Item',
    args: {},
    render: (args) => {
        const generalValues = ['Tag 1', 'Tag 2', 'Tag 3'];
        const group1 = ['Option 1', 'Option 2'];
        const group2 = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
        const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

        const isAllSelected = () =>
            selectedValues.length === generalValues.length + group1.length + group2.length;
        const isGroup1Selected = () => group1.every((value) => selectedValues.includes(value));
        const isGroup2Selected = () => group2.every((value) => selectedValues.includes(value));

        // helper function because TS settings doesn't allow for [...new Set(items)]
        function uniqueArray(arr: string[]) {
            const a: string[] = [];
            arr.forEach((_, i) => {
                if (a.indexOf(arr[i]) === -1 && arr[i] !== '') {
                    a.push(arr[i]);
                }
            });
            return a;
        }

        const handleOnChange = (value) => {
            console.log('handleOnChange was called with the following value:', value);
            switch (value) {
                case 'all':
                    if (isAllSelected()) {
                        setSelectedValues([]);
                    } else {
                        setSelectedValues([...generalValues, ...group1, ...group2]);
                    }
                    break;
                case 'group1':
                    if (isGroup1Selected()) {
                        let newSelected = [...selectedValues];
                        group1.forEach((item) => {
                            newSelected = newSelected.filter((v) => v !== item);
                        });
                        setSelectedValues(newSelected);
                    } else {
                        setSelectedValues(uniqueArray([...selectedValues, ...group1]));
                    }
                    break;
                case 'group2':
                    if (isGroup2Selected()) {
                        let newSelected = [...selectedValues];
                        group2.forEach((item) => {
                            newSelected = newSelected.filter((v) => v !== item);
                        });
                        setSelectedValues(newSelected);
                    } else {
                        setSelectedValues(uniqueArray([...selectedValues, ...group2]));
                    }
                    break;
                default:
                    if (selectedValues.includes(value)) {
                        setSelectedValues(selectedValues.filter((v) => v !== value));
                    } else {
                        setSelectedValues([...selectedValues, value]);
                    }
            }
        };

        return (
            <DropdownRoot>
                <DropdownTrigger>
                    <Button>Apply tags</Button>
                </DropdownTrigger>
                <DropdownPortal>
                    <DropdownContent {...args}>
                        <MultiSelectItem
                            onCheckedChange={() => {
                                handleOnChange('all');
                            }}
                            key="all"
                            isSelected={isAllSelected()}
                            variant="select-all"
                        >
                            Select all
                        </MultiSelectItem>
                        {generalValues.map((value) => (
                            <MultiSelectItem
                                key={value}
                                isSelected={selectedValues.includes(value)}
                                onCheckedChange={() => {
                                    handleOnChange(value);
                                }}
                            >
                                {value}
                            </MultiSelectItem>
                        ))}
                        <MultiSelectItem
                            key="group1"
                            isSelected={isGroup1Selected()}
                            variant="group-title"
                            onCheckedChange={() => {
                                handleOnChange('group1');
                            }}
                        >
                            Options
                        </MultiSelectItem>
                        {group1.map((value) => (
                            <MultiSelectItem
                                key={value}
                                isSelected={selectedValues.includes(value)}
                                onCheckedChange={() => {
                                    handleOnChange(value);
                                }}
                            >
                                {value}
                            </MultiSelectItem>
                        ))}
                        <DropdownSub>
                            <SubContentTrigger>Items →</SubContentTrigger>
                            <DropdownPortal>
                                <DropdownSubContent>
                                    {group2.map((value) => (
                                        <MultiSelectItem
                                            key={value}
                                            isSelected={selectedValues.includes(value)}
                                            onCheckedChange={() => {
                                                handleOnChange(value);
                                            }}
                                        >
                                            {value}
                                        </MultiSelectItem>
                                    ))}
                                </DropdownSubContent>
                            </DropdownPortal>
                        </DropdownSub>
                    </DropdownContent>
                </DropdownPortal>
            </DropdownRoot>
        );
    },
};
