import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { WeightedResultBar } from '@textkernel/oneui';

storiesOf('Organism|WeightedResultBar', module)
    .addDecorator(withKnobs)
    .add('WeightedResultBar', () => {
        const isLoading = boolean('isLoading', false);

        return (
            <div style={{ width: 500 }}>
                <WeightedResultBar
                    percentage={number('Percentage', 100)}
                    count={number('Count', 123)}
                    isLoading={isLoading}
                    context="primary"
                >
                    Repair and Maintenance Technician
                </WeightedResultBar>
                <WeightedResultBar percentage={76} count={94} isLoading={isLoading}>
                    Sales Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79} isLoading={isLoading}>
                    Software Engineer
                </WeightedResultBar>
                <WeightedResultBar percentage={64} count={79} isLoading={isLoading}>
                    Operations Manager
                </WeightedResultBar>
                <WeightedResultBar percentage={58} count={72} isLoading={isLoading}>
                    Business Development Manager
                </WeightedResultBar>
            </div>
        );
    });
