import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Header, IconTextkernel } from '@textkernel/oneui';

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('Header with simple logo', () => (
        <Header
            logo={{
                src: text('Image URL', 'https://www.jobfeed.nl/images/jobfeed-logo.svg'),
                link: text('URL where click on logo will lead', '/'),
                title: text('Alt text for the logo', 'Jobfeed')
            }}
        >
            {text('Left side', 'This is a placeholder for children')}
        </Header>
    ))
    .add('Header with logo as component', () => (
        <Header logo={<IconTextkernel />}>
            {text('Left side', 'This is a placeholder for children')}
        </Header>
    ));
