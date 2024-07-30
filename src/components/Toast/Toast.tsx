/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Toaster, toast } from 'sonner';
// import { bem } from '../../utils';
import { Context } from '../../constants';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Short and descriptive title */
    title?: string;
    /** Body content */
    description: string;
    /** The Toast context (e.g. info, critical, success or cautious - defaults to info) */
    context?: Context;
    /** Action array, each containing item text, callback and href to action. Max 2 */
    actions?: { text: string; callback?: () => void; href?: string }[];
    /** Has a close button, default: true */
    isClosable?: boolean;
    // /** a function that is called when the toast closes via close-button-click */
    // onClose?: () => void;
    // /** A label for the close button that will be used by screenreaders */
    // closeButtonLabel: string;
}

// const { block, elem } = bem('Toast', styles);

export const Toast = ({ title, description }: ToastProps) =>
    toast(title, {
        description,
    });

export const OneToaster = ({ children }) => (
    <>
        {children}
        <Toaster />
    </>
);

Toast.displayName = 'Toast';
OneToaster.displayName = 'Toaster';
