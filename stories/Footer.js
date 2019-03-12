import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Footer } from '@textkernel/oneui';

storiesOf('Footer', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
        <Footer copyright={text('Alternative copyright', '')}>
            {text('Left side', 'This is a placeholder for children')}
        </Footer>
    ));
