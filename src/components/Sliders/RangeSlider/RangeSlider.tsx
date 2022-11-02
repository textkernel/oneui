import * as React from 'react';
import Range, { RangeProps } from 'rc-slider/lib/Range';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
const RangeSlider = ({ defaultValue = [0, 100], ...rest }) => (
    <Range defaultValue={defaultValue} {...rest} />
);

RangeSlider.displayName = 'RangeSlider';

export { RangeSlider, RangeProps };
