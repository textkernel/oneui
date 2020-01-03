import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs';
import { SelectButtonGroup, SelectButton } from '@textkernel/oneui';

storiesOf('Atoms|SelectButtonGroup', module)
    .addDecorator(withKnobs)
    .add('SelectButtonGroup', () => (
        <SelectButtonGroup
            isMultiselect={boolean('Multiselect group', false)}
            isBlock={boolean('Display as block', false)}
            isEqualWidth={boolean('Make all buttons the same width', false)}
            onSelect={value => {
                const msg = `onSelect was called with value ${value}`;
                console.log(msg);
            }}
        >
            <SelectButton
                value="button 1"
                isSelected={boolean('Button 1 is selected', true)}
                selectedContext={select(
                    'Selected color context for button 1',
                    ['brand', 'neutral'],
                    'brand'
                )}
            >
                {text('Option label 1', 'Option 1')}
            </SelectButton>
            <SelectButton
                value="button 2"
                isSelected={boolean('Button 2 is selected', false)}
                selectedContext={select(
                    'Selected color context for button 2',
                    ['brand', 'neutral'],
                    'brand'
                )}
            >
                {text('Option label 2', 'Option 2')}
            </SelectButton>
        </SelectButtonGroup>
    ));
