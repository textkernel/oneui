import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Link } from '@textkernel/oneui';

storiesOf('Link', module)
    .addDecorator(withKnobs)
    .add('Link', () => (
        <Link target="_blank" href="https://textkernel.com">
            {text('Link text', 'Click me')}
        </Link>
    ));
