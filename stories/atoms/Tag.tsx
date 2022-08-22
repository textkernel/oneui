import * as React from 'react';
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

export const _Tag = (args) => {
    return (
        <div
            style={{
                padding: '5px',
            }}
        >
            <Tag {...args} />
        </div>
    );
};
_Tag.args = {
    bgColor: '#3eff2b',
    isSelected: false,
    maxWidth: 'fit-content',
    size: 'normal',
    children: 'This is an extremely long long text!',
};
