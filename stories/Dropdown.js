import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, number, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Dropdown from '../src/components/Dropdown';
import DropdownItem from '../src/components/Dropdown/DropdownItem';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .add('Single-select dropdown', () => {
        const filter = boolean('Filter', false);
        return (
            <Dropdown
                context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
                heading={text('Heading', 'This is a dropdown heading')}
                disabled={boolean('Disabled', false)}
                filter={
                    filter
                        ? {
                              matchCase: boolean('Filter: Case sensitive matching', false),
                              matchDiacritics: boolean('Filter: Match diacritics strictly', false),
                              matchPosition: select(
                                  'Filter: Match position',
                                  ['any', 'start'],
                                  'any'
                              ),
                              noMatchLabel: text('Filter: No matches label', 'No matches found'),
                              placeholder: text('Filter: Placeholder', 'Filter options...')
                          }
                        : null
                }
                isBlock={boolean('isBlock', false)}
                label={text('Label', 'Drop me down')}
                maxHeight={number('Max. height', null)}
                minWidth={number('Min. width', null)}
                onChange={selection => {
                    // eslint-disable-next-line no-console
                    console.log(selection);
                }}
                onClose={() => {
                    // eslint-disable-next-line no-console
                    console.log('Dropdown closed');
                }}
                size={select('Size', SIZES, SIZES[1])}
            >
                <DropdownItem value="1">Some dropdown item</DropdownItem>
                <DropdownItem value="2">This is a very long item for this dropdown</DropdownItem>
                <DropdownItem value="3" disabled>
                    This is a disabled item
                </DropdownItem>
                <DropdownItem value="4">Téšṫ diacritics</DropdownItem>
                <DropdownItem
                    value="5"
                    onClick={() => {
                        // eslint-disable-next-line no-alert
                        window.alert('Clicked on item');
                    }}
                >
                    This item has a click action
                </DropdownItem>
                <DropdownItem value="6">Yet another item</DropdownItem>
                <DropdownItem value="7">Yet another item</DropdownItem>
                <DropdownItem value="8">Yet another item</DropdownItem>
                <DropdownItem value="9">Yet another item</DropdownItem>
            </Dropdown>
        );
    })
    .add('Multi-select dropdown', () => {
        const filter = boolean('Filter', false);
        return (
            <Dropdown
                context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
                heading={text('Heading', 'This is a dropdown heading')}
                disabled={boolean('Disabled', false)}
                filter={
                    filter
                        ? {
                              matchCase: boolean('Filter: Case sensitive matching', false),
                              matchPosition: select(
                                  'Filter: Match position',
                                  ['any', 'start'],
                                  'any'
                              ),
                              noMatchLabel: text('Filter: No matches label', 'No matches found'),
                              placeholder: text('Filter: Placeholder', 'Filter options...')
                          }
                        : null
                }
                isBlock={boolean('isBlock', false)}
                label={text('Label', 'Drop me down')}
                maxHeight={number('Max. height', null)}
                minWidth={number('Min. width', null)}
                multiple
                onChange={selection => {
                    // eslint-disable-next-line no-console
                    console.log(selection);
                }}
                onClose={() => {
                    // eslint-disable-next-line no-console
                    console.log('Dropdown closed');
                }}
                size={select('Size', SIZES, SIZES[1])}
                value={['1', '4']}
            >
                <DropdownItem value="1">Some dropdown item</DropdownItem>
                <DropdownItem value="2">This is a very long item for this dropdown</DropdownItem>
                <DropdownItem value="3" disabled>
                    This is a disabled item
                </DropdownItem>
                <DropdownItem value="4">Yet another item</DropdownItem>
                <DropdownItem value="5">Yet another item</DropdownItem>
                <DropdownItem value="6">Yet another item</DropdownItem>
                <DropdownItem value="7">Yet another item</DropdownItem>
                <DropdownItem value="8">Yet another item</DropdownItem>
                <DropdownItem value="9">Yet another item</DropdownItem>
            </Dropdown>
        );
    });
