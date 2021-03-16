/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';
import { Gauge } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Molecules|Gauge', module)
    .addDecorator(withKnobs)
    .add('Gauge', () => {
        const isProgressLoading = boolean('isProgressLoading', false);
        const isContentLoading = boolean('isContentLoading', false);

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '33%' }}>
                    <Gauge
                        context={select('Context', CONTEXTS, CONTEXTS[1])}
                        percentage={number('Percentage', 33)}
                        value={text('Value', '3')}
                        metric={text('Metric', 'Postings per job')}
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        {isContentLoading ? '—' : 'Low'}
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge
                        percentage={46}
                        value="12"
                        metric="Days"
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        {isContentLoading ? '—' : 'Normal'}
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge
                        context="primary"
                        percentage={80}
                        value="$54,321"
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        {isContentLoading ? '—' : 'High'}
                    </Gauge>
                </div>
            </div>
        );
    });
