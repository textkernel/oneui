import * as React from 'react';
import RCSlider, { SliderProps } from 'rc-slider/lib/Slider';
import '../Slider.scss';

// Technical notes:
// * rc-slider seems not to support forward ref with RefObject,
//   related errors are visible when using TS
//   see: https://github.com/react-component/slider/blob/80b0bf61b412d5db06241610ed5e6340a159a2f6/src/common/createSlider.tsx#L246

/**
 * ## Usage information
 * This component is a wrapper around [rc-slider](https://github.com/react-component/slider).
 * Full list of props available to pass you can find [here](https://github.com/react-component/slider#api).
 */
const Slider = (props: SliderProps) => <RCSlider {...props} />;

Slider.displayName = 'Slider';

export { Slider, SliderProps };
