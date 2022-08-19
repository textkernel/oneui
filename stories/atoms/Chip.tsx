import * as React from 'react';
import { Chip, IconMatch } from '@textkernel/oneui';

export default {
    title: 'Atoms/Chip',
    component: Chip,
};

export const _Chip = (args) => (
    <>
        <Chip {...args} />
        <Chip>
            <IconMatch />
            &nbsp;Chip with Icon as child
        </Chip>
    </>
);
_Chip.args = {
    title: 'This is a title that uses native browser functionality',
    children: 'Chip with title',
};
