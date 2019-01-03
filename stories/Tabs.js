import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Tab from '../src/components/Tabs/Tab';
import TabContent from '../src/components/Tabs/TabContent';
import TabItem from '../src/components/Tabs/TabItem';
import TabMenu from '../src/components/Tabs/TabMenu';
import Tabs from '../src/components/Tabs';

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
                // eslint-disable-next-line no-console
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
    .add('Custom tabs', () => (
        <div>
            <TabMenu
                activeTabId="second"
                onChange={(e, id) => {
                    // eslint-disable-next-line no-console
                    console.log(`Switch to ${id} tab requested`);
                }}
                gutters={boolean('Show gutters', false)}
            >
                <TabItem id="first" label="Some tab" />
                <TabItem id="second" label="Another tab" />
            </TabMenu>
            <div style={{ padding: 9 }}>Some other content here</div>
            <TabContent>Some content</TabContent>
        </div>
    ));
