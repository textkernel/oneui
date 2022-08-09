import * as React from 'react';
import { TextArea } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '@textkernel/oneui/constants';

export default {
    title: 'Atoms/TextArea',
    component: TextArea,
};

export const DefaultBehavior = (args) => <TextArea {...args} />;
DefaultBehavior.storyName = 'Default behavior';
DefaultBehavior.args = {
    context: CONTEXTS[1],
    defaultValue: 'This is a default value',
    placeholder: 'Some text goes here...',
    size: SIZES[1],
};

export const ControlledComponent = (args) => <TextArea {...args} />;
ControlledComponent.storyName = 'Controlled component';
ControlledComponent.args = {
    context: CONTEXTS[1],
    onChange: (e) => {
        const { value } = e.target;
        console.log(value);
    },
    placeholder: 'While typing, check your console log...',
    size: SIZES[1],
    value: '',
};
