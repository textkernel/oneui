import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectButtonGroup, SelectButton } from '@textkernel/oneui';

const meta: Meta<typeof SelectButtonGroup> = {
    title: 'Atoms/SelectButtonGroup',
    component: SelectButtonGroup,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { SelectButton } as any,
    render: (args) => <SelectButtonGroup {...args} />,
};

export default meta;

type ButtonList = {
    button1: boolean;
    button2: boolean;
    button3: boolean;
};

type Story = StoryObj<typeof SelectButtonGroup | ButtonList>;

export const Uncontrolled: Story = {
    name: 'Uncontrolled',
    args: {
        defaultValue: ['3'],
    },
    render: (args) => (
        <SelectButtonGroup {...args}>
            <SelectButton value="1" key="button 1">
                Option 1
            </SelectButton>
            <SelectButton value="2" key="button 2">
                Option 2
            </SelectButton>
            <SelectButton value="3" key="button 3">
                Option 3
            </SelectButton>
        </SelectButtonGroup>
    ),
};

export const Controlled: Story = {
    name: 'Controlled',
    args: {
        button1: true,
        button2: false,
        button3: false,
    },
    render: (args) => {
        const buttons = {
            '1': args.button1,
            '2': args.button2,
            '3': args.button3,
        };
        const keys = Object.keys(buttons);

        return (
            <SelectButtonGroup value={keys.filter((k) => buttons[k])}>
                {keys.map((buttonNumber) => (
                    <SelectButton key={`button-${buttonNumber}`} value={buttonNumber}>
                        Button {buttonNumber}
                    </SelectButton>
                ))}
            </SelectButtonGroup>
        );
    },
};
