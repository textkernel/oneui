import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { Tooltip, Chip } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '../src/constants';

storiesOf('Molecules|Tooltip', module)
    .addDecorator(withKnobs)
    .add('Tooltip', () => (
        <div style={{ position: 'relative', display: 'table', margin: '0 auto' }}>
            <Tooltip
                placement={select('Placement', POPUP_PLACEMENTS, 'bottom')}
                content={text('Tooltip text', 'this is my tooltip text')}
                alwaysVisible={boolean('Always show tooltip', false)}
            >
                <Chip>
                    Content
                </Chip>
            </Tooltip>
        </div>
    ));
