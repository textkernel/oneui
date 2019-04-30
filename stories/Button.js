import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Button } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('Button', () => (
        <Button
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            size={select('Size', SIZES, SIZES[0])}
            isBlock={boolean('isBlock', false)}
            isInline={boolean('isInline', false)}
            type={select('Type', ['submit', 'button'], 'submit')}
            disabled={boolean('Disabled', false)}
            onClick={e => {
                console.log('Clicked button', e);
            }}
            href={text('Href to be rendere for links', '')}
        >
            {text('Button label', 'Click me!')}
        </Button>
    ));
