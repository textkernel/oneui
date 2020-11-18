/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';
import { Gauge } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Molecules|Gauge', module)
    .addDecorator(withKnobs)
    .add('Gauge', () => {
        const isLoading = boolean('isLoading', false);

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '33%' }}>
                    <Gauge
                        context={select('Context', CONTEXTS, CONTEXTS[1])}
                        percentage={number('Percentage', 100)}
                        value={text('Value', '1,234')}
                        metric={text('Metric', 'jobs')}
                        isLoading={isLoading}
                    >
                        {isLoading ? '—' : 'High'}
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge percentage={46} value="12" metric="days" isLoading={isLoading}>
                        {isLoading ? '—' : 'Average'}
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge context="primary" percentage={80} value="$54,321" isLoading={isLoading}>
                        {isLoading ? '—' : 'High'}
                    </Gauge>
                </div>
            </div>
        );
    });
