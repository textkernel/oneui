import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';  // eslint-disable-line import/no-extraneous-dependencies
import Button from '../src/components/Button';
import { CONTEXTS, SIZES } from '../src/constants';

const context = select('Context', CONTEXTS, CONTEXTS[1], 'group-id-context');
const size = select('Size', SIZES, SIZES[1], 'group-id-size');
const type = select('Type', ['submit', 'button'], 'submit', 'group-id-type');

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('button', () => (
        <Button
            context={context}
            size={size}
            block={boolean('Block', false)}
            type={type}
            disabled={boolean('Disabled', false)}
        >
            Click me!
        </Button>
    ));
