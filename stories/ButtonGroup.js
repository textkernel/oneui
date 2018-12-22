import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import ButtonGroup from '../src/components/ButtonGroup';
import Button from '../src/components/Button';
import Dropdown from '../src/components/Dropdown';
import DropdownItem from '../src/components/Dropdown/DropdownItem';
import { SIZES } from '../src/constants';

storiesOf('ButtonGroup', module)
    .addDecorator(withKnobs)
    .add('ButtonGroup', () => (
        <ButtonGroup isBlock={boolean('isBlock', false)} size={select('Size', SIZES, SIZES[1])}>
            <Button context="neutral">Some</Button>
            <Button context="neutral">Button</Button>
            <Button context="neutral">Group</Button>
        </ButtonGroup>
    ))
    .add('ButtonGroup with dropdown', () => (
        <ButtonGroup isBlock={boolean('isBlock', false)} size={select('Size', SIZES, SIZES[1])}>
            <Button context="neutral">Some</Button>
            <Button context="neutral">Button</Button>
            <Dropdown context="brand" label="And a dropdown">
                <DropdownItem value="1">Some item</DropdownItem>
                <DropdownItem value="2">Another item</DropdownItem>
                <DropdownItem value="3">More items</DropdownItem>
            </Dropdown>
        </ButtonGroup>
    ));
