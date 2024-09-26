import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@textkernel/oneui';
import { OLD_SIZES as SIZES } from '@textkernel/oneui/constants';

const meta: Meta<typeof TextArea> = {
    title: 'Atoms/TextArea',
    component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const DefaultBehavior: Story = {
    name: 'Default behavior',
    args: {
        defaultValue: 'This is a default value',
        placeholder: 'Some text goes here...',
        size: SIZES[1],
    },
    render: (args) => <TextArea {...args} />,
};

export const ControlledComponent: Story = {
    name: 'Controlled component',
    args: {
        onChange: (e) => {
            const { value } = e.target;
            console.log(value);
        },
        placeholder: 'While typing, check your console log...',
        size: SIZES[1],
        value: '',
    },
    render: (args) => <TextArea {...args} />,
};
