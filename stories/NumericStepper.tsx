import * as React from 'react';
import { NumericStepper } from '@textkernel/oneui';

export default {
    title: 'Molecules/NumericStepper',
    component: NumericStepper,
};

export const _NumericStepper = (args) => <NumericStepper {...args} />;
_NumericStepper.args = {
    step: 10,
    minValue: 0,
    maxValue: 100,
    defaultValue: 50,
    customWidth: '3ch',
};
