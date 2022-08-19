import * as React from 'react';
import { Tooltip } from '@textkernel/oneui';

export default {
    title: 'Molecules/Tooltip',
    component: Tooltip,
};

export const _Tooltip = (args) => (
    <div style={{ position: 'relative', display: 'table', margin: '0 auto' }}>
        <Tooltip {...args} />
    </div>
);
_Tooltip.args = {
    placement: 'bottom',
    content: 'this is my tooltip text',
    arrow: true,
    children: <div>hover here to see the tooltip</div>,
};
