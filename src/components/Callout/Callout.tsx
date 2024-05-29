import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Context } from '../../constants';
import styles from './Callout.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Content to be rendered inside the container */
    children: React.ReactNode;
    /** The Callout context (e.g. info, critical, success etc. - defaults to info) */
    context?: Context;
    /** A function to be called when close button was clicked */
    onRequestClose?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const { block, elem } = bem('Callout', styles);

export const Callout: React.FC<Props> = ({
    context = 'info',
    onRequestClose,
    children,
    ...rest
}) => {
    if (typeof children !== 'number' && !children) {
        return null;
    }

    return (
        <div {...rest} {...block({ context, ...rest })}>
            <div {...elem('content', { context })}>{children}</div>
            {onRequestClose && (
                <button
                    {...elem('closeButton', { context })}
                    type="button"
                    onClick={onRequestClose}
                >
                    <MdClose {...elem('closeIcon', { context })} />
                </button>
            )}
        </div>
    );
};

Callout.displayName = 'Callout';
