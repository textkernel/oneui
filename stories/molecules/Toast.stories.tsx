import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CONTEXTS, Toast } from '@textkernel/oneui';

const meta: Meta<typeof Toast> = {
    title: 'Molecules/Toast',
    component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const NotActionableToast: Story = {
    name: 'Normal Toast',
    args: {
        title: 'Success',
        content: 'This is a toast',
        context: CONTEXTS[1],
    },
    render: (args) => <Toast {...args} />,
};

export const ActionableToast: Story = {
    name: 'Actionable Toast',
    args: {
        title: 'Success',
        content: 'This is an Actionable toast',
        context: CONTEXTS[1],
        actionOne: {
            text: 'Action 1',
            href: '/action-one',
        },
    },
    render: (args) => <Toast {...args} />,
};
