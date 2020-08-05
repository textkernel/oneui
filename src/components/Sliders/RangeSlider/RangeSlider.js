import * as React from 'react';
import Range from 'rc-slider/lib/Range';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
export const RangeSlider = (props) => <Range {...props} />;

RangeSlider.displayName = 'RangeSlider';

RangeSlider.defaultProps = {
    defaultValue: [0, 100],
};
