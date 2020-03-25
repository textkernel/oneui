import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs';
import { SelectButtonGroup, SelectButton } from '@textkernel/oneui';

const selectedContexts = {
    Default: undefined,
    Brand: 'brand',
    Neutral: 'neutral',
} as const;

storiesOf('Atoms|SelectButtonGroup', module)
    .addDecorator(withKnobs)
    .add('SelectButtonGroup', () => (
        <SelectButtonGroup<string>
            isMultiselect={boolean('Multiselect group', false)}
            isRequired={boolean('Require to have at least 1 selected option', false)}
            isBlock={boolean('Display as block', false)}
            isEqualWidth={boolean('Make all buttons the same width', false)}
            selectedContext={select('Default selected color context', selectedContexts, undefined)}
            onChange={(value) => {
                const msg = `onSelect was called with values ${value}`;
                console.log(msg);
            }}
        >
            <SelectButton<string>
                value="button 1"
                key="button 1"
                isInitiallySelected
                selectedContext={
                    select('Selected color context for button 1', selectedContexts, undefined) ||
                    undefined
                }
            >
                {text('Option label 1', 'Option 1')}
            </SelectButton>
            <SelectButton<string>
                key="button 2"
                value="button 2"
                selectedContext={
                    select('Selected color context for button 2', selectedContexts, undefined) ||
                    undefined
                }
            >
                {text('Option label 2', 'Option 2')}
            </SelectButton>
            <SelectButton<string>
                key="button 3"
                value="button 3"
                selectedContext={
                    select('Selected color context for button 3', selectedContexts, undefined) ||
                    undefined
                }
            >
                {text('Option label 3', 'Option 3')}
            </SelectButton>
        </SelectButtonGroup>
    ));
