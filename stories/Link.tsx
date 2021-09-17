import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import { Link } from '@textkernel/oneui';

storiesOf('Atoms/Link', module)
    .addDecorator(withKnobs)
    .add('Link', () => (
        <Link
            target="_blank"
            href="https://textkernel.com"
            context={select('Context', ['muted', 'brand'], 'brand')}
        >
            {text('Link text', 'Click me')}
        </Link>
    ));
