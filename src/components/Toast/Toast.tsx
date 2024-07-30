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
    // /** a function that is called when the toast closes via close-button-click */
    // onClose?: () => void;
    // /** A label for the close button that will be used by screenreaders */
    // closeButtonLabel: string;
}

const { block, elem } = bem('Toast', styles);

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

export const Toast = ({ title, description, context, isClosable = true }: ToastProps) =>
    toast.custom(
        (t) => (
            <div {...block({ context })}>
                <div {...elem('contextIcon')}>
                    <ContextIcon context={context} />
                </div>
                <div {...elem('content')}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                {isClosable && (
                    <button {...elem('closeButton')} type="button" onClick={() => toast.dismiss(t)}>
                        <MdClose {...elem('closeIcon')} />
                    </button>
                )}
                {/* <div {...elem('closeButton')}>close</div> */}
                {/* This is a custom component <button onClick={() => toast.dismiss(t)}>close</button> */}
            </div>
        )
        // title, {
        //     description,
        //     action: {
        //         label: 'Action',
        //         onClick: () => console.log('Action!'),
        //       },
        //     closeButton: true
        // });
    );

export const OneToaster = ({ children }) => (
    <>
        {children}
        <Toaster />
    </>
);

Toast.displayName = 'Toast';
OneToaster.displayName = 'Toaster';
ContextIcon.displayName = 'ContextIcon';
