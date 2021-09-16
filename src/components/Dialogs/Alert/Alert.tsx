import * as React from 'react';
import { Dialog, DialogProps } from '../Dialog';

export interface AlertProps extends DialogProps {
    /** Alerts do not have cancel button */
    cancelButton?: never;
}

export const Alert: React.FC<AlertProps> = (props) => <Dialog {...props} />;

Alert.displayName = 'Alert';
