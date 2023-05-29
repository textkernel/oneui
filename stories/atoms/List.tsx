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

export default {
    title: 'Atoms/List',
    component: List,
    subcomponents: { ListItem, ListActions, ListOptimizer },
};

export const _List = (args) => <List {...args} />;
_List.args = {
    isDivided: true,
    doSelectOnNavigate: true,
    children: [
        <ListItem>
            First item passed as string
            <ListActions>
                <Button isLink isInline>
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
};

export const ListShowingResults = (args) => (
    <div style={{ width: '500px' }}>
        <List {...args} />
    </div>
);
const onClickJob = (item) => (e) => {
    e.preventDefault();
    alert(`${item} item was selected`); // eslint-disable-line no-alert, no-undef
};
const onClickAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Action button was clicked'); // eslint-disable-line no-alert, no-undef
};
ListShowingResults.storyName = 'List showing results';
ListShowingResults.args = {
    isDivided: true,
    doSelectOnNavigate: true,
    children: [
        <ListItem onClick={onClickJob('First')}>
            <Teaser
                title="My first job"
                location="Melbourne"
                subTitle="Awsome inc."
                details="It was posted here, yesterday"
            />
            <ListActions>
                <Button isLink onClick={onClickAction} isInline>
                    Action
                </Button>
            </ListActions>
        </ListItem>,
        <ListItem onClick={onClickJob('Second')}>
            <Teaser
                title="Job with a very, very, very long title to be truncated by css"
                location="Melbourne"
                subTitle="Awsome inc."
                details="It was posted there, yesterday"
            />
            <ListActions>
                <Button isLink onClick={onClickAction} isInline>
                    Action
                </Button>
            </ListActions>
        </ListItem>,
        <ListItem onClick={onClickJob('Third')}>
            <Teaser title="An other job with a very, very, very long title to be truncated by css if it doesn't fit" />
            <ListActions>
                <Button isLink onClick={onClickAction} isInline>
                    Action
                </Button>
            </ListActions>
        </ListItem>,
    ],
};

export const _ListOptimizer = (args) => <List {...args} />;
_ListOptimizer.storyName = 'ListOptimizer';
_ListOptimizer.args = {
    children: (
        <div style={{ height: '300px', border: '1px solid #d0d1d5' }}>
            <ListOptimizer rowCount={1000}>
                {({ key, index, style }) => (
                    <ListItem key={key} style={style} highlightContext="default">
                        <Teaser title={`Item ${index + 1}`} />
                    </ListItem>
                )}
            </ListOptimizer>
        </div>
    ),
};
