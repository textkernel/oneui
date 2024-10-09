import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button, MultiSelectMenuItem } from '@textkernel/oneui';

const Menu = () => {
    const generalValues = ['Value 1', 'Value 2', 'Value 3'];
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
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button>Trigger</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content>
                    <MultiSelectMenuItem
                        onCheckedChange={() => {
                            handleOnChange('all');
                        }}
                        key="all"
                        isSelected={isAllSelected()}
                        variant="select-all"
                    >
                        Select all
                    </MultiSelectMenuItem>
                    {generalValues.map((value) => (
                        <MultiSelectMenuItem
                            key={value}
                            isSelected={selectedValues.includes(value)}
                            onCheckedChange={() => {
                                handleOnChange(value);
                            }}
                        >
                            {value}
                        </MultiSelectMenuItem>
                    ))}
                    <MultiSelectMenuItem
                        key="group1"
                        isSelected={isGroup1Selected()}
                        variant="group-title"
                        onCheckedChange={() => {
                            handleOnChange('group1');
                        }}
                    >
                        Options
                    </MultiSelectMenuItem>
                    {group1.map((value) => (
                        <MultiSelectMenuItem
                            key={value}
                            isSelected={selectedValues.includes(value)}
                            onCheckedChange={() => {
                                handleOnChange(value);
                            }}
                        >
                            {value}
                        </MultiSelectMenuItem>
                    ))}
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Items →</DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent>
                                {group2.map((value) => (
                                    <MultiSelectMenuItem
                                        key={value}
                                        isSelected={selectedValues.includes(value)}
                                        onCheckedChange={() => {
                                            handleOnChange(value);
                                        }}
                                    >
                                        {value}
                                    </MultiSelectMenuItem>
                                ))}
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

const meta: Meta<DropdownMenu.DropdownMenuContentProps> = {
    title: 'Atoms/Menu',
    component: DropdownMenu.DropdownMenuContent,
    render: (args) => <Menu {...args} />,
};

export default meta;

type Story = StoryObj<DropdownMenu.DropdownMenuContentProps>;

export const ScrollingModal: Story = {
    name: 'Multi selection menu',
};
