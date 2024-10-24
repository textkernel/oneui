import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PillButton, PillDropdown, Pill } from '@textkernel/oneui';

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
        doneLabel: 'Done',
        name: 'Pill name',
        content: 'This pill is used',
    },
    render: (args) => (
        <div style={{ position: 'relative', display: 'flex', gap: '4px' }}>
            <Pill {...args}>
                <p>This is some content for the pill</p>
            </Pill>
            <Pill {...args} content={undefined}>
                <p>This is some content for the pill</p>
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
    args: {
        doneLabel: 'Done',
    },
    render: (args) => (
        <PillDropdown {...args}>
            <p>This is some content for the pill</p>
        </PillDropdown>
    ),
};
