import React from 'react';
import { storiesOf } from '@storybook/react';
import { Slider } from '@textkernel/oneui';

storiesOf('Slider', module).add(
    'Slider',
    () => <Slider min={0} max={100} defaultValue={10} onChange={value => console.log(value)} />,
    {
        info: {
            text: `
            ## Usage information
            This component is a wrapper around [rc-slider](https://github.com/react-component/slider).
            
            Full list of props available to pass you can find [here](https://github.com/react-component/slider#api).`
        }
    }
);
