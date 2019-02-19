import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './IconBase.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'IconBase',
    classnames: styles,
    propsToMods: ['context', 'margin']
});

const adjustSize = size => {
    if (!size) {
        return null;
    }

    const adjustedSize = Math.max(0, size);

    return {
        top: 'auto',
        width: adjustedSize,
        height: adjustedSize
    };
};

const IconBase = props => {
    const { children, context, size, title, viewBox, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <svg
                {...elem('svg', props)}
                aria-labelledby={title ? 'title' : null}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                style={adjustSize(size)}
                role="img"
            >
                {!!title && <title>{title}</title>}
                {children}
            </svg>
        </div>
    );
};

IconBase.propTypes = {
    /** The SVG content */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    /** The icon context (e.g. brand, primary, bad, good etc.) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Adds margin between a given side of the icon and other content */
    margin: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1).
     If not defined, icon will scale and align itself with text. */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string,
    /** The SVG viewbox */
    viewBox: PropTypes.string.isRequired
};

IconBase.defaultProps = {
    context: null,
    margin: null,
    size: null,
    title: null
};

export default IconBase;
