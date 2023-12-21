import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer, Link } from '@textkernel/oneui';

const meta: Meta<typeof Footer> = {
    title: 'Molecules/Footer',
    component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const _Footer: Story = {
    name: 'Footer',
    args: {
        children: 'This is a placeholder for children',
    },
    render: ({ children, ...args }) => (
        <Footer {...args}>
            {children}
            <Link href="/"> and a link</Link>
        </Footer>
    ),
};
