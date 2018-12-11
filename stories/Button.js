import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';  // eslint-disable-line import/no-extraneous-dependencies
import Button from '../src/components/Button';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('button', () => (
        <Button
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            size={select('Size', SIZES, SIZES[1])}
            block={boolean('Block', false)}
            type={select('Type', ['submit', 'button'], 'submit')}
            disabled={boolean('Disabled', false)}
        >
            Click me!
        </Button>
    ));
