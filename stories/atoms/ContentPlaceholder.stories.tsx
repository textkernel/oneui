import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContentPlaceholder } from '@textkernel/oneui';

const meta: Meta<typeof ContentPlaceholder> = {
    title: 'Atoms/ContentPlaceholder',
    component: ContentPlaceholder,
};

export default meta;

type Story = StoryObj<typeof ContentPlaceholder>;

const SimpleImplementation = (args) => (
    <div style={{ width: 400 }}>
        <ContentPlaceholder {...args} width={undefined} />
        <ContentPlaceholder {...args} />
        <ContentPlaceholder {...args} withoutMargin />
    </div>
);

export const ContentPlaceholderSimple: Story = {
    name: 'Simple implementation',
    render: (args) => <SimpleImplementation {...args} />,
};

const CustomImplementation = (args) => (
    <div style={{ width: 400 }}>
        <div style={{ lineHeight: '12px', marginBottom: '5px' }}>
            <ContentPlaceholder {...args} withoutMargin />
        </div>
        <div style={{ lineHeight: '14px', marginBottom: '5px' }}>
            <ContentPlaceholder {...args} withoutMargin />
        </div>
        <div style={{ lineHeight: '16px' }}>
            <ContentPlaceholder {...args} withoutMargin />
        </div>
    </div>
);

export const ContentPlaceholderCustome: Story = {
    name: 'Custom implementation',
    render: (args) => <CustomImplementation {...args} />,
};
