import * as React from 'react';
import { ProgressBar } from '@textkernel/oneui';

export default {
    title: 'Atoms/ProgressBar',
    component: ProgressBar,
};

export const _ProgressBar = (args) => <ProgressBar {...args} />;
_ProgressBar.args = {
    animated: true,
    percentage: 50,
    children: 'Loading...',
};
