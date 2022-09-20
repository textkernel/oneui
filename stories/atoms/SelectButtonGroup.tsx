import * as React from 'react';
import { SelectButtonGroup, SelectButton } from '@textkernel/oneui';

export default {
    title: 'Atoms/SelectButtonGroup',
    component: SelectButtonGroup,
    subcomponents: { SelectButton },
};

export const Uncontrolled = (args) => (
    <SelectButtonGroup<string> {...args}>
        <SelectButton value="1" key="button 1">
            Option 1
        </SelectButton>
        <SelectButton value="2" key="button 2">
            Option 2
        </SelectButton>
        <SelectButton value="3" key="button 3">
            Option 3
        </SelectButton>
    </SelectButtonGroup>
);
Uncontrolled.args = {
    defaultValue: ['3'],
};

export const Controlled = (args) => {
    const buttons = {
        '1': args.button1,
        '2': args.button2,
        '3': args.button3,
    };
    const keys = Object.keys(buttons);

    return (
        <SelectButtonGroup value={keys.filter((k) => buttons[k])}>
            {keys.map((buttonNumber) => (
                <SelectButton
                    key={`button-${buttonNumber}`}
                    value={buttonNumber}
                    context={args[`context${buttonNumber}`]}
                >
                    Button {buttonNumber}
                </SelectButton>
            ))}
        </SelectButtonGroup>
    );
};
Controlled.args = {
    button1: true,
    button2: false,
    button3: false,
    context1: 'primary',
    context2: 'primary',
    context3: 'primary',
};
