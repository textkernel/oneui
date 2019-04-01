import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { ButtonIcon } from '@textkernel/oneui';
import { CONTEXTS } from '../src/constants';

storiesOf('ButtonIcon', module)
    .addDecorator(withKnobs)
    .add('ButtonIcon', () => (
        <ButtonIcon
            context={select('Context', CONTEXTS, CONTEXTS[0])}
            isActive={boolean('isActive', false)}
        >
            <i className="far fa-bookmark" />
        </ButtonIcon>
    ));
