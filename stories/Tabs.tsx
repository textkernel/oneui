import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { TabItem, TabsBar, Tooltip } from '@textkernel/oneui';
import { StoreInjector } from '../src/packages/storybook/withStore';

storiesOf('Atoms|Tabs', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            activeId: 1,
        })
    )
    .add('Props in TabsBar', () => {
        const tabs = [1, 2, 3];
        const handleSelect = tabId => {
            // IE11 errors on string concatenation inside console.log. So let's do it outside of it.
            const msg = `TabItem with tabId: '${tabId}' was clicked`;
            console.log(msg);
        };

        return (
            <TabsBar
                activeTabId={select(
                    'Active tab',
                    tabs.map(tab => tab),
                    tabs[0]
                )}
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
    })
    .add('Props in items', () => {
        const tabs = [1, 2, 3];
        const initActive = [true, false, false];
        const handleSelect = tabId => {
            // IE11 errors on string concatenation inside console.log. So let's do it outside of it.
            const msg = `TabItem with tabId: '${tabId}' was clicked`;
            console.log(msg);
        };

        return (
            <TabsBar isBlock={boolean('Equally spaced items', false)}>
                {tabs.map((tab, i) => (
                    <TabItem
                        tabId={tab}
                        key={tab}
                        onSelect={handleSelect}
                        isActive={boolean(`Tab ${tab} is active`, initActive[i])}
                        disabled={boolean(`Tab ${tab} is disabled`, false)}
                    >
                        {text(`Tab${tab} label`, `${tab}. tab`)}
                    </TabItem>
                ))}
            </TabsBar>
        );
    })
    .add('Example implementation', parameters => {
        const store = parameters?.parameters.getStore();

        const handleSelect = tabId => {
            // IE11 errors on string concatenation inside console.log. So let's do it outside of it.
            const msg = `TabItem with tabId: '${tabId}' was clicked`;
            console.log(msg);
            store.set({ activeId: tabId });
        };

        return (
            <TabsBar
                activeTabId={store.get('activeId')}
                onSelect={handleSelect}
                isBlock={boolean('Equally spaced items', false)}
            >
                <TabItem tabId={1} key={1} disabled={boolean('Tab 1 is disabled', false)}>
                    {text('Tab 1 label', 'Simple tab')}
                </TabItem>
                <TabItem tabId={2} key={2} disabled={boolean('Tab 2 is disabled', false)}>
                    {text('Tab 2 label', 'Tab with styled count')}
                    <span style={{ color: 'grey', fontWeight: 400 }}> (2)</span>
                </TabItem>
                <TabItem tabId={3} key={3} disabled={boolean('Tab 3 is disabled', false)}>
                    <Tooltip content="some additional information" placement="top">
                        <div>{text('Tab 3 label', 'Tab with Tooltip')}</div>
                    </Tooltip>
                </TabItem>
            </TabsBar>
        );
    });
