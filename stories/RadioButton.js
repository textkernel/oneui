import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { RadioButton } from '@textkernel/oneui';

storiesOf('RadioButton', module)
    .addDecorator(withKnobs)
    .add('RadioButton', () => (
        <div>
            <RadioButton
                disabled={boolean('Disabled 1', false)}
                value="option1"
                id="radio-1"
                name="my-group"
                onChange={e => {
                    const { value } = e.target;
                    console.log(`Radio value changed to ${value}`, e);
                }}
            >
                {text('RadioButton 1 label', 'Option 1')}
            </RadioButton>
            <RadioButton
                disabled={boolean('Disabled 2', false)}
                value="option2"
                id="radio-2"
                name="my-group"
                onChange={e => {
                    const { value } = e.target;
                    console.log(`Radio value changed to ${value}`, e);
                }}
            >
                {text('RadioButton 2 label', 'Option 2')}
            </RadioButton>
        </div>
    ));
