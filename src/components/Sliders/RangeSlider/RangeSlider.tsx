import * as React from 'react';
import { Range, RangeProps } from 'rc-slider';
import '../Slider.scss';

/** See technical notes in Slider.tsx */
export interface Props extends RangeProps {
    /** Set initial range of slider [lower, higher] */
    defaultValue: [number, number];
    /** The minimum value of the slider */
    min: number;
    /** The maximum value of the slider */
    max: number;
    /**
     * Value to be added or subtracted on each step the slider makes.
     * Must be greater than zero, and max - min should be evenly divisible by the step value.
     */
    step: number;
}

export const RangeSlider: React.FC<Props> = (props) => <Range {...props} />;

RangeSlider.displayName = 'RangeSlider';

RangeSlider.defaultProps = {
    defaultValue: [0, 100],
    min: 0,
    max: 100,
    step: 1,
};
