import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { Link } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Link', module)
    .addDecorator(withKnobs)
    .add('Link', () => (
        <Link
            target="_blank"
            href="https://textkernel.com"
            context={select('Context', ['default', 'muted', ...CONTEXTS], 'default')}
        >
            {text('Link text', 'Click me')}
        </Link>
    ));
