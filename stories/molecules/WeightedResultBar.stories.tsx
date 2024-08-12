import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WeightedResultBar, Button } from '@textkernel/oneui';

const meta: Meta<typeof WeightedResultBar> = {
    title: 'Molecules/WeightedResultBar',
    component: WeightedResultBar,
};

export default meta;

type Story = StoryObj<typeof WeightedResultBar>;

export const _WeightedResultBar: Story = {
    name: 'WeightedResultBar',
    args: {
        percentage: 100,
        count: 123,
        children: 'Repair and Maintenance Technician',
    },
    render: (args) => (
        <div style={{ width: 500 }}>
            <WeightedResultBar {...args} />
            <WeightedResultBar percentage={76} count={94} isLoading={args.isLoading}>
                Sales Manager
            </WeightedResultBar>
            <WeightedResultBar percentage={64} count={79} isLoading={args.isLoading}>
                Software Engineer
            </WeightedResultBar>
            <WeightedResultBar percentage={64} count={79} isLoading={args.isLoading}>
                Operations Manager
            </WeightedResultBar>
            <WeightedResultBar percentage={58} count={72} isLoading={args.isLoading}>
                Business Development Manager
            </WeightedResultBar>
        </div>
    ),
};

const ClickableCount = ({ count }) => (
    <Button
        size="small"
        variant="ghost"
        onClick={() => console.log(`WeightedResultBar count: ${count}`)}
    >
        {count}
    </Button>
);

export const WithACustomCount: Story = {
    name: 'With a custom count',
    args: {
        percentage: 100,
        count: <ClickableCount count={100} />,
        children: 'Repair and Maintenance Technician',
    },
    render: (args) => (
        <div style={{ width: 500 }}>
            <WeightedResultBar {...args} />
            <WeightedResultBar percentage={76} count={<ClickableCount count={94} />}>
                Sales Manager
            </WeightedResultBar>
            <WeightedResultBar percentage={64} count={<ClickableCount count={79} />}>
                Software Engineer
            </WeightedResultBar>
            <WeightedResultBar percentage={64} count={<ClickableCount count={79} />}>
                Operations Manager
            </WeightedResultBar>
            <WeightedResultBar percentage={58} count={<ClickableCount count={72} />}>
                Business Development Manager
            </WeightedResultBar>
        </div>
    ),
};
