import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton, RadioButtonGroup } from '@textkernel/oneui';

const meta: Meta<typeof RadioButton> = {
    title: 'Molecules/RadioButton',
    component: RadioButton,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { RadioButtonGroup } as any,
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const _RadioButton: Story = {
    name: 'RadioButton',
    args: {
        value: 'option1',
        id: 'radio-1',
        children: 'Option 1',
    },
    render: (args) => (
        <RadioButtonGroup name="my-group">
            <RadioButton {...args} />
            <RadioButton id="radio-2" value="option2">
                Option 2
            </RadioButton>
        </RadioButtonGroup>
    ),
};
