import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Button, Dropdown, ListItem, IconTextkernel } from '@textkernel/oneui';
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
    listItem: {
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

storiesOf('Molecules|Dropdown', module)
    .addDecorator(withKnobs)
    .add('Dropdown', () => {
        const onChange = (value) => {
            console.log(`onChange was called value : ${value}`);
        };
        const onOpen = () => {
            console.log('Dropdown was requested to be open.');
        };
        const onClose = () => {
            console.log('Dropdown was requested to be close.');
        };

        const customButtonsDemo = [
            <Button context="brand">Click me!</Button>,
            <Button context="neutral">
                <HiDotsVertical />
            </Button>,
            <Button context="link">Select any</Button>,
        ];

        const buttonIndex = select('customButton', [0, 1, 2], 0);

        const customValues = [
            'ListItem with value 1',
            'ListItem with value 2',
            'ListItem with value 3',
        ];

        return (
            <div style={styles.content}>
                <Dropdown<string>
                    items={customValues}
                    style={{ width: 'fit-content' }}
                    button={customButtonsDemo[buttonIndex]}
                    onChange={onChange}
                    onOpen={onOpen}
                    onClose={onClose}
                    placement={select('placement', POPUP_PLACEMENTS, 'bottom-end')}
                >
                    {({ getItemPropsByIndex }) => {
                        return (
                            <>
                                <ListItem disabled>Disabled</ListItem>
                                {customValues.map((value, index) => (
                                    <ListItem key={value} {...getItemPropsByIndex(index)}>
                                        <div style={styles.listItem}>
                                            <IconTextkernel context="brand" style={styles.icon} />
                                            {value}
                                        </div>
                                    </ListItem>
                                ))}
                                <div style={styles.customDiv}>Just custom div element</div>
                            </>
                        );
                    }}
                </Dropdown>
            </div>
        );
    });
