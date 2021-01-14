import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Button, ActionsButton, ListItem, QuickActions, IconTextkernel } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Molecules|QuickActions', module)
    .addDecorator(withKnobs)
    .add('ActionsButton', () => {
        const onChange = (value) => {
            console.log(`onChange was called value : ${value}`);
        };

        const customButtonsDemo = [
            (
                <Button>
                    Copy from Monster
                </Button>
            ),
            (
                <Button>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconTextkernel />
                        <div style={{ marginLeft: '10px' }}>With icon</div>
                    </div>
                </Button>
            )
        ];

        const buttonIndex = select('customButton', [0, 1], 0);
        return (
            <div style={{ padding: '0 40px', display: 'flex', justifyContent: 'center' }}>
                <QuickActions<string>
                    button={customButtonsDemo[buttonIndex]}
                    onChange={onChange}
                    context={select('context', CONTEXTS, 'brand')}
                >
                    <ListItem
                        key="disabled-key"
                        disabled
                        style={{ borderBottom: '1px solid #80808045' }}
                    >
                        Copy from another source
                    </ListItem>
                    <ListItem key="linkedin" value="linkedin">
                        Linkedin
                    </ListItem>
                    <ListItem key="github" value="github">
                        GitHub
                    </ListItem>
                </QuickActions>
            </div>
        );
    });
