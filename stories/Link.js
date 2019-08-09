import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Link } from '@textkernel/oneui';

storiesOf('Atoms|Link', module)
    .addDecorator(withKnobs)
    .add('Link', () => (
        <Link target="_blank" href="https://textkernel.com">
            {text('Link text', 'Click me')}
        </Link>
    ));
