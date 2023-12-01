import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@textkernel/oneui';

const meta: Meta<typeof ProgressBar> = {
    title: 'Atoms/ProgressBar',
    component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const _ProgressBar: Story = {
    name: 'ProgressBar',
    args: {
        animated: true,
        percentage: 50,
        children: 'Loading...',
    },
    render: (args) => <ProgressBar {...args} />,
};
