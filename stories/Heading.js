import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Heading from '../src/components/Heading';
import { HEADING_SIZES } from '../src/constants';

storiesOf('Heading', module)
    .addDecorator(withKnobs)
    .add('Heading', () => (
        <Heading
            alignRight={boolean('Align right', false)}
            level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}
        >
            {text('Heading text', 'This is a heading')}
        </Heading>
    ));
