import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button, MultiSelectMenuItem, Input, SelectedItemBadge, SelectedItemBadgePriorityItem, ListItem, Text } from '@textkernel/oneui';

const priorityList: Array<SelectedItemBadgePriorityItem> = [
    { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    { priority: 'important', label: 'Important', value: 'strongly_favored' },
    { priority: 'optional', label: 'Optional', value: 'favored' },
    { priority: 'exclude', label: 'Exclude', value: 'banned' },
];

const radiusList = ['5', '10', '15', '25'];

const Menu = () => {
    const generalValues = ['Tag 1', 'Tag 2', 'Tag 3'];
    const group1 = ['Option 1', 'Option 2'];
    const group2 = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const isAllSelected = () =>
        selectedValues.length === generalValues.length + group1.length + group2.length;
    const isGroup1Selected = () => group1.every((value) => selectedValues.includes(value));
    const isGroup2Selected = () => group2.every((value) => selectedValues.includes(value));

    const handleOnChange = (value: string) => {
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
                    setSelectedValues(selectedValues.filter((v) => !group1.includes(v)));
                } else {
                    setSelectedValues([...selectedValues, ...group1]);
                }
                break;
            case 'group2':
                if (isGroup2Selected()) {
                    setSelectedValues(selectedValues.filter((v) => !group2.includes(v)));
                } else {
                    setSelectedValues([...selectedValues, ...group2]);
                }
                break;
            default:
                setSelectedValues((prev) =>
                    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
                );
        }
        console.log('Selected values:', value);
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button>Apply tags</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content style={{ backgroundColor: 'antiquewhite', padding: '20px' }}>
                    <DropdownMenu.Item autoFocus asChild>
                        <Input ref={inputRef} onClick={(e) => e.preventDefault()} />
                    </DropdownMenu.Item>
                    <MultiSelectMenuItem
                        onCheckedChange={() => handleOnChange('all')}
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
                            onCheckedChange={() => handleOnChange(value)}
                        >
                            {value}
                        </MultiSelectMenuItem>
                    ))}

                    <MultiSelectMenuItem
                        key="group1"
                        isSelected={isGroup1Selected()}
                        variant="group-title"
                        onCheckedChange={() => handleOnChange('group1')}
                    >
                        Options
                    </MultiSelectMenuItem>

                    {group1.map((value) => (
                        <MultiSelectMenuItem
                            key={value}
                            isSelected={selectedValues.includes(value)}
                            onCheckedChange={() => handleOnChange(value)}
                        >
                            {value}
                        </MultiSelectMenuItem>
                    ))}

                    {/* Another instance of SelectedItemBadge wrapped in its own DropdownMenu */}
                    <DropdownMenu.Item asChild>
                        <DropdownMenu.Root>
                                <SelectedItemBadge
                                    label="Location"
                                    onDelete={() => console.log('Delete location')}
                                    priority={{
                                        list: priorityList,
                                        selectedItem: priorityList[0],
                                        buttonLabel: 'Priority',
                                        onChange: (item) => console.log('Priority changed to:', item),
                                    }}
                                >
                                    {radiusList.map((radius) => (
                                        <DropdownMenu.Item
                                            key={radius}
                                            onSelect={() => console.log(`Selected radius: ${radius}`)}
                                        >
                                            <ListItem
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                    gap: '8px',
                                                }}
                                                value={radius}
                                            >
                                                <Text inline size="small">{radius}</Text>
                                            </ListItem>
                                        </DropdownMenu.Item>
                                    ))}
                                </SelectedItemBadge>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    sideOffset={5}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    {priorityList.map((item) => (
                                        <DropdownMenu.Item
                                            key={item.priority}
                                            onSelect={() => console.log(`Priority item selected: ${item.label}`)}
                                        >
                                            <Text>{item.label}</Text>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </DropdownMenu.Item>

                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Items →</DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent style={{ backgroundColor: 'aliceblue', padding: '20px' }}>
                                {group2.map((value) => (
                                    <MultiSelectMenuItem
                                        key={value}
                                        isSelected={selectedValues.includes(value)}
                                        onCheckedChange={() => handleOnChange(value)}
                                    >
                                        {value}
                                    </MultiSelectMenuItem>
                                ))}

                                <DropdownMenu.Item asChild>
                                    <DropdownMenu.Root>
                                        <div>
                                            <SelectedItemBadge
                                                label="Location"
                                                onDelete={() => console.log('Delete location')}
                                                priority={{
                                                    list: priorityList,
                                                    selectedItem: priorityList[0],
                                                    buttonLabel: 'Priority',
                                                    onChange: (item) => console.log('Priority changed to:', item),
                                                }}
                                            >
                                                {radiusList.map((radius) => (
                                                    <DropdownMenu.Item
                                                        key={radius}
                                                        onSelect={() => console.log(`Selected radius: ${radius}`)}
                                                    >
                                                        <ListItem
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-start',
                                                                gap: '8px',
                                                            }}
                                                            value={radius}
                                                        >
                                                            <Text inline size="small">{radius}</Text>
                                                        </ListItem>
                                                    </DropdownMenu.Item>
                                                ))}
                                            </SelectedItemBadge>
                                        </div>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content
                                                sideOffset={5}
                                                style={{
                                                    padding: '10px',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                                }}
                                            >
                                                {priorityList.map((item) => (
                                                    <DropdownMenu.Item
                                                        key={item.priority}
                                                        onSelect={() => console.log(`Priority item selected: ${item.label}`)}
                                                    >
                                                        <Text>{item.label}</Text>
                                                    </DropdownMenu.Item>
                                                ))}
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                </DropdownMenu.Item>

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
