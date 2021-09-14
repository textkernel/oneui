import * as React from 'react';
import { bem } from '../../utils';
import { Heading } from '../Heading';
import { Button } from '../Buttons';
import { Modal, ModalProps } from '../Modal';
import styles from './Alert.scss';

interface Props extends ModalProps {
    /** Should the alert appear */
    showAlert: boolean;
    /** The alert content */
    children: ReactNode;
    /** Dialog title */
    title?: string;
    /** Callback to be called on Accept button click (shown in both alert and confirm) */
    onAccept: () => void;
    /** Callback to be called on Cancel button click (only relevant for confirm dialog) */
    onCancel?: () => void;
    /** Accept button's text */
    acceptLabel: string;
    /** Cancel button's text. This props also indicates that the dialog is "confirm". If specified, onCancel should be defined as well. */
    cancelLabel?: string;
}

const { block, elem } = bem('Alert', styles);

export const Alert: React.FC<Props> = (props) => {
    const { showAlert, children, title, onAccept, onCancel, acceptLabel, cancelLabel, ...rest } =
        props;

    if ((!cancelLabel && !!onCancel) || (!!cancelLabel && !onCancel)) {
        console.warn(
            'It seems you are trying to render a confirm dialog. In that case make sure to pass both "onCancel" and "cancelLabel" props. Otherwise please remove both'
        );
    }

    const isConfirm = !!cancelLabel;

    return (
        // @ts-ignore ts(2783)
        <Modal contentLabel="Alert/confirm dialog" {...rest} {...block(props)} isOpen={showAlert}>
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
                    <Button onClick={onCancel} context="link">
                        {cancelLabel || ''}
                    </Button>
                )}
                <Button onClick={onAccept} context={isConfirm ? 'primary' : 'brand'}>
                    {acceptLabel}
                </Button>
            </div>
        </Modal>
    );
};

Alert.displayName = 'Alert';
