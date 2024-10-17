import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import { Modal, ModalProps } from '../../Modal';
import styles from './Dialog.scss';
import { Heading } from '../../Heading';
import { ButtonContext } from '../../../constants/component-specific';

export type ButtonProps = {
    onClick: () => void;
    label: string;
};

export interface DialogProps extends ModalProps {
    /** the component which will trigger the dialog */
    dialogTrigger?: React.ReactNode;
    /** Should the alert appear */
    isOpen: boolean;
    /** the function which triggers the modal */
    onDialogTrigger?: () => void;
    /** The alert content */
    children: React.ReactNode;
    /** Dialog title */
    title?: string;
    /** Properties of the accept button */
    acceptButton: ButtonProps;
    /** Properties of the cancel button */
    cancelButton?: ButtonProps;
    /** the context of the buttons in the footer */
    buttonContext?: Omit<ButtonContext, 'secondary'>;
    /** closes the dialog */
    onClose?: () => void;
}

const { block, elem } = bem('Dialog', styles);

export const Dialog: React.FC<DialogProps> = (props) => {
    const {
        onDialogTrigger,
        isOpen,
        children,
        title,
        acceptButton,
        cancelButton,
        dialogTrigger,
        onClose,
        ...rest
    } = props;
    const isConfirm = !!cancelButton;

    return (
        <div {...block(props)}>
            {dialogTrigger && (
                <button {...elem('trigger')} onClick={onDialogTrigger} aria-label="Open dialog">
                    {dialogTrigger}
                </button>
            )}
            <Modal {...rest} {...elem('dialog')} isOpen={isOpen}>
                <div {...elem('header')} role="alert">
                    {!!title && (
                        <Heading level="h2" {...elem('title', props)}>
                            {title}
                        </Heading>
                    )}
                    <MdClose onClick={onClose} {...elem('closeIcon')} />
                </div>
                <div {...elem('content')}>{children}</div>
                <div {...elem('actions', props)}>
                    <Button
                        onClick={acceptButton.onClick}
                        context="primary"
                        aria-label="Confirm OK"
                    >
                        {acceptButton.label}
                    </Button>
                    {isConfirm && (
                        <Button
                            {...elem('cancel', props)}
                            onClick={cancelButton.onClick}
                            variant="ghost"
                        >
                            {cancelButton.label}
                        </Button>
                    )}
                </div>
            </Modal>
        </div>
    );
};

Dialog.displayName = 'Dialog';
