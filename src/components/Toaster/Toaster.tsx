/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import CloseIcon from '@material-design-icons/svg/round/close.svg';
import CautiousIcon from '@material-design-icons/svg/round/warning.svg';
import CriticalIcon from '@material-design-icons/svg/round/error.svg';
import InfoIcon from '@material-design-icons/svg/round/info.svg';
import SuccessIcon from '@material-design-icons/svg/round/check_circle.svg';
import { assertNever } from '../../utils/misc';
import styles from './Toaster.scss';
import { Context } from '../../constants';
import { bem } from '../../utils';
import { ActionItem, ActionProps } from './ActionItem';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Short and descriptive title */
    title?: string;
    /** Body content */
    description: string;
    /** The Toast context (e.g. info, critical, success or cautious - defaults to info) */
    context?: Context;
    /** Action array, each containing item text, callback and/or href to action. Max 2 */
    actions?: ActionProps[];
    /** Has a close button, default: true */
    isClosable?: boolean;
    /** A label for the close button that will be used by screenreaders */
    closeButtonLabel?: string;
}

const { block, elem } = bem('Toast', styles);

const ContextIcon = ({ context }: { context: Context }) => {
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
            return assertNever(context, 'Toaster.tsx');
    }
};

export const toast = ({
    title,
    description,
    context = 'info',
    actions,
    isClosable = true,
    closeButtonLabel,
}: ToastProps) =>
    sonnerToast.custom(
        (t) => (
            <div {...block({ context })}>
                <div {...elem('contextIcon')}>
                    <ContextIcon context={context} />
                </div>
                <div {...elem('content')}>
                    <div {...elem('message')}>
                        <h3 className="OneUI-heading-3">{title}</h3>
                        <p className="OneUI-body-text">{description}</p>
                    </div>
                    <div {...elem('actions')}>
                        {actions &&
                            actions.map((action, index) => (
                                <React.Fragment key={`${action.text}`}>
                                    <ActionItem
                                        action={action}
                                        dismissToast={() => sonnerToast.dismiss(t)}
                                    />
                                    {index < actions.length - 1 && <>•</>}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
                {isClosable && (
                    <button
                        {...elem('closeButton')}
                        type="button"
                        onClick={() => sonnerToast.dismiss(t)}
                        aria-label={closeButtonLabel}
                    >
                        <CloseIcon {...elem('closeIcon')} />
                    </button>
                )}
            </div>
        ),
        actions ? { important: true } : {} // focused if actionable
    );

const bemToaster = bem('Toaster', styles);

export const Toaster = ({ duration = 2500, ...props }) => (
    <SonnerToaster
        {...{
            ...props,
            duration,
            closeButton: true,
            offset: 16,
            gap: 8,
            ...bemToaster.block(props),
        }}
    />
);

toast.displayName = 'toast';
Toaster.displayName = 'Toaster';
ContextIcon.displayName = 'ContextIcon';
