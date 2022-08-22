import * as React from 'react';
import { PageWidthRestrictor, BlockWidthRestrictor } from '@textkernel/oneui';

export default {
    title: 'Atoms/WidthRestrictor',
    component: PageWidthRestrictor,
    subcomponents: { BlockWidthRestrictor },
};

export const _PageWidthRestrictor = (args) => (
    <div style={{ backgroundColor: 'teal' }}>
        <PageWidthRestrictor {...args} />
    </div>
);
_PageWidthRestrictor.args = {
    style: { backgroundColor: 'darkturquoise' },
    children: 'This is a placeholder for children',
};

export const _BlockWidthRestrictor = (args) => (
    <div style={{ backgroundColor: 'teal' }}>
        <BlockWidthRestrictor {...args} />
    </div>
);
_BlockWidthRestrictor.args = {
    As: 'div',
    style: { backgroundColor: 'darkturquoise' },
    children: 'This is a placeholder for children',
};
