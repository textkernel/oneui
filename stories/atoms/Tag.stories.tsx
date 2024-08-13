import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FiCheck } from 'react-icons/fi';
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
        bgColor: '#3eff2b',
        isSelected: false,
        maxWidth: 'fit-content',
        size: 'medium',
        children: 'This is an extremely long long text!',
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

export const TagWithIcon: Story = {
    name: 'Tag with icon',
    args: {
        bgColor: '#3eff2b',
        isSelected: false,
        maxWidth: 'fit-content',
        size: 'medium',
        children: (
            <>
                <FiCheck />
                Some text
            </>
        ),
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
