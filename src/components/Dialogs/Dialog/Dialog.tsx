import * as React from 'react';
import { MdClose } from 'react-icons/md';
import useResizeObserver from 'use-resize-observer';
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
    /** Should the alert appear */
    isOpen: boolean;
    /** The alert content */
    children: React.ReactNode;
    /** Dialog title */
    title?: string;
    /** Properties of the accept button */
    acceptButton?: ButtonProps;
    /** Properties of the cancel button */
    cancelButton?: ButtonProps;
    /** the context of the buttons in the footer */
    variant?: Omit<ButtonContext, 'secondary'>;
    /** closes the dialog */
    onClose: () => void;
}

const { block, elem } = bem('Dialog', styles);

export const Dialog: React.FC<DialogProps> = (props) => {
    const {
        isOpen,
        children,
        title,
        acceptButton,
        cancelButton,
        variant = 'primary',
        onClose,
        ...rest
    } = props;

    const { ref, height } = useResizeObserver<HTMLDivElement>();
    const showButtons = !!acceptButton;

    return (
        <Modal {...rest} {...block(props)} isOpen={isOpen}>
            {!!title && (
                <div {...elem('header')} role="alert">
                    <Heading level="h2" {...elem('title', props)}>
                        {title}
                    </Heading>
                    <button {...elem('closeButton')} type="button" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>
            )}
            <div ref={ref} {...elem('content')}>
                {children}
            </div>
            {showButtons && (
                <div {...elem('actions', { ...props, borderTop: height === 528 })}>
                    <Button
                        onClick={acceptButton.onClick}
                        context={variant === 'primary' ? 'primary' : 'critical'}
                    >
                        {acceptButton.label}
                    </Button>
                    {!!cancelButton && (
                        <Button
                            {...elem('cancel', props)}
                            onClick={cancelButton.onClick}
                            variant="ghost"
                        >
                            {cancelButton.label}
                        </Button>
                    )}
                </div>
            )}
        </Modal>
    );
};

Dialog.displayName = 'Dialog';
