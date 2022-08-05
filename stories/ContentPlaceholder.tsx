import * as React from 'react';
import { ContentPlaceholder } from '@textkernel/oneui';

export default {
    title: 'Atoms/ContentPlaceholder',
    component: ContentPlaceholder,
};

export const SimpleImplementation = (args) => (
    <div style={{ width: 400 }}>
        <ContentPlaceholder {...args} width={undefined} />
        <ContentPlaceholder {...args} />
        <ContentPlaceholder {...args} withoutMargin />
    </div>
);
SimpleImplementation.storyName = 'Simple implementation';

export const CustomImplementation = (args) => (
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
CustomImplementation.storyName = 'Custom implementation';
