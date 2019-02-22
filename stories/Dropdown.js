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
import { DropdownConsumer } from '../src/components/Dropdown/DropdownContext';
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
        const data = {
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
                },
                {
                    value: '4',
                    label: 'Item 4'
                },
                {
                    value: '5',
                    label: 'Item 5'
                }
            ]
        };

        const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

        fetchMock.restore().get(mockEndpoint, (_, { body }) => {
            const { q } = body;
            if (!q) {
                return data;
            }
            const re = new RegExp(`(${q})`, 'gi');
            const dataFiltered = {
                items: data.items.filter(item => item.label.match(re)) || []
            };
            return delay().then(() => dataFiltered);
        });

        return (
            <Dropdown
                label="My dropdown"
                multiselect
                onChange={({ value, label }) => {
                    console.log(`Selected value '${value}' (${label})`);
                }}
            >
                <DropdownFilter autoFocus />
                <DropdownConsumer>
                    {({ filterValue }) => (
                        <RemoteInterface
                            delay={500}
                            endpoint={mockEndpoint}
                            body={{
                                q: filterValue
                            }}
                        >
                            {({ loading, response }) => {
                                if (loading || !response) {
                                    return (
                                        <ScrollContainer minHeight={100} minWidth={100}>
                                            <LoadingSpinner
                                                centerIn="parent"
                                                context="neutral"
                                                size={24}
                                            />
                                        </ScrollContainer>
                                    );
                                }

                                return response.items.map(item => (
                                    <DropdownItem value={item.value} key={item.value} noFilter>
                                        {item.label}
                                    </DropdownItem>
                                ));
                            }}
                        </RemoteInterface>
                    )}
                </DropdownConsumer>
            </Dropdown>
        );
    });
