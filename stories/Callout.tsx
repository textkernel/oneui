import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { Callout } from '@textkernel/oneui';
import { CONTEXTS } from '../src/constants';

storiesOf('Atoms|Callout', module)
    .addDecorator(withKnobs)
    .add('Callout', () => {
        const onClose = () => {
            console.log('Callout was requested to be closed.');
        };
        return (
            <Callout
                context={select('Context', CONTEXTS, CONTEXTS[0])}
                lineHeightStyle={number('Height of a line', 22)}
                onRequestClose={onClose}
            >
                {text(
                    'Content',
                    `Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`
                )}
            </Callout>
        );
    });
