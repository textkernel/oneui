import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Dropdown from '../src/components/Dropdown';
import DropdownItem from '../src/components/DropdownItem';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .add('Dropdown', () => {
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
                              placeholder: text('Filter: Placeholder', 'Filter options...')
                          }
                        : null
                }
                isBlock={boolean('isBlock', false)}
                label={text('Label', 'Drop me down')}
                size={select('Size', SIZES, SIZES[1])}
            >
                <DropdownItem>Some dropdown item</DropdownItem>
                <DropdownItem>This is a very long item for this dropdown</DropdownItem>
                <DropdownItem disabled>This is a disabled item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
                <DropdownItem>Yet another item</DropdownItem>
            </Dropdown>
        );
    });
