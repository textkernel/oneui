import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider, SectionTitle, SectionTitleMulti } from '@textkernel/oneui';

const meta: Meta<typeof Divider> = {
    title: 'Atoms/Seperators',
    component: Divider,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { Divider, SectionTitle } as any,
};

export default meta;

type DividerStory = StoryObj<typeof Divider>;

export const _Divider: DividerStory = {
    name: 'Divider',
    render: () => <Divider />,
};

type SectionTitleStory = StoryObj<typeof SectionTitle>;

export const _SectionTitle: SectionTitleStory = {
    name: 'SectionTitle',
    args: {
        title: 'Section Title',
    },
    render: (args) => <SectionTitle {...args} />,
};

type SectionTitleMultiStory = StoryObj<typeof SectionTitleMulti>;

export const _SectionTitleMulti: SectionTitleMultiStory = {
    name: 'SectionTitleMulti',
    args: {
        title: 'Section Title Multi',
        onChangeCheckbox: () => console.log('Change checkbox!'),
    },
    render: (args) => <SectionTitleMulti {...args} />,
};
