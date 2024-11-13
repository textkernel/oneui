import * as React from 'react';
import { Dialog, DialogProps, ButtonProps } from '../Dialog';

export interface ConfirmProps {
    /** Properties of the cancel button */
    cancelButton: ButtonProps;
}

export const Confirm: React.FC<ConfirmProps & DialogProps> = (props) => <Dialog {...props} />;

Confirm.displayName = 'Confirm';
