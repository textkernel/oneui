import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { Tooltip } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '../src/constants';

storiesOf('Molecules|Tooltip', module)
    .addDecorator(withKnobs)
    .add('Tooltip', () => (
        <div style={{ position: 'relative', display: 'table', margin: '0 auto' }}>
            <Tooltip
                placement={select('Placement', POPUP_PLACEMENTS, 'bottom')}
                content={text('Tooltip text', 'this is my tooltip text')}
            >
                hover here to see the tooltip
            </Tooltip>
        </div>
    ));
