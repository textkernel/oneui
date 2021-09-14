import * as React from 'react';
import { bem } from '../../utils';
import { Heading } from '../Heading';
import { Button } from '../Buttons';
import { Modal, ModalProps } from '../Modal';
import styles from './AlertConfirm.scss';

type ButtonProps = {
    onClick: () => void;
    label: string;
};

interface DialogProps extends ModalProps {
    /** Should the alert appear */
    isOpen: boolean;
    /** The alert content */
    children: ReactNode;
    /** Dialog title */
    title?: string;
    /** Properties of the accept button */
    acceptButton: ButtonProps;
    /** Properties of the cancel button */
    cancelButton?: ButtonProps;
}

export interface AlertProps extends DialogProps {
    /** Alerts do not have cancel button */
    cancelButton?: never;
}

export interface ConfirmProps extends DialogProps {
    /** Properties of the cancel button */
    cancelButton: ButtonProps;
}

const { block, elem } = bem('Alert', styles);

const Dialog: React.FC<AlertProps | ConfirmProps> = (props) => {
    const { isOpen, children, title, acceptButton, cancelButton, ...rest } = props;

    const isConfirm = !!cancelButton;

    return (
        <Modal {...rest} {...block(props)} isOpen={isOpen}>
            <div {...elem('content', props)} role="alert">
                {!!title && (
                    <Heading level="h2" {...elem('title', props)}>
                        {title}
                    </Heading>
                )}
                {children}
            </div>
            <div {...elem('actions', props)}>
                {isConfirm && (
                    <Button onClick={cancelButton!.onClick} context="link">
                        {cancelButton!.label}
                    </Button>
                )}
                <Button onClick={acceptButton.onClick} context={isConfirm ? 'primary' : 'brand'}>
                    {acceptButton.label}
                </Button>
            </div>
        </Modal>
    );
};

Dialog.displayName = 'Dialog';

export const Alert: React.FC<AlertProps> = (props) => <Dialog {...props} />;

Alert.displayName = 'Alert';

export const Confirm: React.FC<ConfirmProps> = (props) => <Dialog {...props} />;

Confirm.displayName = 'Confirm';
