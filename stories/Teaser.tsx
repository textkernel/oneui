import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Teaser } from '@textkernel/oneui';

storiesOf('Molecules|Teaser', module)
    .addDecorator(withKnobs)
    .add('Teaser', () => {
        const title = text('Title', 'My first job');
        return (
            <Teaser
                title={<span title={title}>{title}</span>}
                subTitle={text('SubTitle', 'Awsome inc.')}
                location={text('Location', 'Melbourne')}
                details={text('Details', 'It was posted here, yesterday')}
            />
        );
    });
