import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { ContentPlaceholder } from '@textkernel/oneui';

storiesOf('ContentPlaceholder', module)
    .addDecorator(withKnobs)
    .add('Simple implementation', () => {
        const duration = number('Animation duration in seconds', null);
        const height = number('Custom height in pixels', null);

        return (
            <div style={{ width: 400 }}>
                <ContentPlaceholder duration={duration} height={height} />
                <ContentPlaceholder
                    duration={duration}
                    height={height}
                    width={number('Width for placeholder 2', 55)}
                />
                <ContentPlaceholder
                    duration={duration}
                    height={height}
                    width={number('Width for placeholder 3', 65)}
                    withoutMargin
                />
            </div>
        );
    })
    .add('Custom implementation', () => {
        const duration = number('Animation duration in seconds', null);

        return (
            <div style={{ width: number('Container width in pixels', 400) }}>
                <div style={{ lineHeight: '12px', marginBottom: '5px' }}>
                    <ContentPlaceholder duration={duration} withoutMargin />
                </div>
                <div style={{ lineHeight: '14px', marginBottom: '5px' }}>
                    <ContentPlaceholder
                        duration={duration}
                        width={number('Width for placeholder 2', 55)}
                        withoutMargin
                    />
                </div>
                <div style={{ lineHeight: '16px' }}>
                    <ContentPlaceholder
                        duration={duration}
                        width={number('Width for placeholder 3', 65)}
                        withoutMargin
                    />
                </div>
            </div>
        );
    });
