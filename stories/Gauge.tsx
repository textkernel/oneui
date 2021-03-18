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
                        note={isContentLoading ? '—' : 'Low'}
                        metric={text('Metric', 'Postings per job')}
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        {text('Note', '3')}
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge
                        percentage={46}
                        note={isContentLoading ? '—' : 'Normal'}
                        metric="Days"
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        12
                    </Gauge>
                </div>
                <div style={{ width: '33%' }}>
                    <Gauge
                        context="primary"
                        percentage={80}
                        note={isContentLoading ? '—' : 'High'}
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        $54,321
                    </Gauge>
                </div>
            </div>
        );
    });
