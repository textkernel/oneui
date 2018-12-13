import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Link from '../src/components/Link';

storiesOf('Link', module)
    .addDecorator(withKnobs)
    .add('Link', () => (
        <Link target="_blank" href="http://textkernel.com">
            {text('Link text', 'Click me')}
        </Link>
    ));
