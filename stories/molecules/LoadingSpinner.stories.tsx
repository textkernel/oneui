import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '@textkernel/oneui';

const meta: Meta<typeof LoadingSpinner> = {
    title: 'Molecules/LoadingSpinner',
    component: LoadingSpinner,
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const _LoadingSpinner: Story = {
    name: 'LoadingSpinner',
    args: {
        children: 'Loading...',
    },
    render: (args) => <LoadingSpinner {...args} />,
};
