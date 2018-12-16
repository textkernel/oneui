import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Dropdown from '../src/components/Dropdown';
import DropdownItem from '../src/components/DropdownItem';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Dropdown', module)
    .addDecorator(withKnobs)
    .add('Dropdown', () => (
        <Dropdown
            context={select('Context', ['link', ...CONTEXTS], CONTEXTS[0])}
            disabled={boolean('Disabled', false)}
            isBlock={boolean('isBlock', false)}
            label={text('Label', 'Drop me down')}
            size={select('Size', SIZES, SIZES[1])}
        >
            <DropdownItem>
                Test
            </DropdownItem>
            <DropdownItem>
                This is a very long list item for this dropdown
            </DropdownItem>
        </Dropdown>
    ));
