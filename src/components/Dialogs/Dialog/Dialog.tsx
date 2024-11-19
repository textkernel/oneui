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

export interface BaseDialogProps extends ModalProps {
    /** Should the alert appear */
    isOpen: boolean;
    /** The alert content */
    children: React.ReactNode;
    /** Properties of the accept button */
    acceptButton?: ButtonProps;
    /** Properties of the cancel button */
    cancelButton?: ButtonProps;
    /** the context of the buttons in the footer */
    variant?: Omit<ButtonContext, 'secondary'>;
}

export type DialogProps = BaseDialogProps &
    ({ title?: string; onClose: () => void } | { title?: undefined; onClose?: never });

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
                    <Heading level="h3" {...elem('title', props)}>
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
                <div {...elem('actions', { ...props, borderTop: height === 412 })}>
                    <Button
                        onClick={acceptButton.onClick}
                        context={variant === 'primary' ? 'primary' : 'critical'}
                    >
                        {acceptButton.label}
                    </Button>
                    {!!cancelButton && (
                        <Button onClick={cancelButton.onClick} variant="ghost">
                            {cancelButton.label}
                        </Button>
                    )}
                </div>
            )}
        </Modal>
    );
};

Dialog.displayName = 'Dialog';
