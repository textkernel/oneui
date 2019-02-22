import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { Tab, Tabs, TabContent, TabItem, TabMenu } from '@textkernel/oneui';

const tabs = [
    {
        id: 'first',
        label: 'First tab',
        content: 'Some content'
    },
    {
        id: 'second',
        label: 'Second tab',
        content: 'Some more content'
    },
    {
        id: 'third',
        label: 'Third tab',
        content: 'Even more content'
    }
];

const tabIds = tabs.map(tab => tab.id);

storiesOf('Tabs', module)
    .addDecorator(withKnobs)
    .add('Simple (managed) tabs', () => (
        <Tabs
            activeTabId={select('Active tab', tabIds, tabIds[0])}
            gutters={boolean('Show gutters', false)}
            onChange={tabId => {
                console.log(`Switched to ${tabId} tab`);
            }}
        >
            {tabs.map(tab => (
                <Tab label={tab.label} id={tab.id} key={tab.id}>
                    {tab.content}
                </Tab>
            ))}
        </Tabs>
    ))
    .add('Controlled mode', () => (
        <div>
            <TabMenu
                activeTabId="second"
                onChange={(e, id) => {
                    e.preventDefault();
                    console.log(`Switch to ${id} tab requested`);
                }}
                gutters={boolean('Show gutters', false)}
            >
                <TabItem id="first" label="Some tab" />
                <TabItem id="second" label="Another tab" />
            </TabMenu>
            <div style={{ padding: 9 }}>Some other content in between tab menu and tab content</div>
            <TabContent>Some content</TabContent>
        </div>
    ));
