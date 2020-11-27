import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { WeightedResultBar, WeightedResultBarLoader } from '@textkernel/oneui';

storiesOf('Organism|WeightedResultBar', module)
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
