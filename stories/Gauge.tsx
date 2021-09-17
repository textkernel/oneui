/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';
import { Gauge, IconJobfeed, Tooltip } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Molecules/Gauge', module)
    .addDecorator(withKnobs)
    .add('Gauge', () => {
        const isProgressLoading = boolean('isProgressLoading', false);
        const isContentLoading = boolean('isContentLoading', false);
        const note = text('Note', 'Low');

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '33%' }}>
                    <Gauge
                        context={select('Context', CONTEXTS, CONTEXTS[1])}
                        percentage={number('Percentage', 33)}
                        note={isContentLoading ? '—' : note}
                        metric={text('Metric', 'Postings per job')}
                        isProgressLoading={isProgressLoading}
                        isContentLoading={isContentLoading}
                    >
                        {text('Children', '3')}
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
    })
    .add('Gauge with an icon', () => {
        const isProgressLoading = boolean('isProgressLoading', false);
        const isContentLoading = boolean('isContentLoading', false);

        return (
            <div style={{ display: 'flex' }}>
                <Gauge
                    context="primary"
                    percentage={60}
                    note={isContentLoading ? '—' : 'High'}
                    isProgressLoading={isProgressLoading}
                    isContentLoading={isContentLoading}
                >
                    <div>
                        $54,321
                        <IconJobfeed context="brand" />
                    </div>
                </Gauge>
            </div>
        );
    })
    .add('Gauge with a tooltip', () => {
        const isProgressLoading = boolean('isProgressLoading', false);
        const isContentLoading = boolean('isContentLoading', false);

        return (
            <div style={{ display: 'flex' }}>
                <Gauge
                    context="primary"
                    percentage={35}
                    metric={isContentLoading ? '—' : "Something long so it doesn't fit"}
                    note={isContentLoading ? '—' : 'High'}
                    isProgressLoading={isProgressLoading}
                    isContentLoading={isContentLoading}
                >
                    <Tooltip content="Tooltip content">
                        <span>Tooltip</span>
                    </Tooltip>
                </Gauge>
            </div>
        );
    });
