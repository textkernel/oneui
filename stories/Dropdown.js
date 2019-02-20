import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import {
    Dropdown,
    DropdownFilter,
    DropdownItem,
    DropdownGroup,
    ScrollContainer
} from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .add('Dropdown single select', () => (
        <Dropdown
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            isBlock={boolean('isBlock', false)}
            label={text('Label', 'My dropdown')}
            onChange={({ value, label }) => {
                console.log(`Selected value '${value}' (${label})`);
            }}
            size={select('Size', SIZES, SIZES[1])}
        >
            <DropdownItem value="1">Item 1</DropdownItem>
            <DropdownItem value="2">Item 2</DropdownItem>
            <DropdownItem value="3">Item 3</DropdownItem>
            <DropdownGroup label="Group 1">
                <DropdownItem value="4">Item 4</DropdownItem>
                <DropdownItem value="5">Item 5</DropdownItem>
            </DropdownGroup>
        </Dropdown>
    ))
    .add('Dropdown multi select', () => (
        <Dropdown
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            isBlock={boolean('isBlock', false)}
            label={text('Label', 'My dropdown')}
            multiselect
            onChange={({ value, label }) => {
                console.log(`Selected value '${value}' (${label})`);
            }}
            selectedLabel={selection => `${selection.length} items selected`}
            size={select('Size', SIZES, SIZES[1])}
            value={['1', '5']}
        >
            <DropdownFilter placeholder="Filter items..." autoFocus />
            <DropdownItem value="1">Item 1</DropdownItem>
            <DropdownItem value="2">Item 2</DropdownItem>
            <DropdownItem value="3">Item 3</DropdownItem>
            <DropdownGroup label="Group 1">
                <DropdownItem value="4">Item 4</DropdownItem>
                <DropdownItem value="5">Item 5</DropdownItem>
            </DropdownGroup>
        </Dropdown>
    ))
    .add('Dropdown with min width / max height', () => (
        <Dropdown label="My dropdown">
            <DropdownFilter placeholder="Filter items..." autoFocus />
            <ScrollContainer
                maxHeight={number('Max height', 200)}
                minWidth={number('Min width', 300)}
                hideScrollX
            >
                <DropdownItem value="1">Item 1</DropdownItem>
                <DropdownItem value="2">Item 2</DropdownItem>
                <DropdownItem value="3">Item 3</DropdownItem>
                <DropdownGroup label="Group 1">
                    <DropdownItem value="4">Item 4</DropdownItem>
                    <DropdownItem value="5">Item 5</DropdownItem>
                </DropdownGroup>
                <DropdownItem value="6">Item 6</DropdownItem>
                <DropdownItem value="7">Item 7</DropdownItem>
                <DropdownItem value="8">Item 8</DropdownItem>
                <DropdownItem value="9">Item 9</DropdownItem>
                <DropdownItem value="10">Item 10</DropdownItem>
            </ScrollContainer>
        </Dropdown>
    ));
