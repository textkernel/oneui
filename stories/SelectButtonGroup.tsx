import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs';
import { SelectButtonGroup, SelectButton } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../src/constants';

storiesOf('Atoms|SelectButtonGroup', module)
    .addDecorator(withKnobs)
    .add('Uncontrolled', () => (
        <SelectButtonGroup<string>
            isMultiselect={boolean('Multiselect group', false)}
            isRequired={boolean('Require to have at least 1 selected option', false)}
            isBlock={boolean('Display as block', false)}
            isEqualWidth={boolean('Make all buttons the same width', false)}
            context={select('Default selected color context', CONTEXTS, CONTEXTS[1])}
            size={select('Size', SIZES, SIZES[1])}
            defaultValue={['3']}
            onChange={(selection) => {
                console.log('Current selection', selection);
            }}
        >
            <SelectButton value="1" key="button 1">
                {text('Option label 1', 'Option 1')}
            </SelectButton>
            <SelectButton value="2" key="button 2">
                {text('Option label 2', 'Option 2')}
            </SelectButton>
            <SelectButton value="3" key="button 3">
                {text('Option label 3', 'Option 3')}
            </SelectButton>
        </SelectButtonGroup>
    ))
    .add('Controlled', () => {
        const buttons = {
            '1': boolean('Button 1 selected', true),
            '2': boolean('Button 2 selected', false),
            '3': boolean('Button 3 selected', false),
        };
        const keys = Object.keys(buttons);

        return (
            <SelectButtonGroup
                value={keys.filter((k) => buttons[k])}
                onChange={(value) => {
                    console.log(`Button ${value} was selected`);
                }}
            >
                {keys.map((buttonNumber) => (
                    <SelectButton
                        key={`button-${buttonNumber}`}
                        value={buttonNumber}
                        context={select(
                            `Context for button ${buttonNumber}`,
                            CONTEXTS,
                            CONTEXTS[1]
                        )}
                    >
                        Button {buttonNumber}
                    </SelectButton>
                ))}
            </SelectButtonGroup>
        );
    });
