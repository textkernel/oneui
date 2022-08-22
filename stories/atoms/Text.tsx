import * as React from 'react';
import { Text, MarkedText } from '@textkernel/oneui';

export default {
    title: 'Atoms/Text',
    component: Text,
    subcomponents: { MarkedText },
};

export const _Text = (args) => <Text {...args} />;
_Text.args = {
    children: 'This is some text content',
};

export const _MarkedText = (args) => <MarkedText {...args} />;
_MarkedText.storyName = 'Marked text';
_MarkedText.args = {
    marker: 'so',
    children: 'This is some text content',
};
