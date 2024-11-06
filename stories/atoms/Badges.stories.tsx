import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@textkernel/oneui';

const meta: Meta<typeof StatusBadge> = {
    title: 'Atoms/Badges',
    component: StatusBadge,
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const _StatusBadge: Story = {
    args: {
        children: 'Lorem',
    },
    render: (args) => <StatusBadge {...args} />,
};
