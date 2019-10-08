import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { PopupBase, Button } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '../src/constants';
import PopoverDummy from '../src/components/PopupBase/__mocks__/PopoverDummy';

storiesOf('Atoms|PopupBase', module)
    .addDecorator(withKnobs)
    .add('PopupBase', () => (
        <div style={{ textAlign: 'center' }}>
            <PopupBase
                anchorRenderer={({ setPopupVisibility, isOpened }) => (
                    <Button onClick={() => setPopupVisibility(!isOpened)}>Toggle popup</Button>
                )}
                popupRenderer={({ setPopupVisibility }) => (
                    <PopoverDummy setPopupVisibility={setPopupVisibility} />
                )}
                placement={select(
                    'Placement (will not take effect on already opened popup)',
                    POPUP_PLACEMENTS,
                    'bottom-start'
                )}
            />
        </div>
    ));
