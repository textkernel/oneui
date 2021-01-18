import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Button, MultiActionButton, ListItem, IconTextkernel } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '@textkernel/oneui/constants';
import { HiDotsVertical } from 'react-icons/hi';

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
    },
    customDiv: {
        alignItems: 'center',
        background: '#ffff003d',
        display: 'flex',
        height: '40px',
        justifyContent: 'center',
    },
    customListItem: {
        alignItems: 'center',
        display: 'flex',
    },
    divider: {
        borderBottom: '1px solid #80808045',
    },
    icon: {
        marginRight: '10px',
    },
};

storiesOf('Molecules|MultiActionButton', module)
    .addDecorator(withKnobs)
    .add('MultiActionButton', () => {
        const onChange = (value) => {
            console.log(`onChange was called value : ${value}`);
        };

        const customButtonsDemo = [
            (
                <Button context="brand">
                    Click me!
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
            <div style={styles.content}>
                <MultiActionButton<string>
                    style={{ width: 'fit-content' }}
                    button={customButtonsDemo[buttonIndex]}
                    onChange={onChange}
                    placement={select('placement', POPUP_PLACEMENTS, 'bottom-end')}
                >
                    <ListItem key="disabled-key" disabled style={styles.divider}>
                        Disabled ListItem
                    </ListItem>
                    <ListItem key="first-key" value="first-value">
                        ListItem with value
                    </ListItem>
                    <ListItem key="second-key" value="second-value">
                        <div style={styles.customListItem}>
                            <IconTextkernel context="brand" style={styles.icon} />
                            <strong>Custom ListItem with value</strong>
                        </div>
                    </ListItem>
                    <div style={styles.customDiv}>
                        Just custom div element
                    </div>
                </MultiActionButton>
            </div>
        );
    });
