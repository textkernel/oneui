import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, withKnobs } from '@storybook/addon-knobs';
import { Text } from '@textkernel/oneui';

storiesOf('Text', module)
    .addDecorator(withKnobs)
    .add('Text', () => (
        <Text
            inline={boolean('Inline text', false)}
            muted={boolean('Muted text', false)}
            size={select('Size', ['small', 'normal', 'large'], 'normal')}
        >
            {text('Content', 'This is some text content')}
        </Text>
    ));
