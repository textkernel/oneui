import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { ContentPlaceholder } from '@textkernel/oneui';

storiesOf('ContentPlaceholder', module)
    .addDecorator(withKnobs)
    .add('ContentPlaceholder', () => {
        const duration = number('Animation duration in seconds', 1);
        const height = number('Custom height', 15);

        return (
            <div style={{ width: number('Container width', 400) }}>
                <ContentPlaceholder duration={duration} height={height} />
                <ContentPlaceholder duration={duration} height={height} width={55} />
                <ContentPlaceholder duration={duration} height={height} width={65} />
            </div>
        );
    });
