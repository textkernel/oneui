import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Slider, RangeSlider } from '@textkernel/oneui';
import { number, withKnobs } from '@storybook/addon-knobs';

storiesOf('Atoms|Slider', module)
    .addDecorator(withKnobs)
    .add(
        'Slider',
        () => (
            <Slider
                min={number('Min value', 0)}
                max={number('Max value', 100)}
                step={number('Step', 1)}
                defaultValue={10}
                onChange={(value) => console.log(value)}
            />
        ),
        {
            info: {
                text: `
                ## Usage information
                This component is a wrapper around [rc-slider](https://github.com/react-component/slider).
                
                Full list of props available to pass you can find [here](https://github.com/react-component/slider#api).`,
            },
        }
    )
    .add(
        'Range Slider',
        () => (
            <RangeSlider
                min={number('Min value', 0)}
                max={number('Max value', 100)}
                step={number('Step', 1)}
                defaultValue={[10, 80]}
                onChange={(value) => console.log(value)}
            />
        ),
        {
            info: {
                text: `
            ## Usage information
            This component is a wrapper around [rc-slider](https://github.com/react-component/slider).
            
            Full list of props available to pass you can find [here](https://github.com/react-component/slider#api).`,
            },
        }
    )
    .add(
        'Uneven marks',
        () => {
            const [range, setRange] = React.useState([0,5])
            const lowerBound = ['1','10','50','200','500'];
            const upperBound = ['9','49','199','999','1000+'];
            return (
                <>
                    <RangeSlider
                        min={number('Min value', 0)}
                        max={number('Max value', 5)}
                        step={1}
                        value={range}
                        onChange={([lower, upper]) => setRange([Math.min(lower,4), Math.max(upper, 1)])}
                    />
                    { lowerBound[range[0]] } - { upperBound[range[1] - 1]}
                </>
            );
        }
    );
