import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Heading from '../src/components/Heading';
import { HEADING_SIZES } from '../src/constants';

storiesOf('Heading', module)
    .addDecorator(withKnobs)
    .add('Heading', () => (
        <Heading
            align={select('Text alignment', ['left', 'center', 'right'])}
            level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}
        >
            {text('Heading text', 'This is a heading')}
        </Heading>
    ));
