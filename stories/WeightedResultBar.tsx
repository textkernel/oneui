import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { WeightedResultBar, WeightedResultBarLoader, Text } from '@textkernel/oneui';

storiesOf('Molecules|WeightedResultBar', module)
    .addDecorator(withKnobs)
    .add('WeightedResultBar', () => {
        return (
            <div style={{ width: 500 }}>
                <WeightedResultBar
                    percentage={number('Percentage', 100)}
                    count={number('Count', 123)}
                    context="primary"
                >
                    Repair and Maintenance Technician
                </WeightedResultBar>
                <WeightedResultBar percentage={76} count={94}>
                    Sales Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79}>
                    Software Engineer
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79}>
                    Operations Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={58} count={72}>
                    Business Development Manager
                </WeightedResultBar>
            </div>
        );
    })
    .add('With a custom count', () => {
        const ClickableCount = ({ count }) => (
            <Text
                inline
                context="brand"
                onClick={() => console.log(`WeightedResultBar count: ${count}`)}
            >
                {count}
            </Text>
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
    })
    .add('WeightedResultBarLoader', () => {
        return (
            <div style={{ width: 500 }}>
                <WeightedResultBarLoader />
                <WeightedResultBarLoader />
                <WeightedResultBarLoader />
                <WeightedResultBarLoader />
                <WeightedResultBarLoader />
            </div>
        );
    });
