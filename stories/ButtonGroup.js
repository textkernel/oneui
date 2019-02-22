import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { Button, ButtonGroup } from '@textkernel/oneui';
import { SIZES } from '@textkernel/oneui/constants';

storiesOf('ButtonGroup', module)
    .addDecorator(withKnobs)
    .add('ButtonGroup', () => (
        <ButtonGroup isBlock={boolean('isBlock', false)} size={select('Size', SIZES, SIZES[1])}>
            <Button context="neutral">Some</Button>
            <Button context="neutral">Button</Button>
            <Button context="neutral">Group</Button>
        </ButtonGroup>
    ));
