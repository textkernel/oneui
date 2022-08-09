import * as React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { SelectedOption } from '@textkernel/oneui';

export default {
    title: 'Atoms/SelectedOption',
    component: SelectedOption,
};

export const _SelectedOption = (args) => (
    <div style={{ maxWidth: '250px' }}>
        <SelectedOption {...args} />
        <SelectedOption
            As={text('HTML element in which to render it', 'div')}
            onDelete={() => {
                console.log('onDelete was called on option 2');
            }}
        >
            {text('Option label 2', 'My other chosen option that is truncated if too long')}
        </SelectedOption>
        <SelectedOption
            onDelete={() => {
                console.log('onDelete was called on option 3');
            }}
        >
            <span>This is a node, and formatting is up to you. No matter how long it is.</span>
        </SelectedOption>
    </div>
);

_SelectedOption.args = {
    As: 'div',
    children: 'My chosen option',
};
