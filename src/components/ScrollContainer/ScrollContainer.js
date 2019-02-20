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
    const { children, maxHeight, minWidth } = props;

    return (
        <div
            {...block(props)}
            style={{
                maxHeight,
                minWidth
            }}
        >
            {children}
        </div>
    );
};

ScrollContainer.displayName = 'ScrollContainer';

ScrollContainer.propTypes = {
    hideScrollX: PropTypes.bool,
    hideScrollY: PropTypes.bool,
    maxHeight: PropTypes.number,
    minWidth: PropTypes.number,
    resize: PropTypes.oneOf(['both', 'horizontal', 'vertical'])
};

ScrollContainer.defaultProps = {
    hideScrollX: false,
    hideScrollY: false,
    maxHeight: null,
    minWidth: null,
    resize: null
};

export default ScrollContainer;
