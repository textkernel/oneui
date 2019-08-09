import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Teaser } from '@textkernel/oneui';

storiesOf('Molecules|Teaser', module)
    .addDecorator(withKnobs)
    .add('Teaser', () => (
        <Teaser
            title={text('Title', 'My first job')}
            subTitle={text('SubTitle', 'Awsome inc.')}
            location={text('Location', 'Melbourne')}
            details={text('Details', 'It was posted here, yesterday')}
        />
    ));
