import * as React from 'react';
import RCSlider, { SliderProps } from 'rc-slider';
import '../Slider.scss';

/** Technical notes:
 * rc-slider seems not to support forward ref with RefObject,
 *    see: https://github.com/react-component/slider/blob/80b0bf61b412d5db06241610ed5e6340a159a2f6/src/common/createSlider.tsx#L246
 * version 9.3.0 is not TS compatible
 *    see: https://github.com/react-component/slider/issues/656
 */
export interface Props extends Omit<SliderProps, 'ref'> {
    /** Set initial value of slider */
    defaultValue: number;
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

export const Slider: React.FC<Props> = (props) => <RCSlider {...props} />;

Slider.displayName = 'Slider';

Slider.defaultProps = {
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
};
