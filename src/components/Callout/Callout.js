import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import bem from '../../utils/bem';
import { CONTEXTS } from '../../constants';
import styles from './Callout.scss';

const { block, elem } = bem('Callout', styles);

const Callout = props => {
    const { status, onRequestClose, lineHeightStyle, children, ...rest } = props;

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

Callout.propTypes = {
    /** The Callout context (e.g. brand, primary, bad, good etc. - defaults to info) */
    context: PropTypes.oneOf(CONTEXTS),
    /** A function to be called when close button was clicked */
    onRequestClose: PropTypes.func,
    /** A property specifies the height of a line. */
    lineHeightStyle: PropTypes.number,
    /** Content to be rendered inside the container */
    children: PropTypes.node.isRequired,
};

Callout.defaultProps = {
    context: 'info',
    onRequestClose: null,
    lineHeightStyle: 22,
};

Callout.displayName = 'Callout';

export default Callout;
