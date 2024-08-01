/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Toaster, toast } from 'sonner';
import { MdClose } from 'react-icons/md';
import CautiousIcon from '@material-design-icons/svg/round/warning.svg';
import CriticalIcon from '@material-design-icons/svg/round/error.svg';
import InfoIcon from '@material-design-icons/svg/round/info.svg';
import SuccessIcon from '@material-design-icons/svg/round/check_circle.svg';
import styles from './Toast.scss';
import { Context } from '../../constants';
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
}

const { block, elem } = bem('Toast', styles);

const ActionItem: React.FC<ActionProps> = ({ action }) => {
    if (action.callback) {
        return (
            <p onClick={action.callback} {...elem('toast-action')} role="presentation">
                {action.text}
            </p>
        );
    }
    if (action.href) {
        return (
            <p href={action.href} {...elem('toast-action')}>
                {action.text}
            </p>
        );
    }
    return <></>;
};

const ContextIcon = ({ context }) => {
    switch (context) {
        case 'info':
            return <InfoIcon />;
        case 'success':
            return <SuccessIcon />;
        case 'cautious':
            return <CautiousIcon />;
        case 'critical':
            return <CriticalIcon />;
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
    toast.custom((t) => (
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
                    {actions && actions[0] && <ActionItem action={actions[0]} />}
                    {actions && actions[1] && (
                        <>
                            {' '}
                            • <ActionItem action={actions[1]} />
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
    ));

export const OneToaster = ({ children, ...props }) => (
    <>
        {children}
        <Toaster {...props} className="Toaster" />
    </>
);

OneToaster.defaultProps = {
    duration: Infinity,
    closeButton: true,
    offset: 16,
    gap: 8,
};

Toast.displayName = 'Toast';
OneToaster.displayName = 'Toaster';
ContextIcon.displayName = 'ContextIcon';
ActionItem.displayName = 'ActionItem';
