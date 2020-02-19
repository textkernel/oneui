import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { Tooltip } from '@textkernel/oneui';
import { POPUP_PLACEMENTS } from '../src/constants';
import '../src/components/Tooltip/Tooltip.scss';

storiesOf('Molecules|Tooltip', module)
    .addDecorator(withKnobs)
    .add(
        'Tooltip',
        () => (
            <div style={{ position: 'relative', display: 'table', margin: '0 auto' }}>
                <Tooltip
                    placement={select('Placement', POPUP_PLACEMENTS, 'bottom')}
                    content={text('Tooltip text', 'this is my tooltip text')}
                    arrow={boolean('Arrow', true)}
                >
                    <div>hover here to see the tooltip</div>
                </Tooltip>
            </div>
        ),
        {
            info: {
                text: `
                ## Usage information

                This component is a wrapper around [tippy.js/react](https://github.com/atomiks/tippy.js-react#-usage).

                * You can pass other props according to their definition, apart from the one listed below.
                * Full list of props available can be found [here](https://atomiks.github.io/tippyjs/all-props/).
                `,
            },
        }
    );
