import * as React from 'react';
import RCSlider, { SliderProps } from 'rc-slider';
import '../Slider.scss';

// Technical notes:
// * rc-slider seems not to support forward ref with RefObject,
//   see: https://github.com/react-component/slider/blob/80b0bf61b412d5db06241610ed5e6340a159a2f6/src/common/createSlider.tsx#L246
// * version 9.3.0 is not JSX/TSX compatible
//   see: https://github.com/react-component/slider/issues/656

export const Slider: React.FC<SliderProps> = (props) => <RCSlider {...props} />;

Slider.displayName = 'Slider';
