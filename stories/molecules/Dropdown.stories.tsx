import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Dropdown, ListItem, IconTextkernel, SingleSelectItem } from '@textkernel/oneui';
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
                    <ListItem key="first-key" value="first-value">
                        ListItem with value
                    </ListItem>
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
