import * as React from 'react';
import { bem } from '../../../utils';
import { Heading } from '../../Heading';
import { Button } from '../../Buttons';
import { Modal, ModalProps } from '../../Modal';
import styles from './Dialog.scss';

export type ButtonProps = {
    onClick: () => void;
    label: string;
};

export interface DialogProps extends ModalProps {
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

const { block, elem } = bem('Dialog', styles);

export const Dialog: React.FC<DialogProps> = (props) => {
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
                    <Button onClick={cancelButton.onClick} context="link">
                        {cancelButton.label}
                    </Button>
                )}
                <Button
                    onClick={acceptButton.onClick}
                    context={isConfirm ? 'primary' : 'secondary'}
                >
                    {acceptButton.label}
                </Button>
            </div>
        </Modal>
    );
};

Dialog.displayName = 'Dialog';
