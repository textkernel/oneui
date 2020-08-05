import * as React from 'react';
import { Range, RangeProps } from 'rc-slider';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
export const RangeSlider: React.FC<RangeProps> = (props) => <Range {...props} />;

RangeSlider.displayName = 'RangeSlider';

RangeSlider.defaultProps = {
    defaultValue: [0, 100],
};
