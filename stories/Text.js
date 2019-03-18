import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import { Text } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Text', module)
    .addDecorator(withKnobs)
    .add('Text', () => (
        <Text
            context={select('Context', ['default', 'muted', ...CONTEXTS])}
            size={select('Size', SIZES, 'normal')}
        >
            {text('Content', 'This is some text content')}
        </Text>
    ));
