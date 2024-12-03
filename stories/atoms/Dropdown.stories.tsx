import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Button,
    DropdownRoot,
    DropdownSub,
    DropdownPortal,
    DropdownTrigger,
    DropdownContent,
    DropdownSubContent,
    DropdownSubTrigger,
    SingleSelectItem,
    MultiSelectItem,
    Separator,
    SelectedItemBadge,
    PriorityItemType,
} from '@textkernel/oneui';

const meta: Meta<typeof DropdownContent> = {
    title: 'Atoms/Dropdown',
    component: DropdownContent,
};

export default meta;

type Story = StoryObj<typeof DropdownContent>;

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
                        {items.map((value) => (
                            <SingleSelectItem
                                key={value}
                                isSelected={selectedValue === value}
                                onSelect={() => handleOnChange(value)}
                            >
                                {value}
                            </SingleSelectItem>
                        ))}
                        <Separator>Section Title</Separator>
                        {items2.map((value) => (
                            <SingleSelectItem
                                key={value}
                                isSelected={selectedValue === value}
                                onSelect={() => handleOnChange(value)}
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
        const ref = React.useRef(null);
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
                    <div ref={ref} style={{ width: 200 }}>
                        <Button>Apply tags</Button>
                    </div>
                </DropdownTrigger>
                <DropdownPortal>
                    <DropdownContent {...args} refElement={ref}>
                        <MultiSelectItem
                            onCheckedChange={() => handleOnChange('all')}
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
                                onCheckedChange={() => handleOnChange(value)}
                            >
                                {value}
                            </MultiSelectItem>
                        ))}
                        <MultiSelectItem
                            key="group1"
                            isSelected={isGroup1Selected()}
                            variant="group-title"
                            onCheckedChange={() => handleOnChange('group1')}
                        >
                            Options
                        </MultiSelectItem>
                        {group1.map((value) => (
                            <MultiSelectItem
                                key={value}
                                isSelected={selectedValues.includes(value)}
                                onCheckedChange={() => handleOnChange(value)}
                            >
                                {value}
                            </MultiSelectItem>
                        ))}
                        <DropdownSub>
                            <DropdownSubTrigger>More items</DropdownSubTrigger>
                            <DropdownPortal>
                                <DropdownSubContent refElement={ref}>
                                    {group2.map((value) => (
                                        <MultiSelectItem
                                            key={value}
                                            isSelected={selectedValues.includes(value)}
                                            onCheckedChange={() => handleOnChange(value)}
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

export const _DropdownWithSelectedItemBadge: Story = {
    name: 'Dropdown - SelectedItemBadge',
    args: {},
    render: (args) => {
        const priorityList: Array<PriorityItemType<string>> = [
            { priority: 'mandatory', label: 'Mandatory', value: 'required' },
            { priority: 'important', label: 'Important', value: 'strongly_favored' },
            { priority: 'optional', label: 'Optional', value: 'favored' },
            { priority: 'exclude', label: 'Exclude', value: 'banned' },
        ];

        const priority = {
            list: priorityList,
            buttonLabel: 'Priority',
            onChange: () => {},
            selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        };

        const ref = React.useRef(null);

        const [selectedPriorityItem, setSelectedPriorityItem] = React.useState<
            PriorityItemType<string>
        >({
            priority: 'mandatory',
            label: 'Mandatory',
            value: 'required',
        });

        React.useEffect(() => {
            setSelectedPriorityItem(selectedPriorityItem);
        }, [selectedPriorityItem]);

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

        const handlePriorityChange = (newPriorityItem: PriorityItemType<string>) => {
            setSelectedPriorityItem(newPriorityItem);
            console.log(`Priority changed to ${newPriorityItem.priority}`);
        };

        const handleDelete = () => {
            console.log('SelectedItemBadge deleted');
            setSelectedValues([]);
        };

        return (
            <DropdownRoot>
                <DropdownTrigger>
                    <Button ref={ref}>Select the priority/options</Button>
                </DropdownTrigger>
                <DropdownPortal>
                    <DropdownContent {...args} refElement={ref}>
                        <div style={{ padding: '8px' }}>
                            <SelectedItemBadge<string, string>
                                priority={
                                    priority && {
                                        ...priority,
                                        list: priorityList,
                                        selectedItem: selectedPriorityItem,
                                        onChange: handlePriorityChange,
                                    }
                                }
                                label="Group"
                                onDelete={handleDelete}
                                additionalLabel={
                                    selectedValues.length > 0 && `+${selectedValues.length}`
                                }
                            >
                                <MultiSelectItem
                                    onCheckedChange={() => handleOnChange('all')}
                                    key="all"
                                    isSelected={isAllSelected()}
                                    variant="select-all"
                                >
                                    Select all
                                </MultiSelectItem>
                                {group1.map((i) => (
                                    <MultiSelectItem
                                        id={i}
                                        key={i}
                                        onCheckedChange={() => handleOnChange(i)}
                                        isSelected={selectedValues.includes(i)}
                                    >
                                        {i}
                                    </MultiSelectItem>
                                ))}
                                <DropdownSub>
                                    <DropdownSubTrigger>More items</DropdownSubTrigger>
                                    <DropdownPortal>
                                        <DropdownSubContent refElement={ref}>
                                            {group2.map((value) => (
                                                <MultiSelectItem
                                                    key={value}
                                                    isSelected={selectedValues.includes(value)}
                                                    onCheckedChange={() => handleOnChange(value)}
                                                >
                                                    {value}
                                                </MultiSelectItem>
                                            ))}
                                        </DropdownSubContent>
                                    </DropdownPortal>
                                </DropdownSub>
                            </SelectedItemBadge>
                        </div>
                        <DropdownSub>
                            <DropdownSubTrigger>More items</DropdownSubTrigger>
                            <DropdownPortal>
                                <DropdownSubContent refElement={ref}>
                                    {group2.map((value) => (
                                        <MultiSelectItem
                                            key={value}
                                            isSelected={selectedValues.includes(value)}
                                            onCheckedChange={() => handleOnChange(value)}
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
