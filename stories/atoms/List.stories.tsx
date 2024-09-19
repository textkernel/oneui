import * as React from 'react';
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
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof List> = {
    title: 'Atoms/List',
    component: List,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { ListItem, ListActions, ListOptimizer } as any,
};

export default meta;

type Story = StoryObj<typeof List>;

export const _List: Story = {
    name: 'List',
    args: {
        isDivided: true,
        doSelectOnNavigate: true,
        children: [
            <ListItem>
                First item passed as string
                <ListActions>
                    <Button variant="ghost" size="small">
                        Action
                    </Button>
                </ListActions>
            </ListItem>,
            <ListItem>
                <Checkbox id="item2" />
                <div>
                    <Text>Item passed as Text component</Text>
                    <Text>It has multiple lines</Text>
                </div>
            </ListItem>,
            <ListItem isSelected>
                <Text inline>Item selectable via props</Text>
            </ListItem>,
            <ListItem disabled>
                <Text inline>Disabled item</Text>
            </ListItem>,
            <ListItem
                onClick={(e) => {
                    e.preventDefault();
                    alert('Item was selected'); // eslint-disable-line no-alert, no-undef
                }}
            >
                <Checkbox id="item4" />
                Clickable item
            </ListItem>,
        ],
    },
    render: (args) => <List {...args} />,
};

const onClickJob = (item) => (e) => {
    e.preventDefault();
    alert(`${item} item was selected`); // eslint-disable-line no-alert, no-undef
};
const onClickAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Action button was clicked'); // eslint-disable-line no-alert, no-undef
};

export const ListShowingResults: Story = {
    name: 'List showing results',
    args: {
        isDivided: true,
        doSelectOnNavigate: true,
        children: [
            <ListItem onClick={onClickJob('First')}>
                <Teaser
                    title="My first job"
                    // location="Melbourne"
                    subtitle="Awsome inc."
                    details="It was posted here, yesterday"
                />
                <ListActions>
                    <Button variant="ghost" size="small" onClick={onClickAction}>
                        Action
                    </Button>
                </ListActions>
            </ListItem>,
            <ListItem onClick={onClickJob('Second')}>
                <Teaser
                    title="Job with a very, very, very long title to be truncated by css"
                    // location="Melbourne"
                    subtitle="Awsome inc."
                    details="It was posted there, yesterday"
                />
                <ListActions>
                    <Button variant="ghost" size="small" onClick={onClickAction}>
                        Action
                    </Button>
                </ListActions>
            </ListItem>,
            <ListItem onClick={onClickJob('Third')}>
                <Teaser title="An other job with a very, very, very long title to be truncated by css if it doesn't fit" />
                <ListActions>
                    <Button variant="ghost" size="small" onClick={onClickAction}>
                        Action
                    </Button>
                </ListActions>
            </ListItem>,
        ],
    },
    render: (args) => (
        <div style={{ width: '500px' }}>
            <List {...args} />
        </div>
    ),
};

export const _ListOptimizer: Story = {
    name: 'ListOptimizer',
    args: {
        children: [
            <div style={{ height: '300px', border: '1px solid #d0d1d5' }}>
                <ListOptimizer rowCount={1000}>
                    {({ key, index, style }) => (
                        <ListItem key={key} style={style} highlightContext="default">
                            <Teaser title={`Item ${index + 1}`} />
                        </ListItem>
                    )}
                </ListOptimizer>
            </div>,
        ],
    },
    render: (args) => <List {...args} />,
};
