import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PopupBase, Button } from '@textkernel/oneui';
import { PopoverDummy } from '../../src/components/PopupBase/__mocks__/PopoverDummy';

const meta: Meta<typeof PopupBase> = {
    title: 'Atoms/PopupBase',
    component: PopupBase,
    argTypes: {
        anchorRef: { control: false },
        popupRef: { control: false },
        popperOptions: { control: false },
    },
};

export default meta;

type Story = StoryObj<typeof PopupBase>;

export const _PopupBase: Story = {
    name: 'PopupBase',
    args: {
        anchorRenderer: ({ setPopupVisibility, isOpen }) => (
            <Button onClick={() => setPopupVisibility(!isOpen)}>Toggle popup</Button>
        ),
        popupRenderer: ({ setPopupVisibility }) => (
            <PopoverDummy setPopupVisibility={setPopupVisibility} />
        ),
        placement: 'bottom-start',
    },
    render: (args) => (
        <div style={{ textAlign: 'center' }}>
            <PopupBase {...args} />
        </div>
    ),
};
