import * as React from 'react';
import Slider from 'rc-slider/lib/Slider';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
const RangeSlider = ({ defaultValue = [0, 100], ...rest }) => (
    <Slider range defaultValue={defaultValue} {...rest} />
);

RangeSlider.displayName = 'RangeSlider';

export { RangeSlider };
