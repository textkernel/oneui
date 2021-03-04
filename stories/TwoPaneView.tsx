import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { TwoPaneView, RightPane, LeftPane } from '@textkernel/oneui';

storiesOf('Molecules|TwoPaneView', module)
    .addDecorator(withKnobs)
    .add('TwoPaneView', () => (
        <TwoPaneView>
            <LeftPane
                style={{
                    minHeight: text('Height of left pane', '600px'),
                    backgroundColor: 'var(--color-info-25)',
                    border: 'solid 1px var(--color-neutral-40)',
                    borderRadius: 'var(--border-radius) 0 0 var(--border-radius)',
                }}
            >
                Left pane content
            </LeftPane>
            <RightPane
                style={{
                    backgroundColor: 'var(--color-good-25)',
                    border: 'solid 1px var(--color-neutral-40)',
                    borderRadius: '0 var(--border-radius) var(--border-radius) 0',
                    borderLeft: 0,
                }}
            >
                Right pane content
            </RightPane>
        </TwoPaneView>
    ));
