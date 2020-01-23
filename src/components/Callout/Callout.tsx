import * as React from 'react';
import { MdClose } from 'react-icons/md';
import { bem } from '../../utils';
import { Context } from '../../constants';
import styles from './Callout.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Content to be rendered inside the container */
    children: NotEmptyReactNode;
    /** The Callout context (e.g. brand, primary, bad, good etc. - defaults to info) */
    context?: Context;
    /** A function to be called when close button was clicked */
    onRequestClose?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const { block, elem } = bem('Callout', styles);

export const Callout: React.FC<Props> = props => {
    const { onRequestClose, children, context, ...rest } = props;
    return (
        <div {...rest} {...block(props)}>
            <div {...elem('content', props)}>{children}</div>
            {onRequestClose && (
                <button {...elem('closeButton', props)} type="button" onClick={onRequestClose}>
                    <MdClose {...elem('closeIcon', props)} />
                </button>
            )}
        </div>
    );
};

Callout.defaultProps = {
    context: 'info',
};

Callout.displayName = 'Callout';
