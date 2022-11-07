import * as React from 'react';
import { PopupBase, Button } from '@textkernel/oneui';
import { PopoverDummy } from '../../src/components/PopupBase/__mocks__/PopoverDummy';

export default {
    title: 'Atoms/PopupBase',
    component: PopupBase,
    argTypes: {
        anchorRef: { control: false },
        popupRef: { control: false },
        popperOptions: { control: false },
    },
};

export const _PopupBase = (args) => (
    <div style={{ textAlign: 'center' }}>
        <PopupBase {...args} />
    </div>
);

_PopupBase.args = {
    anchorRenderer: ({ setPopupVisibility, isOpen }) => (
        <Button onClick={() => setPopupVisibility(!isOpen)}>Toggle popup</Button>
    ),
    popupRenderer: ({ setPopupVisibility }) => (
        <PopoverDummy setPopupVisibility={setPopupVisibility} />
    ),
    placement: 'bottom-start',
};

