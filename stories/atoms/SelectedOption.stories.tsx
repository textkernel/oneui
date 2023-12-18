import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectedOption } from '@textkernel/oneui';

const meta: Meta<typeof SelectedOption> = {
    title: 'Atoms/SelectedOption',
    component: SelectedOption,
};

export default meta;

type Story = StoryObj<typeof SelectedOption>;

export const _SelectedOption: Story = {
    name: 'SelectedOption',
    args: {
        As: 'div',
        children: 'My chosen option',
    },
    render: (args) => (
        <div style={{ maxWidth: '250px' }}>
            <SelectedOption {...args} />
            <SelectedOption
                onDelete={() => {
                    console.log('onDelete was called on option 2');
                }}
            >
                My other chosen option that is truncated if too long
            </SelectedOption>
            <SelectedOption
                onDelete={() => {
                    console.log('onDelete was called on option 3');
                }}
            >
                <span>This is a node, and formatting is up to you. No matter how long it is.</span>
            </SelectedOption>
        </div>
    ),
};
