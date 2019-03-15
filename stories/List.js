import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { List, ListItem, ListActions, Text, Button, Checkbox } from '@textkernel/oneui';

storiesOf('List', module)
    .addDecorator(withKnobs)
    .add('List', () => (
        <List
            Component={select('List component', ['ul', 'ol', 'menu'], 'ul')}
            isDividedList={boolean('Add dividers between items', true)}
        >
            <ListItem>
                First item passed as string{' '}
                <ListActions>
                    <Button context="link">Action</Button>
                </ListActions>
            </ListItem>
            <ListItem isDivided={boolean('Add divider to single item', false)}>
                <Checkbox id="item 2" />
                <div>
                    <Text>Item passed as Text component</Text>
                    <Text>It has multiple lines</Text>
                    <Text>And can have its own divider</Text>
                </div>
            </ListItem>
            <ListItem isSelected={boolean('Selected item', true)}>
                <Text>Selectable item</Text>
            </ListItem>
            <ListItem
                onClick={e => {
                    e.preventDefault();
                    alert('Item was selected'); // eslint-disable-line no-alert, no-undef
                }}
                isDivided={boolean('Add divider to last item', false)}
            >
                <Checkbox id="item 4" />
                <Text>Clickable item. Can also have its own divider</Text>
            </ListItem>
        </List>
    ));
