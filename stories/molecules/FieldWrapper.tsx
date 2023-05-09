import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { FieldWrapper, Text } from '@textkernel/oneui';

export default {
    title: 'Molecules/FieldWrapper',
    component: FieldWrapper,
} as ComponentMeta<typeof FieldWrapper>;

export const _FieldWrapper = (args) => <FieldWrapper {...args} />;
_FieldWrapper.args = {
    clearTooltipLabel: 'Clear',
    showClearButton: true,
    isFocused: false,
    style: { width: '600px', minHeight: '40px' },
    children: (
        <>
            <Text style={{ margin: 'var(--spacing-normal)' }} context="neutral">
                Some text or elements to be rendered within the wrapper
            </Text>
            <input
                style={{ margin: 'var(--spacing-normal)' }}
                placeholder="Add input field if needed..."
            />
            <span id="clear-button" style={{ display: 'none'}}>Clear button</span>
            <span id="arrow-up" style={{ display: 'none'}}>Arrow UP</span>
            <span id="arrow-down" style={{ display: 'none'}}>Arrow Down</span>
        </>
    ),
};
