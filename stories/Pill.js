import * as React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { PillButton, PillDropdown, Pill } from '@textkernel/oneui';

const DummyComponent = (props) => (
    <>
        <p>{text('dropdown text', 'This is some content for the pil')}l</p>
        <button onClick={props.close}>Close me</button>
    </>
);

export default {
    title: 'Molecules/Pill',
    component: Pill,
    subcomponents: { PillButton, PillDropdown },
};

export const _Pill = (args) => {
    return (
        <div style={{ position: 'relative' }}>
            <Pill {...args}>{({ close }) => <DummyComponent close={close} />}</Pill>
        </div>
    );
};
_Pill.args = {
    doneLabel: 'Done',
    name: 'Pill name',
    content: 'This pill is used',
};

export const _PillButton = (args) => (
    <div style={{ display: 'flex' }}>
        <PillButton {...args} />
        &nbsp;&nbsp;
        <PillButton name={'Pill 2'} content={''} />
    </div>
);
_PillButton.args = {
    name: 'Pill name',
    content: 'This pill is used',
};

export const _PillDropdown = (args) => (
    <PillDropdown {...args}>{({ close }) => <DummyComponent close={close} />}</PillDropdown>
);
_PillDropdown.args = {
    doneLabel: 'Done',
};
