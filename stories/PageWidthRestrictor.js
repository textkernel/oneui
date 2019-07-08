import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { PageWidthRestrictor } from '@textkernel/oneui';

storiesOf('PageWidthRestrictor', module)
    .addDecorator(withKnobs)
    .add('PageWidthRestrictor', () => (
        <div style={{ backgroundColor: 'teal' }}>
            <PageWidthRestrictor
                As={text('Tag for component', 'div')}
                style={{ backgroundColor: 'darkturquoise' }}
            >
                {text('Content', 'This is a placeholder for children')}
            </PageWidthRestrictor>
        </div>
    ));
