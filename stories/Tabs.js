import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Tabs from '../src/components/Tabs';
import Tab from '../src/components/Tab';

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
    .add('Tabs', () => (
        <Tabs
            activeTabId={select('Active tab', tabIds, tabIds[0])}
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
    ));
