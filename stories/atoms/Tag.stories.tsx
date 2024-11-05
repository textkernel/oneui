import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@textkernel/oneui';

const meta: Meta<typeof Tag> = {
    title: 'Atoms/Tag',
    component: Tag,
    argTypes: {
        bgColor: {
            options: ['#3eff2b', '#ffa139', 'var(--color-background)'],
        },
        size: {
            options: ['small', 'medium', 'large'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const _Tag: Story = {
    name: 'Tag',
    args: {
        isSelected: false,
        maxWidth: '200px',
        children: 'This is an extremely long long text!',
        onClick: () => {
            console.log('onClick: The tag has been clicked');
        },
        onDelete: () => {
            console.log('onDelete: The delete button has been clicked');
        },
    },
    render: (args) => (
        <div
            style={{
                padding: '5px',
            }}
        >
            <Tag {...args} />
        </div>
    ),
};

export const ReadOnlyTag: Story = {
    name: 'ReadOnly Tag',
    args: {
        maxWidth: '100px',
        children: <>Read Only</>,
        contentClassName: 'test-class',
        contentStyle: {
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-75)',
        },
        onDelete: undefined,
        onClick: undefined,
    },
    render: (args) => (
        <div
            style={{
                padding: '5px',
            }}
        >
            <Tag {...args} />
        </div>
    ),
};

export const ColoredTag: Story = {
    name: 'Colored Tag',
    args: {
        bgColor: '#0097D1',
        maxWidth: '100px',
        children: <>Colored Tag</>,
        contentClassName: 'test-class',
        contentStyle: {
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-75)',
        },
        onDelete: undefined,
    },
    render: (args) => (
        <div
            style={{
                padding: '5px',
            }}
        >
            <Tag {...args} />
        </div>
    ),
};
