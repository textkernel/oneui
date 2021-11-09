/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select, withKnobs } from '@storybook/addon-knobs';
import { Gauge, IconJobfeed, Tooltip } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('Molecules|Gauge', module)
    .addDecorator(withKnobs)
    .add(
        'Gauge',
        () => {
            const isProgressLoading = boolean('isProgressLoading', false);
            const isContentLoading = boolean('isContentLoading', false);
            const note = text('Note', 'Low');

            return (
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '33%' }}>
                        <Gauge
                            context={select('Context 1', CONTEXTS, CONTEXTS[1])}
                            percentage={number('Percentage 1', 33)}
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
                            context={select('Context 2', CONTEXTS, CONTEXTS[1])}
                            percentage={number('Percentage 2', 46)}
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
                            context={select('Context 3', CONTEXTS, CONTEXTS[2])}
                            percentage={number('Percentage 3', 78)}
                            note={isContentLoading ? '—' : 'High'}
                            isProgressLoading={isProgressLoading}
                            isContentLoading={isContentLoading}
                        >
                            $54,321
                        </Gauge>
                    </div>
                </div>
            );
        },
        {
            info: {
                text: `
            ## Testing information

            This component is uses \`Math.random\` internally which will show up in snapshots.

            To make sure snapshots are consistent you should mock it in your tests. E.g.:

            \`\`\`
            const mathRandomSpy = jest.spyOn(Math, 'random');
            mathRandomSpy.mockImplementation(() => 0.42);
            \`\`\`

            `,
            },
        }
    )
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
