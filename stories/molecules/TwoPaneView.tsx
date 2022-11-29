import * as React from 'react';
import { TwoPaneView, RightPane, LeftPane } from '@textkernel/oneui';

export default {
    title: 'Molecules/TwoPaneView',
    component: TwoPaneView,
    subcomponents: { RightPane, LeftPane },
};

export const _TwoPaneView = (args) => (
    <TwoPaneView {...args}>
        <LeftPane
            style={{
                minHeight: '600px',
                backgroundColor: 'var(--color-primary-25)',
                border: 'solid 1px var(--color-neutral-40)',
                borderRadius: 'var(--border-radius) 0 0 var(--border-radius)',
            }}
        >
            Left pane content
        </LeftPane>
        <RightPane
            style={{
                backgroundColor: 'var(--color-success-25)',
                border: 'solid 1px var(--color-neutral-40)',
                borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                borderLeft: 0,
            }}
        >
            Right pane content
        </RightPane>
    </TwoPaneView>
);
