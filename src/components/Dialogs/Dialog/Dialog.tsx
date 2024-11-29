import * as React from 'react';
import { MdClose } from 'react-icons/md';
import useResizeObserver from 'use-resize-observer';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import { Modal, ModalProps } from '../../Modal';
import { Heading } from '../../Heading';
import { ButtonContext } from '../../../constants/component-specific';
import styles from './Dialog.scss';

export type ButtonProps = {
    onClick: () => void;
    label: string;
};

export type HeaderProps = {
    /** Dialog header title */
    title: string;
    /** Properties of the close button */
    closeButton: ButtonProps;
};

export interface BaseProps extends ModalProps {
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

export type Props = BaseProps & (HeaderProps | { title?: undefined; closeButton?: never });

const { block, elem } = bem('Dialog', styles);

export const Dialog: React.FC<Props> = (props) => {
    const {
        isOpen,
        children,
        title,
        acceptButton,
        cancelButton,
        closeButton,
        variant = 'primary',
        ...rest
    } = props;
    const { ref, height } = useResizeObserver<HTMLDivElement>();
    const showButtons = !!acceptButton;

    return (
        <Modal {...rest} {...block(props)} isOpen={isOpen}>
            {!!title && closeButton && (
                <div {...elem('header')} role="alert">
                    <Heading level="h3" {...elem('title', props)}>
                        {title}
                    </Heading>
                    <Button
                        {...elem('closeButton')}
                        variant="ghost"
                        onClick={closeButton.onClick}
                        aria-label={closeButton.label}
                    >
                        <MdClose />
                    </Button>
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
