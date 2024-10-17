import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@textkernel/oneui';

const meta: Meta<typeof Tooltip> = {
    title: 'Molecules/Tooltip',
    component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const _Tooltip: Story = {
    name: 'Tooltip',
    args: {
        placement: 'bottom',
        content: 'this is my tooltip text',
        children: <div>hover here to see the tooltip</div>,
    },
    render: (args) => (
        <div style={{ position: 'relative', display: 'table', margin: '0 auto' }}>
            <Tooltip {...args} />
        </div>
    ),
};
