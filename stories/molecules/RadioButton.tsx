import * as React from 'react';
import { RadioButton, RadioButtonGroup } from '@textkernel/oneui';

export default {
    title: 'Molecules/RadioButton',
    component: RadioButton,
    subcomponents: { RadioButtonGroup },
};

export const _RadioButton = (args) => (
    <RadioButtonGroup name="my-group">
        <RadioButton {...args} />
        <RadioButton id="radio-2" value="option2">
            Option 2
        </RadioButton>
    </RadioButtonGroup>
);

_RadioButton.args = {
    value: 'option1',
    id: 'radio-1',
    children: 'Option 1',
};
