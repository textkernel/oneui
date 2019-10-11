import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { PillButton, Pill } from '@textkernel/oneui';

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
    .add('Pill', () => {
        const DummyComponent = React.forwardRef(({ close, className, innerPadding }, ref) => (
            <div ref={ref} className={className} style={{ padding: innerPadding }}>
                <p>{text('dropdown text', 'This is some content for the pil')}l</p>
                <button onClick={close}>Close me</button>
            </div>
        ));

        return (
            <div style={{ position: 'relative' }}>
                <Pill
                    onClear={() => {
                        console.log('onClear has been called');
                    }}
                    name={text('Name of the pill', 'Pill name')}
                    content={text('Label for pill content', 'This pill is used')}
                >
                    {({ close, innerPadding }) => (
                        <DummyComponent close={close} innerPadding={innerPadding} />
                    )}
                </Pill>
            </div>
        );
    });
