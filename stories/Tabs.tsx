import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { TabItem, TabsBar } from '@textkernel/oneui';
import withStore from '../src/packages/storybook/withStore';

storiesOf('Atoms|Tabs', module)
    .addDecorator(withKnobs)
    .addParameters(
        withStore({
            activeId: 1,
        })
    )
    .add('Props in TabsBar', () => {
        const tabs = [1, 2, 3];
        return (
            <TabsBar
                activeTabId={select('Active tab', tabs.map(tab => tab), tabs[0])}
                onSelect={tabId => {
                    console.log(`TabItem with tabId: '${tabId}' was clicked`);
                }}
                isBlock={boolean('Equally spaced items', false)}
            >
                {tabs.map(tab => (
                    <TabItem
                        tabId={tab}
                        key={tab}
                        disabled={boolean(`Tab ${tab} is disabled`, false)}
                    >
                        {text(`Tab${tab} label`, `${tab}. tab`)}
                    </TabItem>
                ))}
            </TabsBar>
        );
    })
    .add('Props in items', () => {
        const tabs = [1, 2, 3];
        const initActive = [true, false, false];
        return (
            <TabsBar isBlock={boolean('Equally spaced items', false)}>
                {tabs.map((tab, i) => (
                    <TabItem
                        tabId={tab}
                        key={tab}
                        onSelect={tabId => {
                            console.log(`TabItem with tabId: '${tabId}' was clicked`);
                        }}
                        isActive={boolean(`Tab ${tab} is active`, initActive[i])}
                        disabled={boolean(`Tab ${tab} is disabled`, false)}
                    >
                        {text(`Tab${tab} label`, `${tab}. tab`)}
                    </TabItem>
                ))}
            </TabsBar>
        );
    })
    .add('Example implementation', ({ parameters }) => {
        const tabs = [1, 2, 3];
        const store = parameters.getStore();

        const handleSelect = tabId => {
            console.log(`TabItem with tabId: '${tabId}' was clicked`);
            store.set({ activeId: tabId });
        };

        return (
            <TabsBar
                activeTabId={store.get('activeId')}
                onSelect={handleSelect}
                isBlock={boolean('Equally spaced items', false)}
            >
                {tabs.map(tab => (
                    <TabItem
                        tabId={tab}
                        key={tab}
                        disabled={boolean(`Tab ${tab} is disabled`, false)}
                    >
                        {text(`Tab${tab} label`, `${tab}. tab`)}
                    </TabItem>
                ))}
            </TabsBar>
        );
    });
