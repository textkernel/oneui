import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ScrollContainer.scss';

const { block } = bem({
    name: 'ScrollContainer',
    classnames: styles,
    propsToMods: ['hideScrollX', 'hideScrollY']
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
    minWidth: PropTypes.number
};

ScrollContainer.defaultProps = {
    hideScrollX: false,
    hideScrollY: false,
    maxHeight: null,
    minWidth: null
};

export default ScrollContainer;
