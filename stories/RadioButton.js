import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { RadioButton, RadioButtonGroup } from '@textkernel/oneui';

storiesOf('Molecules/RadioButton', module)
    .addDecorator(withKnobs)
    .add('RadioButton', () => (
        <RadioButtonGroup
            name="my-group"
            onChange={(e) =>
                console.log('onChange was called with event.target.value: ', e.target.value)
            }
        >
            <RadioButton disabled={boolean('Disabled 1', false)} value="option1" id="radio-1">
                {text('RadioButton 1 label', 'Option 1')}
            </RadioButton>
            <RadioButton disabled={boolean('Disabled 2', false)} value="option2" id="radio-2">
                {text('RadioButton 2 label', 'Option 2')}
            </RadioButton>
        </RadioButtonGroup>
    ));
