import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
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
