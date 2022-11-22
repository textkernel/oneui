import * as React from 'react';
import { PillButton, PillDropdown, Pill } from '@textkernel/oneui';

const DummyComponent = (props) => (
    <>
        <p>This is some content for the pill</p>
        <button onClick={props.close}>Close me</button>
    </>
);

export default {
    title: 'Molecules/Pill',
    component: Pill,
    subcomponents: { PillButton, PillDropdown },
    argTypes: {
        ref: { control: false },
        dropdownRef: { control: false },
    },
};

export const _Pill = (args) => {
    return (
        <div style={{ position: 'relative', display: 'flex', gap: '4px' }}>
            <Pill {...args}>{({ close }) => <DummyComponent close={close} />}</Pill>
            <Pill {...args} content={undefined}>
                {({ close }) => <DummyComponent close={close} />}
            </Pill>
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
        <PillButton {...args} name="Pill 2" content="" />
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
