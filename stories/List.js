import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { List, ListItem, ListActions, JobResult, Text, Button, Checkbox } from '@textkernel/oneui';

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
    ))
    .add('List showing job results', () => (
        <div style={{ width: '250px' }}>
            <List isDividedList>
                <ListItem>
                    <JobResult
                        title="My first job"
                        location=" - Melbourne"
                        organization="Awsome inc."
                        details="It was posted here, yesterday"
                    />
                </ListItem>
                <ListItem>
                    <JobResult
                        title="Job with a very, very, very long title to be truncated by css"
                        location=" - Melbourne"
                        organization="Awsome inc."
                        details="It was posted there, yesterday"
                    />
                </ListItem>
                <ListItem>
                    <JobResult title="An other job with a very, very, very long title to be truncated by css if it doesn't fit" />
                    <ListActions>
                        <Button context="link">Action</Button>
                    </ListActions>
                </ListItem>
            </List>
        </div>
    ));
