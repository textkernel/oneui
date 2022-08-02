import * as React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { number, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { NumericStepper } from '@textkernel/oneui';

storiesOf('Molecules/NumericStepper', module)
    .addDecorator(withKnobs)
    .add(
        'NumericStepper',
        () => {
            const onChange = (value: number) => {
                console.log(`onChange was called with the following value: ${value}`);
            };
            return (
                <NumericStepper
                    onChange={onChange}
                    step={number('Step', 10)}
                    minValue={number('Minimum value', 0)}
                    maxValue={number('Maximum value', 100)}
                    defaultValue={number('Default value', 50)}
                    customWidth={text('Input width', '3ch')}
                />
            );
        },
        {
            info: {
                text: `
                  This component is used as a replacement for the traditional input component with step attribute 
                  (also knows as Input Stepper), but with custom up and down buttons.
                `,
            },
        }
    );
