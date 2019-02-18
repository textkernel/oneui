import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Footer } from '@textkernel/oneui';

storiesOf('Footer', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
        <Footer copyright={text('Alternative copyright', '')}>
            {text('Left side', 'This is a placeholder for children')}
        </Footer>
    ));
