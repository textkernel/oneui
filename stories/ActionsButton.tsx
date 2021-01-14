import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Button, ActionsButton, ListItem, IconTextkernel } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '@textkernel/oneui/constants';
import { HiDotsVertical } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';

storiesOf('Molecules|ActionsButton', module)
    .addDecorator(withKnobs)
    .add('ActionsButton', () => {
        const onChange = (value) => {
            console.log(`onChange was called value : ${value}`);
        };

        const customButtonsDemo = [
            (
                <Button context="brand">
                    <IoMdArrowDropdown />
                </Button>
            ),
            (
                <Button context="neutral">
                    <HiDotsVertical />
                </Button>
            ),
            (
                <Button context="link">
                    Select any
                </Button>
            )
        ];

        const buttonIndex = select('customButton', [0, 1, 2], 0);
        return (
            <div style={{ padding: '0 40px', display: 'flex', justifyContent: 'center' }}>
                <ActionsButton<string>
                    style={{ width: 'fit-content' }}
                    button={customButtonsDemo[buttonIndex]}
                    onChange={onChange}
                    placement={select('placement', POPUP_PLACEMENTS, 'bottom-end')}
                >
                    <ListItem
                        key="disabled-key"
                        disabled
                        style={{ borderBottom: '1px solid #80808045' }}
                    >
                        Disabled ListItem
                    </ListItem>
                    <ListItem key="first-key" value="first-value">
                        ListItem with value
                    </ListItem>
                    <ListItem key="second-key" value="second-value">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconTextkernel context="brand" style={{ marginRight: '10px' }} />
                            <strong>Custom ListItem with value</strong>
                        </div>
                    </ListItem>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#ffff003d',
                            height: '40px',
                        }}
                    >
                        Just custom div element
                    </div>
                </ActionsButton>
            </div>
        );
    });
