import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Checkbox } from '@textkernel/oneui';

storiesOf('Molecules|Checkbox', module)
    .addDecorator(withKnobs)
    .add('Checkbox', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={(e) => {
                console.log('Checkbox state changed', e);
            }}
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ))
    .add('Checkbox with callback', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={(e) => console.log('Checkbox state changed', e)}
            defaultChecked
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ));
