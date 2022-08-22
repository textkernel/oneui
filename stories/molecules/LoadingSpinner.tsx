import * as React from 'react';
import { LoadingSpinner } from '@textkernel/oneui';

export default {
    title: 'Molecules/LoadingSpinner',
    component: LoadingSpinner,
};

export const _LoadingSpinner = (args) => <LoadingSpinner {...args} />;
_LoadingSpinner.args = {
    children: 'Loading...',
};
