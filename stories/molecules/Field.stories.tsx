import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field, Input } from '@textkernel/oneui';

const meta: Meta<typeof Field> = {
    title: 'Molecules/Field',
    component: Field,
};

export default meta;

type Story = StoryObj<typeof Field>;

export const _Field: Story = {
    name: 'Field',
    args: {
        labelText: 'Some label',
    },
    render: (args) => (
        <Field {...args}>
            <Input />
        </Field>
    ),
};
