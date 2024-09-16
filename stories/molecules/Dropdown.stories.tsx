import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Button,
    Dropdown,
    ListItem,
    IconTextkernel,
    SingleSelectItem,
    Separator,
    MultiSelectItem,
} from '@textkernel/oneui';
import { HiDotsVertical } from 'react-icons/hi';

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
    },
    customDiv: {
        alignItems: 'center',
        background: '#ffff003d',
        display: 'flex',
        height: '40px',
        justifyContent: 'center',
    },
    customListItem: {
        alignItems: 'center',
        display: 'flex',
    },
    divider: {
        borderBottom: '1px solid #80808045',
    },
    icon: {
        marginRight: '10px',
    },
};

const meta: Meta<typeof Dropdown> = {
    title: 'Molecules/Dropdown',
    component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const _Dropdown: Story = {
    name: 'Dropdown',
    args: {},
    render: (args) => {
        const onDropdownStateChange = (object) => {
            console.log(
                'onDropdownStateChange was called with the following:',
                JSON.stringify(object)
            );
        };

        const customButtonsDemo = [
            <Button context="primary">Click me!</Button>,
            <Button>
                <HiDotsVertical />
            </Button>,
            <Button variant="ghost">Select any</Button>,
        ];

        return (
            <div style={styles.content}>
                <Dropdown<string>
                    {...args}
                    button={customButtonsDemo[0]}
                    additionalSelectProps={{
                        onStateChange: onDropdownStateChange,
                    }}
                >
                    <ListItem key="disabled-key" disabled style={styles.divider}>
                        Disabled ListItem
                    </ListItem>
                    <Separator title="Section title" />
                    <ListItem key="first-key" value="first-value">
                        ListItem with value
                    </ListItem>
                    <Separator />
                    {['ListItem with value 1', 'ListItem with value 2'].map((value) => (
                        <ListItem key={value} value={value}>
                            {value}
                        </ListItem>
                    ))}

                    <ListItem key="second-key" value="second-value">
                        <div style={styles.customListItem}>
                            <IconTextkernel style={styles.icon} />
                            <strong>Custom ListItem with value</strong>
                        </div>
                    </ListItem>
                    <div style={styles.customDiv}>Just custom div element</div>
                </Dropdown>
            </div>
        );
    },
};

export const _DropdownWithSingleSelectItem: Story = {
    name: 'Dropdown - Single Select Item',
    args: {},
    render: (args) => {
        const [selectedValue, setSelectedValue] = React.useState<string>();

        const onDropdownStateChange = (object) => {
            console.log(
                'onDropdownStateChange was called with the following:',
                JSON.stringify(object)
            );
        };

        return (
            <div style={styles.content}>
                <Dropdown<string>
                    {...args}
                    button={<Button context="primary">Click me!</Button>}
                    onChange={(value) => setSelectedValue(value)}
                    additionalSelectProps={{
                        onStateChange: onDropdownStateChange,
                    }}
                >
                    {['Value 1', 'Value 2', 'Value 3'].map((value) => (
                        <SingleSelectItem
                            key={value}
                            value={value}
                            isSelected={selectedValue === value}
                        >
                            {value}
                        </SingleSelectItem>
                    ))}
                </Dropdown>
            </div>
        );
    },
};

export const _DropdownWithMultiSingleSelectItem: Story = {
    name: 'Dropdown - Multi Select Item',
    args: {},
    render: (args) => {
        const generalValues = ['Value 1', 'Value 2', 'Value 3'];
        const group1 = ['Option 1', 'Option 2'];
        const group2 = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
        const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

        const onDropdownStateChange = (object) => {
            console.log(
                'onDropdownStateChange was called with the following:',
                JSON.stringify(object)
            );
        };

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
            <div style={styles.content}>
                <Dropdown<string>
                    {...args}
                    button={<Button context="primary">Click me!</Button>}
                    onChange={handleOnChange}
                    additionalSelectProps={{
                        onStateChange: onDropdownStateChange,
                    }}
                    isMultiSelect
                >
                    <MultiSelectItem
                        key="all"
                        value="all"
                        isSelected={isAllSelected()}
                        variant="select-all"
                    >
                        Select all
                    </MultiSelectItem>
                    {generalValues.map((value) => (
                        <MultiSelectItem
                            key={value}
                            value={value}
                            isSelected={selectedValues.includes(value)}
                        >
                            {value}
                        </MultiSelectItem>
                    ))}
                    <MultiSelectItem
                        key="group1"
                        value="group1"
                        isSelected={isGroup1Selected()}
                        variant="group-title"
                    >
                        Options
                    </MultiSelectItem>
                    {group1.map((value) => (
                        <MultiSelectItem
                            key={value}
                            value={value}
                            isSelected={selectedValues.includes(value)}
                        >
                            {value}
                        </MultiSelectItem>
                    ))}
                    <MultiSelectItem
                        key="group2"
                        value="group2"
                        isSelected={isGroup2Selected()}
                        variant="group-title"
                    >
                        Items
                    </MultiSelectItem>
                    {group2.map((value) => (
                        <MultiSelectItem
                            key={value}
                            value={value}
                            isSelected={selectedValues.includes(value)}
                        >
                            {value}
                        </MultiSelectItem>
                    ))}
                </Dropdown>
            </div>
        );
    },
};
