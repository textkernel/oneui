import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Footer, Link } from '@textkernel/oneui';

storiesOf('Molecules/Footer', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
        <Footer copyright={text('Alternative copyright', '') || undefined}>
            {text('Left side', 'This is a placeholder for children')}
            <Link href="/"> and a link</Link>
        </Footer>
    ));
