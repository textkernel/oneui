import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@textkernel/oneui';
import { CounterBadge } from '@textkernel/oneui/components/Badges/CounterBadge';
import Check from '@material-design-icons/svg/outlined/check.svg';

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
        leadingIcon: <Check />,
    },
    render: (args) => <StatusBadge {...args} />,
};

type CounterBadgeStory = StoryObj<typeof CounterBadge>;

export const _CounterBadge: CounterBadgeStory = {
    args: {
        children: '+1',
        variant: 'subtle',
        arrowDirection: 'up',
        arrowAriaLabel: 'Up arrow',
        context: 'success',
    },
    render: (args) => <CounterBadge {...args} />,
};

export const _CounterBadgeWithoutArrow: CounterBadgeStory = {
    args: {
        children: '+1',
        variant: 'subtle',
        context: 'success',
    },
    render: (args) => <CounterBadge {...args} />,
};
