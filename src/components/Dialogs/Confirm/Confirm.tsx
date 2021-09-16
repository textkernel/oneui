import * as React from 'react';
import { Dialog, DialogProps, ButtonProps } from '../Dialog';

export interface ConfirmProps extends DialogProps {
    /** Properties of the cancel button */
    cancelButton: ButtonProps;
}

export const Confirm: React.FC<ConfirmProps> = (props) => <Dialog {...props} />;

Confirm.displayName = 'Confirm';
