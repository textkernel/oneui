import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Chip, IconMatch } from '@textkernel/oneui';

storiesOf('Chip', module)
    .addDecorator(withKnobs)
    .add('Chip', () => (
        <Chip title={text('Title', 'This is a title that uses native browser functionality')}>
            <IconMatch />
            &nbsp;
            {text('Content', 'This is a chip')}
        </Chip>
    ));
