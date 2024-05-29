import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TwoPaneView, RightPane, LeftPane } from '@textkernel/oneui';

const meta: Meta<typeof TwoPaneView> = {
    title: 'Molecules/TwoPaneView',
    component: TwoPaneView,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { RightPane, LeftPane } as any,
};

export default meta;

type Story = StoryObj<typeof TwoPaneView>;

export const _TwoPaneView: Story = {
    name: 'TwoPaneView',
    args: {},
    render: (args) => (
        <TwoPaneView {...args}>
            <LeftPane
                style={{
                    minHeight: '600px',
                    backgroundColor: 'var(--color-info-30)',
                    border: 'solid 1px var(--color-neutral-40)',
                    borderRadius: 'var(--border-radius) 0 0 var(--border-radius)',
                }}
            >
                Left pane content
            </LeftPane>
            <RightPane
                style={{
                    backgroundColor: 'var(--color-success-20)',
                    border: 'solid 1px var(--color-neutral-40)',
                    borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                    borderLeft: 0,
                }}
            >
                Right pane content
            </RightPane>
        </TwoPaneView>
    ),
};
