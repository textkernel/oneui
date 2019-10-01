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
            onClear={() => {
                console.log('onClear has been called');
            }}
            name={text('Name of the pill', 'Pill name')}
            content={text('Label for pill content', 'This pill is used')}
        />
    ));
