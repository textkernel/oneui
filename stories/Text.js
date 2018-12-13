import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Text from '../src/components/Text';

storiesOf('Text', module)
    .addDecorator(withKnobs)
    .add('Text', () => (
        <Text inline={boolean('Inline text', false)} muted={boolean('Muted text', false)}>
            {text('Content', 'This is some text content')}
        </Text>
    ));
