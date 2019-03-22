import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { ContentPlaceholder } from '@textkernel/oneui';

storiesOf('ContentPlaceholder', module)
    .addDecorator(withKnobs)
    .add('ContentPlaceholder', () => {
        const duration = number('Animation duration in seconds', 1);
        const height = number('Custom height in pixels', 15);

        return (
            <div style={{ width: number('Container width in pixels', 400) }}>
                <ContentPlaceholder
                    duration={duration}
                    height={height}
                    width={number('Width for placeholder 1', 100)}
                />
                <ContentPlaceholder
                    duration={duration}
                    height={height}
                    width={number('Width for placeholder 2', 55)}
                />
                <ContentPlaceholder
                    duration={duration}
                    height={height}
                    width={number('Width for placeholder 3', 65)}
                />
            </div>
        );
    });
