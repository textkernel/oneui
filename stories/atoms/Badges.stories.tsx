import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@textkernel/oneui';
import { FaCheck } from 'react-icons/fa';

const meta: Meta<typeof StatusBadge> = {
    title: 'Atoms/Badges',
    component: StatusBadge,
};

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const _StatusBadge: Story = {
    args: {
        children: 'Info',
        variant: 'bold',
    },
    render: (args) => <StatusBadge {...args} />,
};

export const _StatusBadgeWithLeadingIcon: Story = {
    args: {
        children: 'Checked',
        variant: 'bold',
        leadingIcon: <FaCheck />,
    },
    render: (args) => <StatusBadge {...args} />,
};
