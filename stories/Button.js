import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Button, SearchButton } from '@textkernel/oneui';
import { CONTEXTS, SIZES, MAIN_CONTEXTS } from '../src/constants';

storiesOf('Atoms|Button', module)
    .addDecorator(withKnobs)
    .add('Button', () => (
        <Button
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            size={select('Size', SIZES, SIZES[1])}
            isBlock={boolean('isBlock', false)}
            isInline={boolean('isInline', false)}
            type={select('Type', ['submit', 'button'], 'submit')}
            disabled={boolean('Disabled', false)}
            onClick={e => {
                console.log('Clicked button', e);
            }}
            href={text('Href (will render an anchor)', '')}
        >
            {text('Button label', 'Click me!')}
        </Button>
    ))
    .add('SearchButton', () => (
        <SearchButton
            context={select('Context', MAIN_CONTEXTS, MAIN_CONTEXTS[1])}
            type={select('Type', ['submit', 'button'], 'submit')}
            disabled={boolean('Disabled', false)}
            onClick={e => {
                console.log('Clicked button', e);
            }}
        />
    ));
