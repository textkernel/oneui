import * as React from 'react';
import { ComponentStory } from '@storybook/react';
import { Gauge, IconJobfeed, Tooltip } from '@textkernel/oneui';

export default {
    title: 'Molecules/Gauge',
    component: Gauge,
};

const Template: ComponentStory<typeof Gauge> = (args) => (
    <div style={{ display: 'flex' }}>
        <Gauge {...args} />
    </div>
);

export const _Gauge = (args) => {
    return (
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
    );
};
_Gauge.args = {
    percentage: 33,
    metric: 'Postings per job',
    children: '3',
    note: 'Low',
};

export const GaugeWithAnIcon = Template.bind({});
GaugeWithAnIcon.storyName = 'Gauge with an icon';
GaugeWithAnIcon.args = {
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
};

export const GaugeWithATooltip = Template.bind({});
GaugeWithATooltip.storyName = 'Gauge with a tooltip';
GaugeWithATooltip.args = {
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
};
