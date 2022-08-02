import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { Callout } from '@textkernel/oneui';
import { CONTEXTS } from '../src/constants';

storiesOf('Atoms/Callout', module)
    .addDecorator(withKnobs)
    .add('Callout', () => {
        const onClose = () => {
            console.log('Callout was requested to be closed.');
        };
        return (
            <Callout context={select('Context', CONTEXTS, CONTEXTS[0])} onRequestClose={onClose}>
                {text(
                    'Content',
                    'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
                )}
            </Callout>
        );
    })
    .add('Callout with more content', () => {
        const onClose = () => {
            console.log('Callout was requested to be closed.');
        };
        return (
            <Callout context={select('Context', CONTEXTS, CONTEXTS[7])} onRequestClose={onClose}>
                <h2 style={{ margin: 0 }}>Request failed</h2>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    specimen book.
                </p>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    specimen book.
                </p>
                <p>
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                    unknown printer took a galley of type and scrambled it to make a type book.
                </p>
            </Callout>
        );
    });
