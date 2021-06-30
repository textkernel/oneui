import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { WeightedResultBar, Button } from '@textkernel/oneui';

storiesOf('Molecules|WeightedResultBar', module)
    .addDecorator(withKnobs)
    .add('WeightedResultBar', () => {
        const loading = boolean('Loading', false);
        return (
            <div style={{ width: 500 }}>
                <WeightedResultBar
                    percentage={number('Percentage', 100)}
                    count={number('Count', 123)}
                    context="primary"
                    isLoading={loading}
                >
                    Repair and Maintenance Technician
                </WeightedResultBar>
                <WeightedResultBar percentage={76} count={94} isLoading={loading}>
                    Sales Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79} isLoading={loading}>
                    Software Engineer
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79} isLoading={loading}>
                    Operations Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={58} count={72} isLoading={loading}>
                    Business Development Manager
                </WeightedResultBar>
            </div>
        );
    })
    .add('With a custom count', () => {
        const ClickableCount = ({ count }) => (
            <Button
                size="small"
                context="brand"
                onClick={() => console.log(`WeightedResultBar count: ${count}`)}
            >
                {count}
            </Button>
        );

        return (
            <div style={{ width: 500 }}>
                <WeightedResultBar
                    percentage={number('Percentage', 100)}
                    count={<ClickableCount count={number('Percentage', 100)} />}
                    context="primary"
                >
                    Repair and Maintenance Technician
                </WeightedResultBar>
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
    });
