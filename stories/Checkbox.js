import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Checkbox } from '@textkernel/oneui';

storiesOf('Checkbox', module)
    .addDecorator(withKnobs)
    .add('Checkbox', () => (
        <Checkbox disabled={boolean('Disabled', false)} id={text('Id', 'checkbox-1')}>
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ))
    .add('Checkbox with callback', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={() => alert('clicked')} // eslint-disable-line no-undef, no-alert
            defaultChecked
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ));
