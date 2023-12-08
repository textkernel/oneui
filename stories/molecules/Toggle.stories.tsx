import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@textkernel/oneui';

const meta: Meta<typeof Toggle> = {
    title: 'Molecules/Toggle',
    component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const ToggleWithLabel: Story = {
    name: 'Toggle with label',
    args: {
        id: 'my-toggle-1',
        children: 'This is title!',
    },
    render: (args) => <Toggle {...args} />,
};

export const ToggleWithoutLabel: Story = {
    name: 'Toggle without label',
    args: {
        id: 'my-toggle-2',
    },
    render: (args) => <Toggle {...args} />,
};
