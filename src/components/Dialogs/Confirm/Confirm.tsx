import * as React from 'react';
import { Dialog, DialogProps, ButtonProps } from '../Dialog';

export interface Props {
    /** Properties of the cancel button */
    cancelButton: ButtonProps;
}

export const Confirm: React.FC<Props & DialogProps> = ({
    cancelButton,
    onRequestClose,
    ...rest
}) => (
    <Dialog
        cancelButton={cancelButton}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick={false}
        onRequestClose={cancelButton.onClick}
        {...rest}
    />
);

Confirm.displayName = 'Confirm';
