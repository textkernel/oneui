import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider, RangeSlider } from '@textkernel/oneui';

const meta: Meta<typeof Slider> = {
    title: 'Atoms/Slider',
    component: Slider,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { RangeSlider } as any,
};

export default meta;

type SliderStory = StoryObj<typeof Slider>;

export const _Slider: SliderStory = {
    name: 'Slider',
    args: {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 10,
        onChange: (value: number | number[]) => console.log('onChange was called with:', value),
    },
    render: (args) => <Slider {...args} />,
};

type RangeSliderStory = StoryObj<typeof RangeSlider>;

export const _RangeSlider: RangeSliderStory = {
    name: 'RangeSlider',
    args: {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: [10, 80],
        onChange: (value: number) => console.log('onChange was called with:', value),
    },
    render: (args) => <RangeSlider {...args} />,
};
