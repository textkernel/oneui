import * as React from 'react';
import { Dialog, DialogProps } from '../Dialog';

export interface AlertProps {
    /** Alerts do not have cancel button */
    cancelButton?: never;
}

export const Alert: React.FC<AlertProps & DialogProps> = (props) => <Dialog {...props} />;

Alert.displayName = 'Alert';
