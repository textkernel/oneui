import * as React from 'react';
import { Toggle } from '@textkernel/oneui';

export default {
    title: 'Molecules/Toggle',
    component: Toggle,
};

export const ToggleWithLabel = (args) => <Toggle {...args} />;
ToggleWithLabel.storyName = 'Toggle with label';
ToggleWithLabel.args = {
    id: 'my-toggle-1',
    children: 'This is title!',
};

export const ToggleWithoutLabel = (args) => <Toggle {...args} />;
ToggleWithoutLabel.storyName = 'Toggle without label';
ToggleWithoutLabel.args = {
    id: 'my-toggle-2',
};
