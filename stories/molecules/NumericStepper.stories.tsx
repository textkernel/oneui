import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumericStepper } from '@textkernel/oneui';

const meta: Meta<typeof NumericStepper> = {
    title: 'Molecules/NumericStepper',
    component: NumericStepper,
};

export default meta;

type Story = StoryObj<typeof NumericStepper>;

export const _NumericStepper: Story = {
    name: 'NumericStepper',
    args: {
        step: 10,
        minValue: 0,
        maxValue: 100,
        defaultValue: 50,
        customWidth: '3ch',
    },
    render: (args) => <NumericStepper {...args} />,
};
