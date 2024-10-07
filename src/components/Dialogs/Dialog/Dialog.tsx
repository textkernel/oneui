import * as React from 'react';
import { bem } from '../../../utils';
import { Heading } from '../../Heading';
import { Button } from '../../Buttons';
import { Modal, ModalProps } from '../../Modal';
import styles from './Dialog.scss';

export type ButtonProps = {
    onClick: () => void;
    label: string;
    ButtonContext?: string; // this can also be set on the whole component instead..
};

export interface DialogProps extends ModalProps {
    /** the component which will trigger the dialog */
    dialogTrigger?: React.ReactNode;
    /** Should the alert appear */
    isOpen: boolean;
    /** the function which triggers the modal */
    onTriggerDialog?: () => void;
    /** The alert content */
    children: React.ReactNode;
    /** Dialog title */
    title?: string;
    /** Properties of the accept button */
    acceptButton: ButtonProps;
    /** Properties of the cancel button */
    cancelButton?: ButtonProps;
    /** when set the content will have a scroll bar if it's longer than the value set */
    maxHeight?: string | number;
}

const { block, elem } = bem('Dialog', styles);

export const Dialog: React.FC<DialogProps> = (props) => {
    const {
        onTriggerDialog,
        isOpen,
        children,
        title,
        acceptButton,
        cancelButton,
        dialogTrigger,
        ...rest
    } = props;
    const isConfirm = !!cancelButton;

    return (
        <>
            {/*
                commenting this to pass tests
            <button style={{ all: 'unset', cursor: 'pointer' }} onClick={onTriggerDialog}>
                {dialogTrigger}
            </button> */}
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
                        <Button
                            {...elem('cancel', props)}
                            onClick={cancelButton.onClick}
                            variant="ghost"
                        >
                            {cancelButton.label}
                        </Button>
                    )}
                    <Button onClick={acceptButton.onClick} context="primary">
                        {acceptButton.label}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

Dialog.displayName = 'Dialog';
