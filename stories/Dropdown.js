import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Dropdown, DropdownItem } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .add('Dropdown', () => (
        <Dropdown
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            label={text('Label', 'My dropdown')}
            initiallyOpened
            multiselect={boolean('Multiselect', false)}
            size={select('Size', SIZES, SIZES[1])}
        >
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
            <DropdownItem>test</DropdownItem>
        </Dropdown>
    ));
