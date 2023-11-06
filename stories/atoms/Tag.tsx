import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Tag } from '@textkernel/oneui';

export default {
    title: 'Atoms/Tag',
    component: Tag,
    argTypes: {
        bgColor: {
            options: ['#3eff2b', '#ffa139', 'var(--color-background)'],
        },
        size: {
            options: ['small', 'normal', 'large'],
        },
    },
};

export const _Tag = (args) => (
    <div
        style={{
            padding: '5px',
        }}
    >
        <Tag {...args} />
    </div>
);
_Tag.args = {
    bgColor: '#3eff2b',
    isSelected: false,
    maxWidth: 'fit-content',
    size: 'normal',
    children: 'This is an extremely long long text!',
};

export const TagWithIcon = (args) => (
    <div
        style={{
            padding: '5px',
        }}
    >
        <Tag {...args} />
    </div>
);
TagWithIcon.args = {
    bgColor: '#3eff2b',
    isSelected: false,
    maxWidth: 'fit-content',
    size: 'normal',
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
        gap: 'var(--spacing-2x)',
    },
    onDelete: undefined,
};
