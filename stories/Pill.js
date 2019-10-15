import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { PillButton, PillDropdown, Pill } from '@textkernel/oneui';

const DummyComponent = props => (
    <>
        <p>{text('dropdown text', 'This is some content for the pil')}l</p>
        <button onClick={props.close}>Close me</button>
    </>
);

storiesOf('Molecules|Pill', module)
    .addDecorator(withKnobs)
    .add('PillButton', () => (
        <div style={{ display: 'flex' }}>
            <PillButton
                isOpen={boolean('Pill is open', false)}
                toggleDropdown={() => {
                    console.log('toggleDropdown has been called');
                }}
                onClear={() => {
                    console.log('onClear has been called');
                }}
                name={text('Name of the pill', 'Pill name')}
                content={text('Label for pill content', 'This pill is used')}
            />
            &nbsp;&nbsp;
            <PillButton
                isOpen={boolean('Pill is open 2', false)}
                toggleDropdown={() => {
                    console.log('toggleDropdown 2 has been called');
                }}
                onClear={() => {
                    console.log('onClear 2 has been called');
                }}
                name={text('Name of the pill 2', 'Pill 2')}
                content={text('Label for pill content 2', '')}
            />
        </div>
    ))
    .add('PillDropdown', () => (
        <PillDropdown
            noPadding={boolean('no padding', false)}
            close={() => {
                console.log('Close was called');
            }}
        >
            {({ close }) => <DummyComponent close={close} />}
        </PillDropdown>
    ))
    .add(
        'Pill',
        () => {
            return (
                <div style={{ position: 'relative' }}>
                    <Pill
                        onClear={() => {
                            console.log('onClear has been called');
                        }}
                        name={text('Name of the pill', 'Pill name')}
                        content={text('Label for pill content', 'This pill is used')}
                        noPaddingInDropdown={boolean('no padding in dropdown', false)}
                    >
                        {({ close }) => <DummyComponent close={close} />}
                    </Pill>
                </div>
            );
        },
        {
            info: {
                text: `
    This component renders a PillButton and a PillDropdown, under the hood. These in turn are linked via PopupBase.

    * Most props, including 'rest' are applied to PillButton. 
    * 'children', 'noPaddingInDropdown' and 'additionalDropdownProps' are used in PillDropdown.
    * 'ref' and 'dropdownRef' for used in PopupBase.
    `,
            },
        }
    );
