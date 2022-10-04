import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Context } from '../../constants';
import styles from './Callout.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Content to be rendered inside the container */
    children: NotEmptyReactNode;
    /** The Callout context (e.g. primary, secondary, bad, good etc. - defaults to info) */
    context?: Context;
    /** A function to be called when close button was clicked */
    onRequestClose?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const { block, elem } = bem('Callout', styles);

export const Callout: React.FC<Props> = ({
    context = 'secondary',
    onRequestClose,
    children,
    ...rest
}) => {
    return (
        <div {...rest} {...block({ context })}>
            <div {...elem('content', { context })}>{children}</div>
            {onRequestClose && (
                <button {...elem('closeButton')} type="button" onClick={onRequestClose}>
                    <MdClose {...elem('closeIcon')} />
                </button>
            )}
        </div>
    );
};

Callout.defaultProps = {
    context: 'secondary',
};

Callout.displayName = 'Callout';
