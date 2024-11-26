import * as React from 'react';
import { Dialog, ButtonProps, DialogProps } from '../Dialog';

export interface Props {
    /** Alerts do not have cancel button */
    cancelButton?: never;
    /** Properties of the accept button */
    acceptButton: ButtonProps;
}

export const Alert: React.FC<Props & DialogProps> = ({ acceptButton, onRequestClose, ...rest }) => (
    <Dialog acceptButton={acceptButton} onRequestClose={acceptButton.onClick} {...rest} />
);

Alert.displayName = 'Alert';
