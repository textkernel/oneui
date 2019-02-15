import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Header } from '@textkernel/oneui';

storiesOf('Header', module)
    .addDecorator(withKnobs)
    .add('Header', () => (
        <Header
            logoSrc={text('Image URL', 'https://www.jobfeed.nl/images/jobfeed-logo.svg')}
            logoLink={text('URL where click on logo will lead', '/')}
            logoName={text('Alt text for the logo', 'Jobfeed')}
        >
            {text('Left side', 'This is a placeholder for children')}
        </Header>
    ));
