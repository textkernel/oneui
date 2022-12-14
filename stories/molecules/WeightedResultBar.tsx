import * as React from 'react';
import { WeightedResultBar, Button } from '@textkernel/oneui';

export default {
    title: 'Molecules/WeightedResultBar',
    component: WeightedResultBar,
};

export const _WeightedResultBar = (args) => (
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
);
_WeightedResultBar.args = {
    percentage: 100,
    count: 123,
    children: 'Repair and Maintenance Technician',
};

const ClickableCount = ({ count }) => (
    <Button size="small" isLink onClick={() => console.log(`WeightedResultBar count: ${count}`)}>
        {count}
    </Button>
);
export const WithACustomCount = (args) => {
    return (
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
    );
};
WithACustomCount.storyName = 'With a custom count';
WithACustomCount.args = {
    percentage: 100,
    count: <ClickableCount count={100} />,
    children: 'Repair and Maintenance Technician',
};
