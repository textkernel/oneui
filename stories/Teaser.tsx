import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { Teaser } from '@textkernel/oneui';

storiesOf('Molecules|Teaser', module)
    .addDecorator(withKnobs)
    .add('With all fields', () => {
        const title = text('Title', 'My first job');
        return (
            <Teaser
                title={<span title={title}>{title}</span>}
                subTitle={text('SubTitle', 'Awsome inc.')}
                location={text('Location', 'Melbourne')}
                details={text('Details', 'It was posted here')}
                statuses={[
                    object('Viewed status', {
                        label: 'Viewed',
                        tooltip: 'Viewed one day ago',
                    }),
                    object('Imported status', {
                        label: 'Imported',
                        tooltip: 'Imported two days ago',
                    }),
                ]}
            />
        );
    })
    .add('With one status', () => {
        const title = text('Title', 'My first job');
        return (
            <Teaser
                title={<span title={title}>{title}</span>}
                subTitle={text('SubTitle', 'Awsome inc.')}
                location={text('Location', 'Melbourne')}
                details={text('Details', 'It was posted here')}
                statuses={[
                    object('Viewed status', {
                        label: 'Viewed',
                        tooltip: 'Viewed one day ago',
                    }),
                ]}
            />
        );
    })
    .add('Without statuses', () => {
        const title = text('Title', 'My first job');
        return (
            <Teaser
                title={<span title={title}>{title}</span>}
                subTitle={text('SubTitle', 'Awsome inc.')}
                location={text('Location', 'Melbourne')}
                details={text('Details', 'It was posted here')}
            />
        );
    });
