import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, MarkedText } from '@textkernel/oneui';

const meta: Meta<typeof Text> = {
    title: 'Atoms/Text',
    component: Text,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { MarkedText } as any,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const _Text: Story = {
    name: 'Text',
    args: {
        children: 'This is some text content',
    },
    render: (args) => <Text {...args} />,
};

type MarkedTextStory = StoryObj<typeof MarkedText>;

export const _MarkedText: MarkedTextStory = {
    name: 'Marked text',
    args: {
        marker: 'so',
        children: 'This is some text content',
    },
    render: (args) => <MarkedText {...args} />,
};
