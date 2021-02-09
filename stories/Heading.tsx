import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { Heading } from '@textkernel/oneui';
import { HEADING_SIZES, CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Atoms|Heading', module)
    .addDecorator(withKnobs)
    .add('Heading', () => (
        <Heading
            context={select('Context', ['default', 'muted', ...CONTEXTS], 'default')}
            align={select('Text alignment', ['left', 'center', 'right'], 'left')}
            level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}
        >
            {text('Heading text', 'This is a heading')}
        </Heading>
    ));
