import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { PillButton } from '@textkernel/oneui';

storiesOf('Molecules|Pill', module)
    .addDecorator(withKnobs)
    .add('PillButton', () => (
        <PillButton
            isOpen={boolean('Pill is open', false)}
            togglePopup={() => {
                console.log('togglePopup has been called');
            }}
            onClear={() => 'onClean has been called'}
            label={text('Pill label', 'Pill label')}
            contentLabel={text('Pill contnent label', 'This pill is used')}
        />
    ));
