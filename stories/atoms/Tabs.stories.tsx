import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabItem, TabsBar, Tooltip } from '@textkernel/oneui';

const meta: Meta<typeof TabsBar> = {
    title: 'Atoms/Tabs',
    component: TabsBar,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { TabItem } as any,
};

export default meta;

type Story = StoryObj<typeof TabsBar>;

export const _TabBar: Story = {
    name: 'Props in TabsBar',
    args: {
        activeTabId: 1,
        isBlock: false,
    },
    argTypes: {
        activeTabId: {
            options: [1, 2, 3],
        },
    },
    render: (args) => {
        const tabs = [1, 2, 3];

        return (
            <>
                <p>
                    In this story you can see how different props effect the state of the whole tab
                    bar. However no additional logic is implemented and so the tabs will not
                    &quot;work&quot; as expected in a real scenario.
                </p>
                <TabsBar {...args}>
                    {tabs.map((tab) => (
                        <TabItem tabId={tab} key={tab}>
                            {`${tab}. tab`}
                        </TabItem>
                    ))}
                </TabsBar>
            </>
        );
    },
};

type TabItemStory = StoryObj<typeof TabItem>;

export const _TabItem: TabItemStory = {
    name: 'Props in items',
    args: {
        tabId: 'my-tab',
        isActive: false,
        children: 'My tab',
        disabled: false,
    },
    render: (args) => {
        const tabs = [1, 2, 3];
        const initActive = [true, false, false];

        return (
            <>
                <p>
                    In this story you can see how different props effect the state of the first tab,
                    how keyboard and mouse interactions effect the look and feel of the tabs.
                    However no additional logic is implemented and so the tabs will not
                    &quot;work&quot; as expected in a real scenario.
                </p>
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
            </>
        );
    },
};

export const FullImplement: TabItemStory = {
    name: 'Example implementation',
    args: {
        isBlock: false,
        tabId: 't1',
        children: 'Simple tab',
    },
    render: (args) => {
        type Tabs = 't1' | 't2' | 't3';
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                <TabItem tabId="t4" key={4} disabled>
                    Disabled tab
                </TabItem>
            </TabsBar>
        );
    },
};
