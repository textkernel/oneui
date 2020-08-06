import * as React from 'react';
import RCSlider from 'rc-slider/lib/Slider';
import '../Slider.scss';

// Technical notes:
// * rc-slider seems not to support forward ref with RefObject,
//   related errors are visible when using TS
//   see: https://github.com/react-component/slider/blob/80b0bf61b412d5db06241610ed5e6340a159a2f6/src/common/createSlider.tsx#L246
// * version 9.3.1 is not JSX/TSX compatible
//   see: https://github.com/react-component/slider/issues/656
// * using TS with version 9.2.4 throws at build time, possibly because of old babel dependencies in rc-slider. This deps are upgraded in 9.3.1
export const Slider = (props) => <RCSlider {...props} />;

Slider.displayName = 'Slider';
