import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, array, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Checkbox from '../src/components/Checkbox';
import { CHECKBOX_VIEWBOX } from '../src/constants';

storiesOf('Checkbox', module)
    .addDecorator(withKnobs)
    .add('Checkbox', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            viewbox={array('Viewbox', CHECKBOX_VIEWBOX)}
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ))
    .add('Checkbox with callback', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            viewbox={array('Viewbox', CHECKBOX_VIEWBOX)}
            onChange={() => alert('clicked')} // eslint-disable-line no-undef, no-alert
        >
            {text('Checkbox label', 'Select me!')}
        </Checkbox>
    ));
