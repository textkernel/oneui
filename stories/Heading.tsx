import * as React from 'react';
import { Heading } from '@textkernel/oneui';

export default {
    title: 'Atoms/Heading',
    component: Heading,
};

export const _Heading = (args) => <Heading {...args} />;
_Heading.args = {
    children: 'This is a heading',
};
