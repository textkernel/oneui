import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@textkernel/oneui';

const meta: Meta<typeof Heading> = {
    title: 'Atoms/Heading',
    component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const _Heading: Story = {
    args: {
        children: 'This is a heading',
    },
    render: (args) => <Heading {...args} />,
};
