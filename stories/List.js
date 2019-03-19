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
    .add('List showing job results', () => {
        const onClickJob = e => {
            e.preventDefault();
            alert('Item was selected'); // eslint-disable-line no-alert, no-undef
        };
        const onClickAction = e => {
            e.preventDefault();
            e.stopPropagation();
            alert('Action button was clicked'); // eslint-disable-line no-alert, no-undef
        };

        return (
            <div style={{ width: '500px' }}>
                <List isDivided>
                    <ListItem onClick={onClickJob}>
                        <JobResult
                            title="My first job"
                            location=" - Melbourne"
                            organization="Awsome inc."
                            details="It was posted here, yesterday"
                        />
                        <ListActions>
                            <Button context="link" onClick={onClickAction}>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                    <ListItem onClick={onClickJob}>
                        <JobResult
                            title="Job with a very, very, very long title to be truncated by css"
                            location=" - Melbourne"
                            organization="Awsome inc."
                            details="It was posted there, yesterday"
                        />
                        <ListActions>
                            <Button context="link" onClick={onClickAction}>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                    <ListItem onClick={onClickJob}>
                        <JobResult title="An other job with a very, very, very long title to be truncated by css if it doesn't fit" />
                        <ListActions>
                            <Button context="link" onClick={onClickAction}>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                </List>
            </div>
        );
    });
