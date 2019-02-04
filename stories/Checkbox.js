import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Checkbox from '../src/components/Checkbox';

storiesOf('Checkbox', module)
    .addDecorator(withKnobs)
    .add('Checkbox', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={e => {
                // eslint-disable-next-line no-console
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
            onChange={e => console.log('Checkbox state changed', e)} // eslint-disable-line no-console
            defaultChecked
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ));
