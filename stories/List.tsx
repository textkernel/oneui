import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, number, withKnobs } from '@storybook/addon-knobs';
import {
    List,
    ListItem,
    ListActions,
    ListOptimizer,
    Teaser,
    Text,
    Button,
    Checkbox,
} from '@textkernel/oneui';
import { CONTEXTS } from '../src/constants';

storiesOf('Atoms|List', module)
    .addDecorator(withKnobs)
    .add('List', () => {
        const highlightContext = select('Highlight context', ['default', ...CONTEXTS], 'default');
        return (
            <List
                isDivided={boolean('Add dividers between items', true)}
                doSelectOnNavigate={boolean('Select item on keyboard navigation', true)}
            >
                <ListItem highlightContext={highlightContext}>
                    First item passed as string{' '}
                    <ListActions>
                        <Button context="link" isInline>
                            Action
                        </Button>
                    </ListActions>
                </ListItem>
                <ListItem highlightContext={highlightContext}>
                    <Checkbox id="item2" />
                    <div>
                        <Text>Item passed as Text component</Text>
                        <Text>It has multiple lines</Text>
                    </div>
                </ListItem>
                <ListItem
                    isSelected={boolean('Select item', true)}
                    highlightContext={highlightContext}
                >
                    <Text inline>Item selectable via props</Text>
                </ListItem>
                <ListItem
                    disabled={boolean('Disable item', true)}
                    highlightContext={highlightContext}
                >
                    <Text inline>Disabled item</Text>
                </ListItem>
                <ListItem
                    onClick={e => {
                        e.preventDefault();
                        alert('Item was selected'); // eslint-disable-line no-alert, no-undef
                    }}
                    highlightContext={highlightContext}
                >
                    <Checkbox id="item4" />
                    Clickable item
                </ListItem>
            </List>
        );
    })
    .add('List showing results', () => {
        const onClickJob = item => e => {
            e.preventDefault();
            alert(`${item} item was selected`); // eslint-disable-line no-alert, no-undef
        };
        const onClickAction = e => {
            e.preventDefault();
            e.stopPropagation();
            alert('Action button was clicked'); // eslint-disable-line no-alert, no-undef
        };

        return (
            <div style={{ width: '500px' }}>
                <List
                    isDivided
                    doSelectOnNavigate={boolean('Select item on keyboard navigation', true)}
                >
                    <ListItem onClick={onClickJob('First')}>
                        <Teaser
                            title="My first job"
                            location="Melbourne"
                            subTitle="Awsome inc."
                            details="It was posted here, yesterday"
                        />
                        <ListActions>
                            <Button context="link" onClick={onClickAction} isInline>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                    <ListItem onClick={onClickJob('Second')}>
                        <Teaser
                            title="Job with a very, very, very long title to be truncated by css"
                            location="Melbourne"
                            subTitle="Awsome inc."
                            details="It was posted there, yesterday"
                        />
                        <ListActions>
                            <Button context="link" onClick={onClickAction} isInline>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                    <ListItem onClick={onClickJob('Third')}>
                        <Teaser title="An other job with a very, very, very long title to be truncated by css if it doesn't fit" />
                        <ListActions>
                            <Button context="link" onClick={onClickAction} isInline>
                                Action
                            </Button>
                        </ListActions>
                    </ListItem>
                </List>
            </div>
        );
    })
    .add('ListOptimizer', () => {
        const numberItems = number('Number items', 1000);
        return (
            <List>
                {[
                    <div style={{ height: '300px', border: '1px solid #d0d1d5' }}>
                        <ListOptimizer rowCount={numberItems}>
                            {({ key, index, style }) => (
                                <ListItem key={key} style={style} highlightContext="default">
                                    <Teaser title={`Item ${index + 1}`} />
                                </ListItem>
                            )}
                        </ListOptimizer>
                    </div>,
                ]}
            </List>
        );
    });
