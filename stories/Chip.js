import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Chip, IconMatch } from '@textkernel/oneui';

storiesOf('Atoms|Chip', module)
    .addDecorator(withKnobs)
    .add('Chip', () => (
        <React.Fragment>
            <Chip title={text('Title', 'This is a title that uses native browser functionality')}>
                {text('Content', 'Chip with title')}
            </Chip>
            <Chip>
                <IconMatch />
                &nbsp;
                {text('Content 2', 'Chip with Icon as child')}
            </Chip>
        </React.Fragment>
    ));
