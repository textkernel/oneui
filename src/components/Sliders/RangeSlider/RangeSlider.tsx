import * as React from 'react';
import Range, { RangeProps } from 'rc-slider/lib/Range';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
const RangeSlider = (props: RangeProps) => <Range {...props} />;

RangeSlider.displayName = 'RangeSlider';

RangeSlider.defaultProps = {
    defaultValue: [0, 100],
};

export { RangeSlider, RangeProps };
