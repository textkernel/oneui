import * as React from 'react';
import { TabItem, TabsBar, Tooltip } from '@textkernel/oneui';

export default {
    title: 'Atoms/Tabs',
    component: TabItem,
    subcomponents: { TabsBar },
};

export const _TabBar = (args) => {
    const tabs = [1, 2, 3];

    return (
        <TabsBar {...args}>
            {tabs.map((tab) => (
                <TabItem tabId={tab} key={tab}>
                    {`${tab}. tab`}
                </TabItem>
            ))}
        </TabsBar>
    );
};
_TabBar.storyName = 'Props in TabsBar';
_TabBar.argTypes = {
    activeTabId: {
        options: [1, 2, 3],
    },
};
_TabBar.args = {
    activeTabId: 1,
    isBlock: false,
};

export const _TabItem = (args) => {
    const tabs = [1, 2, 3];
    const initActive = [true, false, false];

    return (
        <TabsBar>
            <>
                <TabItem key="my-tab" {...args} />
                {tabs.map((tab, i) => (
                    <TabItem tabId={tab} key={tab} isActive={initActive[i]}>
                        {`${tab}. tab`}
                    </TabItem>
                ))}
            </>
        </TabsBar>
    );
};
_TabItem.storyName = 'Props in items';
_TabItem.args = {
    tabId: 'my-tab',
    isActive: false,
    children: 'My tab',
};

export const FullImplement = (args) => {
    type Tabs = 't1' | 't2' | 't3';
    const [activeId, setActiveId] = React.useState<Tabs>('t1');

    const handleSelect = (tabId: Tabs) => {
        console.log(`TabItem with tabId: '${tabId}' was clicked`);
        setActiveId(tabId);
    };

    return (
        <TabsBar<Tabs> activeTabId={activeId} onSelect={handleSelect} isBlock={args.isBlock}>
            <TabItem key={1} {...args} />
            <TabItem tabId="t2" key={2}>
                Tab with styled count
                <span style={{ color: 'grey', fontWeight: 400 }}> (2)</span>
            </TabItem>
            <TabItem tabId="t3" key={3}>
                <Tooltip content="some additional information" placement="top">
                    <div>Tab with Tooltip</div>
                </Tooltip>
            </TabItem>
        </TabsBar>
    );
};
FullImplement.storyName = 'Example implementation';
FullImplement.args = {
    isBlock: false,
    tabId: 't1',
    children: 'Simple tab',
};
