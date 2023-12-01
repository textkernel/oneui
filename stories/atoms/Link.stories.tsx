import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@textkernel/oneui';

const meta: Meta<typeof Link> = {
    title: 'Atoms/Link',
    component: Link,
    render: (args) => <Link {...args} />,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const _Link: Story = {
    name: 'Link',
    args: {
        target: '_blank',
        href: 'https://textkernel.com',
        children: 'Click me',
    },
};
