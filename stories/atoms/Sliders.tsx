import * as React from 'react';
import { Slider, RangeSlider } from '@textkernel/oneui';

export default {
    title: 'Atoms/Slider',
    component: Slider,
    subcomponents: { RangeSlider },
};

export const _Slider = (args) => <Slider {...args} />;
_Slider.args = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 10,
};

export const _RangeSlider = (args) => <RangeSlider {...args} />;
_RangeSlider.args = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [10, 80],
};
