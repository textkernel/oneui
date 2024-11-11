import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PillButton, PillDropdown, Pill } from '@textkernel/oneui';

const DummyComponent = (props) => (
    <>
        <p>
            This is some content dropdown has 440px max height so it will show scroll bars after
            that
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
            vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
            molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
            Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum.
        </p>
        <button onClick={props.close}>Close me</button>
    </>
);

const meta: Meta<typeof Pill> = {
    title: 'Molecules/Pill',
    component: Pill,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { PillButton, PillDropdown } as any,
    argTypes: {
        ref: { control: false },
        dropdownRef: { control: false },
    },
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const _Pill: Story = {
    name: 'Pill',
    args: {
        name: 'Pill name',
        content: 'This pill is used',
    },
    render: (args) => (
        <div style={{ position: 'relative', display: 'flex', gap: '4px' }}>
            <Pill {...args}>{({ close }) => <DummyComponent close={close} />}</Pill>
            <Pill {...args} content={undefined}>
                {({ close }) => <DummyComponent close={close} />}
            </Pill>
        </div>
    ),
};

type PillButtonStory = StoryObj<typeof PillButton>;

export const _PillButton: PillButtonStory = {
    name: 'PillButton',
    args: {
        name: 'Pill name',
        content: 'This pill is used',
        downArrowLabel: 'down arrow',
        upArrowLabel: 'up arrow',
        clearLabel: 'clear label',
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <PillButton {...args} />
            &nbsp;&nbsp;
            <PillButton {...args} name="Pill 2" content="" />
        </div>
    ),
};

type PillDropdownStory = StoryObj<typeof PillDropdown>;

export const _PillDropdown: PillDropdownStory = {
    name: 'PillDropdown',
    render: (args) => (
        <PillDropdown {...args}>{({ close }) => <DummyComponent close={close} />}</PillDropdown>
    ),
};
