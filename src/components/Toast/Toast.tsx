/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Toaster, toast } from 'sonner';
import { MdClose } from 'react-icons/md';
import CautiousIcon from '@material-design-icons/svg/round/warning.svg';
import CriticalIcon from '@material-design-icons/svg/round/error.svg';
import InfoIcon from '@material-design-icons/svg/round/info.svg';
import SuccessIcon from '@material-design-icons/svg/round/check_circle.svg';

import styles from './Toast.scss';
import { Context, ENTER_KEY } from '../../constants';
import { bem } from '../../utils';

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
    /** A label for the close button that will be used by screenreaders */
    closeButtonLabel?: string;
}

interface ActionProps {
    action: {
        text: string;
        callback?: () => void;
        href?: string;
    };
    handleClose: () => void;
}

const { block, elem } = bem('Toast', styles);

const ActionItem: React.FC<ActionProps> = ({ action, handleClose }) => {
    if (action.callback) {
        const handleOnClick = () => {
            action.callback!();
            handleClose();
        };
        const handleKeyDown = (e) => {
            if (e.key === ENTER_KEY) {
                handleOnClick();
            }
        };
        return (
            <p
                onClick={handleOnClick}
                onKeyDown={handleKeyDown}
                {...elem('toast-action')}
                role="presentation"
            >
                {action.text}
            </p>
        );
    }
    if (action.href) {
        return (
            <a
                onClick={handleClose}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                {...elem('toast-action')}
            >
                {action.text}
            </a>
        );
    }
    return <></>;
};

const ContextIcon = ({ context }) => {
    switch (context) {
        case 'info':
            return <InfoIcon data-testid="info-icon" />;
        case 'success':
            return <SuccessIcon data-testid="success-icon" />;
        case 'cautious':
            return <CautiousIcon data-testid="cautious-icon" />;
        case 'critical':
            return <CriticalIcon data-testid="critical-icon" />;
        default:
            return <InfoIcon />;
    }
};

export const Toast = ({
    title,
    description,
    context = 'info',
    actions,
    isClosable = true,
    closeButtonLabel = 'closeButton',
}: ToastProps) =>
    toast.custom(
        (t) => (
            <div {...block({ context })}>
                <div {...elem('contextIcon')}>
                    <ContextIcon context={context} />
                </div>
                <div {...elem('content')}>
                    <div {...elem('message')}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                    <div {...elem('actions')}>
                        {actions && actions[0] && (
                            <ActionItem action={actions[0]} handleClose={() => toast.dismiss(t)} />
                        )}
                        {actions && actions[1] && (
                            <>
                                {' '}
                                •{' '}
                                <ActionItem
                                    action={actions[1]}
                                    handleClose={() => toast.dismiss(t)}
                                />
                            </>
                        )}
                    </div>
                </div>
                {isClosable && (
                    <button
                        {...elem('closeButton')}
                        type="button"
                        onClick={() => toast.dismiss(t)}
                        aria-label={closeButtonLabel}
                    >
                        <MdClose {...elem('closeIcon')} />
                    </button>
                )}
            </div>
        ),
        actions ? { important: true } : {} // focused if actionable
    );

export const OneToaster = ({ children, ...props }) => (
    <>
        {children}
        <Toaster {...props} className="Toaster" />
    </>
);

OneToaster.defaultProps = {
    duration: 2500,
    closeButton: true,
    offset: 16,
    gap: 8,
};

Toast.displayName = 'Toast';
OneToaster.displayName = 'Toaster';
ContextIcon.displayName = 'ContextIcon';
ActionItem.displayName = 'ActionItem';
