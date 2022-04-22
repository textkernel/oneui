import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Checkbox, Text } from '@textkernel/oneui';

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
    ))
    .add('Checkbox with not just string as label', () => (
        <Checkbox
            disabled={boolean('Disabled', false)}
            id={text('Id', 'checkbox-1')}
            onChange={(e) => console.log('Checkbox state changed', e)}
        >
            <Text inline style={{ color: 'turquoise' }} className="test-class">
                {text('Checkbox label', 'Select me!')}
            </Text>
        </Checkbox>
    ));
