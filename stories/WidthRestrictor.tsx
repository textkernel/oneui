import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { PageWidthRestrictor, BlockWidthRestrictor } from '@textkernel/oneui';

storiesOf('Atoms|WidthRestrictor', module)
    .addDecorator(withKnobs)
    .add('PageWidthRestrictor', () => (
        <div style={{ backgroundColor: 'teal' }}>
            <PageWidthRestrictor style={{ backgroundColor: 'darkturquoise' }}>
                {text('Content', 'This is a placeholder for children')}
            </PageWidthRestrictor>
        </div>
    ))
    .add('BlockWidthRestrictor', () => (
        <div style={{ backgroundColor: 'teal' }}>
            <BlockWidthRestrictor
                As={text('Tag for component', 'div')}
                style={{ backgroundColor: 'darkturquoise' }}
            >
                {text('Content', 'This is a placeholder for children')}
            </BlockWidthRestrictor>
        </div>
    ));
