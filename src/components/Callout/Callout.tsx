import * as React from 'react';
import { MdClose } from 'react-icons/md';
import bem from '../../utils/bem';
import { Context } from '../../constants';
import styles from './Callout.scss';

interface Props {
    /** The Callout context (e.g. brand, primary, bad, good etc. - defaults to info) */
    context?: Context;
    /** A property specifies the height of a line. */
    lineHeightStyle?: number;
    /** Content to be rendered inside the container */
    children: RequiredChild;
    /** A function to be called when close button was clicked */
    onRequestClose?: (() => void) | null;
}

const { block, elem } = bem('Callout', styles);

const Callout: React.FC<Props> = props => {
    const { onRequestClose, lineHeightStyle, children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <p {...elem('content', props)} style={{ lineHeight: `${lineHeightStyle}px` }}>
                {children}
            </p>
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
    onRequestClose: null,
    lineHeightStyle: 22,
};

Callout.displayName = 'Callout';

export default Callout;
