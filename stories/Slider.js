import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Slider } from '@textkernel/oneui';

const handleStyle = { borderColor: '#96dbfa' };

storiesOf('Slider', module)
    .addDecorator(
        withInfo({
            propTablesExclude: ['Slider', Slider, '"Story" Component']
        })
    )
    .add('Slider', () => (
        <Slider
            min={0}
            max={100}
            defaultValue={10}
            handleStyle={handleStyle}
            onChange={value => console.log(value)}
        />
    ));
