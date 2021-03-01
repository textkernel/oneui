import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Toggle } from '@textkernel/oneui';

storiesOf('Molecules|Toggle', module)
    .addDecorator(withKnobs)
    .add('Toggle with label', () => (
        <Toggle
            disabled={boolean('disabled', false)}
            id={text('id', 'my-toggle-1')}
            onChange={(event) => {
                console.log('Toggle state changed. event.target.checked: ', event.target.checked);
            }}
        >
            {text('children', 'This is title!')}
        </Toggle>
    ))
    .add('Toggle without label', () => (
        <Toggle
            disabled={boolean('disabled', false)}
            id={text('id', 'my-toggle-2')}
            onChange={(event) => {
                console.log('Toggle state changed. event.target.checked: ', event.target.checked);
            }}
        />
    ));
