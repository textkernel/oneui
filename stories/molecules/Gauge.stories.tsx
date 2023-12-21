import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Gauge, IconJobfeed, Tooltip } from '@textkernel/oneui';

const meta: Meta<typeof Gauge> = {
    title: 'Molecules/Gauge',
    component: Gauge,
};

export default meta;

type Story = StoryObj<typeof Gauge>;

export const _Gauge: Story = {
    name: 'Gauge',
    args: {
        percentage: 33,
        metric: 'Postings per job',
        children: '3',
        note: 'Low',
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '33%' }}>
                <Gauge {...args} />
            </div>
            <div style={{ width: '33%' }}>
                <Gauge {...args}>12</Gauge>
            </div>
            <div style={{ width: '33%' }}>
                <Gauge {...args}>$54,321</Gauge>
            </div>
        </div>
    ),
};

export const GaugeWithAnIcon: Story = {
    name: 'Gauge with an icon',
    args: {
        percentage: 60,
        note: 'High',
        isProgressLoading: false,
        isContentLoading: false,
        children: (
            <div>
                $54,321
                <IconJobfeed />
            </div>
        ),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <Gauge {...args} />
        </div>
    ),
};

export const GaugeWithATooltip: Story = {
    name: 'Gauge with a tooltip',
    args: {
        percentage: 35,
        metric: "Something long so it doesn't fit",
        note: 'High',
        isProgressLoading: false,
        isContentLoading: false,
        children: (
            <Tooltip content="Tooltip content">
                <span>Tooltip</span>
            </Tooltip>
        ),
    },
    render: (args) => (
        <div style={{ display: 'flex' }}>
            <Gauge {...args} />
        </div>
    ),
};
