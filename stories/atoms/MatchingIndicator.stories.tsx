import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MatchingIndicator } from '@textkernel/oneui';

const meta: Meta<typeof MatchingIndicator> = {
    title: 'Atoms/MatchingIndicator',
    component: MatchingIndicator,
};

export default meta;

type Story = StoryObj<typeof MatchingIndicator>;

export const _MatchingIndicator: Story = {
    name: 'MatchingIndicator',
    args: {
        percentage: 75,
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <MatchingIndicator percentage={25} />
            <MatchingIndicator percentage={50} />
            <MatchingIndicator {...args} />
        </div>
    ),
};
