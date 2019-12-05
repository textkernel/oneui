import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { SelectedOption } from '@textkernel/oneui';

storiesOf('Atoms|SelectedOption', module)
    .addDecorator(withKnobs)
    .add('SelectedOption', () => (
        <div>
            <SelectedOption
                As={text('HTML element in which to render it', 'div')}
                onDelete={() => {
                    console.log('onDelete was called on option 1');
                }}
            >
                {text('Option label 1', 'My chosen option')}
            </SelectedOption>
            <SelectedOption
                As={text('HTML element in which to render it', 'div')}
                onDelete={() => {
                    console.log('onDelete was called on option 2');
                }}
            >
                {text('Option label 2', 'My other chosen option')}
            </SelectedOption>
        </div>
    ));
