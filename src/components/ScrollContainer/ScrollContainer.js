import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ScrollContainer.scss';

const { block } = bem({
    name: 'ScrollContainer',
    classnames: styles,
    propsToMods: ['hideScrollX', 'hideScrollY', 'resize']
});

const ScrollContainer = props => {
    const { children, maxHeight, maxWidth, minHeight, minWidth } = props;

    return (
        <div
            {...block(props)}
            style={{
                maxHeight,
                maxWidth,
                minHeight,
                minWidth
            }}
        >
            {children}
        </div>
    );
};

ScrollContainer.displayName = 'ScrollContainer';

ScrollContainer.propTypes = {
    /** Force horizontal scrollbars to be hidden */
    hideScrollX: PropTypes.bool,
    /** Force vertical scrollbars to be hidden */
    hideScrollY: PropTypes.bool,
    /** Maximum height for the container */
    maxHeight: PropTypes.number,
    /** Maximum width for the container */
    maxWidth: PropTypes.number,
    /** Minimum height for the container */
    minHeight: PropTypes.number,
    /** Minimum width for the container */
    minWidth: PropTypes.number,
    /** Allow the container to be resizable within the
     min / max width / height boundaries (if defined) */
    resize: PropTypes.oneOf(['both', 'horizontal', 'vertical'])
};

ScrollContainer.defaultProps = {
    hideScrollX: false,
    hideScrollY: false,
    maxHeight: null,
    maxWidth: null,
    minHeight: null,
    minWidth: null,
    resize: null
};

export default ScrollContainer;
