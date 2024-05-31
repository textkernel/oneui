import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FieldWrapper, Text } from '@textkernel/oneui';

const meta: Meta<typeof FieldWrapper> = {
    title: 'Molecules/FieldWrapper',
    component: FieldWrapper,
};

export default meta;

type Story = StoryObj<typeof FieldWrapper>;

export const _FieldWrapper: Story = {
    name: 'FieldWrapper',
    args: {
        clearTooltipLabel: 'Clear',
        showClearButton: true,
        isFocused: false,
        style: { width: '600px', minHeight: '40px' },
        children: (
            <>
                <Text style={{ margin: 'var(--space-50)' }} context="neutral">
                    Some text or elements to be rendered within the wrapper
                </Text>
                <input
                    style={{ margin: 'var(--space-50)' }}
                    placeholder="Add input field if needed..."
                />
            </>
        ),
    },
    render: (args) => <FieldWrapper {...args} />,
};
