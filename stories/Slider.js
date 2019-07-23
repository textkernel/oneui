import React from 'react';
import { storiesOf } from '@storybook/react';
import { Slider } from '@textkernel/oneui';
import { number, withKnobs } from '@storybook/addon-knobs';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add(
        'Slider',
        () => (
            <Slider
                min={number('Min value', 0)}
                max={number('Max value', 100)}
                step={number('Step', 1)}
                defaultValue={10}
            />
        ),
        {
            info: {
                text: `
                ## Usage information
                This component is a wrapper around [rc-slider](https://github.com/react-component/slider).
                
                Full list of props available to pass you can find [here](https://github.com/react-component/slider#api).`
            }
        }
    );
