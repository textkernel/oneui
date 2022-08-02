import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { ContentPlaceholder } from '@textkernel/oneui';

storiesOf('Atoms/ContentPlaceholder', module)
    .addDecorator(withKnobs)
    .add('Simple implementation', () => {
        const duration = number('Animation duration in seconds', 0);
        const height = number('Custom height in pixels', 0);

        return (
            <div style={{ width: 400 }}>
                <ContentPlaceholder duration={duration || undefined} height={height || undefined} />
                <ContentPlaceholder
                    duration={duration || undefined}
                    height={height || undefined}
                    width={number('Width for placeholder 2', 55)}
                />
                <ContentPlaceholder
                    duration={duration || undefined}
                    height={height || undefined}
                    width={number('Width for placeholder 3', 65)}
                    withoutMargin
                />
            </div>
        );
    })
    .add('Custom implementation', () => {
        const duration = number('Animation duration in seconds', 0);

        return (
            <div style={{ width: number('Container width in pixels', 400) }}>
                <div style={{ lineHeight: '12px', marginBottom: '5px' }}>
                    <ContentPlaceholder duration={duration || undefined} withoutMargin />
                </div>
                <div style={{ lineHeight: '14px', marginBottom: '5px' }}>
                    <ContentPlaceholder
                        duration={duration || undefined}
                        width={number('Width for placeholder 2', 55)}
                        withoutMargin
                    />
                </div>
                <div style={{ lineHeight: '16px' }}>
                    <ContentPlaceholder
                        duration={duration || undefined}
                        width={number('Width for placeholder 3', 65)}
                        withoutMargin
                    />
                </div>
            </div>
        );
    });
