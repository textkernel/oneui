import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Footer, Link } from '@textkernel/oneui';

storiesOf('Footer', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
        <Footer copyright={text('Alternative copyright', null)}>
            {text('Left side', 'This is a placeholder for children')}
            <Link href="/"> and a link</Link>
        </Footer>
    ));
