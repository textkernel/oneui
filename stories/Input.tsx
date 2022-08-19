import * as React from 'react';
import { Input } from '@textkernel/oneui';

export default {
    title: 'Atoms/Input',
    component: Input,
};

export const Uncontrolled = (args) => <Input {...args} />;
Uncontrolled.args = {
    placeholder: 'Some text goes here...',
};

export const Controlled = (args) => <Input {...args} />;
Controlled.args = {
    placeholder: 'While typing, check your console log...',
    onChange: (e) => {
        console.log(e.target.value);
    },
    value: '',
};
