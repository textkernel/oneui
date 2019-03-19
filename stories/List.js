import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { List, ListItem, ListActions, Text, Button, Checkbox } from '@textkernel/oneui';

storiesOf('List', module)
    .addDecorator(withKnobs)
    .add('List', () => (
        <List
            Component={select('List component', ['ul', 'ol', 'menu'], 'ul')}
            isDivided={boolean('Add dividers between items', true)}
        >
            <ListItem>
                First item passed as string{' '}
                <ListActions>
                    <Button context="link">Action</Button>
                </ListActions>
            </ListItem>
            <ListItem>
                <Checkbox id="item 2" />
                <div>
                    <Text>Item passed as Text component</Text>
                    <Text>It has multiple lines</Text>
                </div>
            </ListItem>
            <ListItem isSelected={boolean('Select item', true)}>
                <Text inline>Item selectable via props</Text>
            </ListItem>
            <ListItem
                onClick={e => {
                    e.preventDefault();
                    alert('Item was selected'); // eslint-disable-line no-alert, no-undef
                }}
            >
                <Checkbox id="item 4" />
                Clickable item
            </ListItem>
        </List>
    ));
