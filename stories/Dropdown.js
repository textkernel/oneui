import React from 'react';
import fetchMock from 'fetch-mock';
import { storiesOf } from '@storybook/react';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import {
    Dropdown,
    DropdownFilter,
    DropdownItem,
    DropdownGroup,
    LoadingSpinner,
    RemoteInterface,
    ScrollContainer
} from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

const mockEndpoint = 'https://my.api/items';

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
                resize={select('Resize', ['both', 'horizontal', 'vertical'], 'both')}
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
    ))
    .add('Load items from API', () => {
        const payload = {
            items: [
                {
                    value: '1',
                    label: 'Item 1'
                },
                {
                    value: '2',
                    label: 'Item 2'
                },
                {
                    value: '3',
                    label: 'Item 3'
                }
            ]
        };

        const delay = () => new Promise(res => setTimeout(res, 1000));

        fetchMock.restore().get(mockEndpoint, delay().then(() => payload));

        return (
            <Dropdown label="My dropdown">
                <ScrollContainer minHeight={100} minWidth={150}>
                    <RemoteInterface
                        endpoint={mockEndpoint}
                        renderer={(loading, response) => {
                            if (loading || !response) {
                                return (
                                    <LoadingSpinner centerIn="parent" context="neutral" size={24} />
                                );
                            }

                            return response.items.map(item => (
                                <DropdownItem value={item.value} key={item.value}>
                                    {item.label}
                                </DropdownItem>
                            ));
                        }}
                    />
                </ScrollContainer>
            </Dropdown>
        );
    });
