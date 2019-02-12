import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Text } from '@textkernel/oneui';

storiesOf('Text', module)
    .addDecorator(withKnobs)
    .add('Text', () => (
        <Text
            bold={boolean('Bold', false)}
            inline={boolean('Inline text', false)}
            muted={boolean('Muted text', false)}
            size={select('Size', ['small', 'normal', 'large'], 'normal')}
        >
            {text('Content', 'This is some text content')}
        </Text>
    ));
