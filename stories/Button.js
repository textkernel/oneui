import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Button from '../src/components/Button';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('Button', () => (
        <Button
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            size={select('Size', SIZES, SIZES[1])}
            isBlock={boolean('isBlock', false)}
            type={select('Type', ['submit', 'button'], 'submit')}
            disabled={boolean('Disabled', false)}
        >
            {text('Button label', 'Click me!')}
        </Button>
    ));
